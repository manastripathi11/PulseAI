import React, { useRef, useEffect, useState } from 'react';
import { Bot, History, RefreshCw, AlertCircle } from 'lucide-react';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { TypingIndicator } from './TypingIndicator';
import { SuggestedPrompts } from './SuggestedPrompts';
import { ChatHistory } from './ChatHistory';
import { useChat } from '../../hooks/useChat';

export function ChatWindow() {
  const {
    conversations,
    activeChatId,
    messages,
    isLoading,
    error,
    sendMessage,
    startNewChat,
    selectChat,
    deleteChat,
    clearAllChats
  } = useChat();

  const [historyOpen, setHistoryOpen] = useState(true);
  const chatBottomRef = useRef(null);

  // Auto-scroll to bottom on new messages or loading state
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  return (
    <div className="h-[calc(100vh-6.5rem)] flex rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl overflow-hidden relative">
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Chat Header */}
        <div className="h-16 px-4 sm:px-6 flex items-center justify-between border-b border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/50 backdrop-blur-sm shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 via-indigo-600 to-purple-600 text-white flex items-center justify-center shadow-md shadow-brand-600/20 shrink-0">
              <Bot className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white truncate">PulseAI Workspace Copilot</h3>
                <span className="hidden sm:inline-flex px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 shrink-0">
                  Online
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                Connected to Gemini API • Live employee directory context
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={startNewChat}
              className="px-3 py-1.5 rounded-xl text-slate-600 dark:text-slate-300 hover:text-brand-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5 text-xs font-semibold"
              title="Start New Chat"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">New Chat</span>
            </button>

            <button
              onClick={() => setHistoryOpen(!historyOpen)}
              className={`p-2 rounded-xl transition-colors ${
                historyOpen
                  ? 'bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
              title="Toggle Chat History Sidebar"
              aria-label="Toggle Chat History Sidebar"
            >
              <History className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Messages Scrollable Container */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-slate-50/30 dark:bg-slate-950/40">
          {error && (
            <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/60 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {messages.map((msg, idx) => (
            <ChatMessage
              key={msg.id}
              message={msg}
              isLatest={idx === messages.length - 1 && msg.sender === 'ai'}
            />
          ))}

          {/* Suggested Prompts shown when conversation only has welcome prompt */}
          {messages.length <= 1 && (
            <SuggestedPrompts onSelectPrompt={(p) => sendMessage(p)} />
          )}

          {/* Typing Indicator */}
          {isLoading && <TypingIndicator />}

          <div ref={chatBottomRef} />
        </div>

        {/* Chat Input Footer */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800/80 bg-white dark:bg-slate-900 shrink-0">
          <ChatInput onSendMessage={sendMessage} isLoading={isLoading} />
        </div>
      </div>

      {/* History Sidebar / Drawer */}
      <ChatHistory
        conversations={conversations}
        activeChatId={activeChatId}
        onSelectChat={selectChat}
        onNewChat={startNewChat}
        onDeleteChat={deleteChat}
        onClearAll={clearAllChats}
        isOpen={historyOpen}
        onClose={() => setHistoryOpen(false)}
      />
    </div>
  );
}
