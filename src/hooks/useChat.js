import { useState, useCallback, useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { sendChatMessage, getLocalFallbackResponse } from '../services/geminiService';
import { generateId } from '../utils/helpers';

const DEFAULT_WELCOME_MESSAGE = {
  id: 'msg-welcome',
  sender: 'ai',
  text: "Hello! I'm PulseAI, your intelligent employee workspace assistant. Ask me anything about our team, department distributions, employee lookups, or workplace collaboration strategies.",
  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
};

const INITIAL_CONVERSATION = {
  id: 'conv-default',
  title: 'Workspace Introduction',
  createdAt: new Date().toISOString(),
  messages: [DEFAULT_WELCOME_MESSAGE]
};

// Formats conversation titles cleanly without mid-word truncation
function formatConversationTitle(text) {
  if (!text) return 'New Conversation';
  const trimmed = text.trim();
  if (trimmed.length <= 32) return trimmed;

  const slice = trimmed.substring(0, 32);
  const lastSpace = slice.lastIndexOf(' ');
  const cleanSlice = lastSpace > 12 ? slice.substring(0, lastSpace) : slice;
  return cleanSlice + '...';
}

export function useChat() {
  const [conversations, setConversations] = useLocalStorage('pulse_ai_chat_history', [INITIAL_CONVERSATION]);
  const [activeChatId, setActiveChatId] = useLocalStorage('pulse_ai_active_chat_id', 'conv-default');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Ensure active conversation exists
  useEffect(() => {
    if (conversations.length === 0) {
      const newConv = {
        id: generateId(),
        title: 'New Conversation',
        createdAt: new Date().toISOString(),
        messages: [DEFAULT_WELCOME_MESSAGE]
      };
      setConversations([newConv]);
      setActiveChatId(newConv.id);
    } else if (!conversations.some(c => c.id === activeChatId)) {
      setActiveChatId(conversations[0].id);
    }
  }, [conversations, activeChatId, setConversations, setActiveChatId]);

  const activeConversation = conversations.find(c => c.id === activeChatId) || conversations[0] || INITIAL_CONVERSATION;

  // Start new conversation
  const startNewChat = useCallback(() => {
    const newId = generateId();
    const newConv = {
      id: newId,
      title: 'New Conversation',
      createdAt: new Date().toISOString(),
      messages: [DEFAULT_WELCOME_MESSAGE]
    };
    setConversations(prev => [newConv, ...prev]);
    setActiveChatId(newId);
    setError(null);
  }, [setConversations, setActiveChatId]);

  // Select conversation
  const selectChat = useCallback((id) => {
    setActiveChatId(id);
    setError(null);
  }, [setActiveChatId]);

  // Delete single conversation
  const deleteChat = useCallback((id) => {
    setConversations(prev => {
      const filtered = prev.filter(c => c.id !== id);
      if (filtered.length === 0) {
        const fresh = {
          id: generateId(),
          title: 'New Conversation',
          createdAt: new Date().toISOString(),
          messages: [DEFAULT_WELCOME_MESSAGE]
        };
        setActiveChatId(fresh.id);
        return [fresh];
      }
      if (id === activeChatId) {
        setActiveChatId(filtered[0].id);
      }
      return filtered;
    });
  }, [activeChatId, setConversations, setActiveChatId]);

  // Clear all conversation history
  const clearAllChats = useCallback(() => {
    const fresh = {
      id: generateId(),
      title: 'New Conversation',
      createdAt: new Date().toISOString(),
      messages: [DEFAULT_WELCOME_MESSAGE]
    };
    setConversations([fresh]);
    setActiveChatId(fresh.id);
    setError(null);
  }, [setConversations, setActiveChatId]);

  // Send message
  const sendMessage = useCallback(async (userText) => {
    if (!userText.trim() || isLoading) return;

    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMessage = {
      id: generateId(),
      sender: 'user',
      text: userText.trim(),
      timestamp
    };

    // Append user message & update title if default title
    setConversations(prev => prev.map(conv => {
      if (conv.id === activeChatId) {
        const isFirstUserMsg = conv.messages.filter(m => m.sender === 'user').length === 0;
        const newTitle = isFirstUserMsg ? formatConversationTitle(userText) : conv.title;
        return {
          ...conv,
          title: newTitle,
          messages: [...conv.messages, userMessage]
        };
      }
      return conv;
    }));

    setIsLoading(true);
    setError(null);

    try {
      // Get AI Response
      let aiText = '';
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

      if (!apiKey || apiKey.trim() === '' || apiKey === 'YOUR_API_KEY_HERE') {
        await new Promise(res => setTimeout(res, 600));
        aiText = getLocalFallbackResponse(userText);
      } else {
        const historyForApi = activeConversation.messages.map(m => ({
          sender: m.sender,
          text: m.text
        }));
        aiText = await sendChatMessage(historyForApi, userText);
      }

      const aiMessage = {
        id: generateId(),
        sender: 'ai',
        text: aiText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setConversations(prev => prev.map(conv => {
        if (conv.id === activeChatId) {
          return {
            ...conv,
            messages: [...conv.messages, aiMessage]
          };
        }
        return conv;
      }));
    } catch (err) {
      console.error("Chat send error:", err);
      setError("Failed to get AI response. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [activeChatId, activeConversation, isLoading, setConversations]);

  return {
    conversations,
    activeChatId,
    activeConversation,
    messages: activeConversation.messages,
    isLoading,
    error,
    sendMessage,
    startNewChat,
    selectChat,
    deleteChat,
    clearAllChats
  };
}
