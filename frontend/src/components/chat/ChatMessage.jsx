import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bot, Copy, Check } from 'lucide-react';
import { Avatar } from '../ui/Avatar';
import { useApp } from '../../context/AppContext';
import { useToast } from '../../context/ToastContext';

export function ChatMessage({ message, isLatest = false }) {
  const { userProfile } = useApp();
  const { addToast } = useToast();
  const [copied, setCopied] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const isUser = message.sender === 'user';

  // Smooth typing effect for latest AI message
  useEffect(() => {
    if (isUser || !isLatest) {
      setDisplayedText(message.text);
      return;
    }

    let currentIndex = 0;
    const fullText = message.text || '';
    const stepSize = Math.max(1, Math.floor(fullText.length / 40));

    setDisplayedText('');

    const interval = setInterval(() => {
      currentIndex += stepSize;
      if (currentIndex >= fullText.length) {
        setDisplayedText(fullText);
        clearInterval(interval);
      } else {
        setDisplayedText(fullText.slice(0, currentIndex));
      }
    }, 15);

    return () => clearInterval(interval);
  }, [message.text, isUser, isLatest]);

  const copyToClipboard = () => {
    if (!message.text) return;
    navigator.clipboard.writeText(message.text);
    setCopied(true);
    addToast('Copied message to clipboard', 'info', 2000);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderFormattedText = (text) => {
    if (!text) return null;
    const paragraphs = text.split('\n\n');

    return paragraphs.map((para, pIdx) => {
      if (para.includes('\n- ') || para.startsWith('- ')) {
        const items = para.split('\n').filter(line => line.trim());
        return (
          <ul key={pIdx} className="list-disc list-inside space-y-1 my-2 text-xs sm:text-sm">
            {items.map((item, iIdx) => {
              const cleaned = item.replace(/^-\s*/, '');
              return (
                <li key={iIdx} dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(cleaned) }} />
              );
            })}
          </ul>
        );
      }

      return (
        <p
          key={pIdx}
          className="text-xs sm:text-sm leading-relaxed my-1.5"
          dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(para) }}
        />
      );
    });
  };

  const formatInlineMarkdown = (str) => {
    return str
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-slate-900 dark:text-white">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
      .replace(/`([^`]+)`/g, '<code class="bg-slate-200 dark:bg-slate-800 text-brand-600 dark:text-brand-400 font-mono px-1.5 py-0.5 rounded text-xs">$1</code>');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={`flex items-start gap-3 my-4 group ${isUser ? 'flex-row-reverse' : ''}`}
    >
      {/* Avatar */}
      {isUser ? (
        <Avatar src={userProfile.avatar} name={userProfile.name} size="sm" />
      ) : (
        <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-brand-600/20">
          <Bot className="w-4.5 h-4.5" />
        </div>
      )}

      {/* Message Bubble Container */}
      <div className={`max-w-[85%] sm:max-w-[75%] space-y-1 ${isUser ? 'items-end' : 'items-start'}`}>
        <div className="flex items-center gap-2 px-1">
          <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500">
            {isUser ? userProfile.name : 'PulseAI Copilot'}
          </span>
          <span className="text-[10px] text-slate-400 dark:text-slate-500">
            {message.timestamp}
          </span>
        </div>

        <div
          className={`relative p-4 rounded-2xl ${
            isUser
              ? 'bg-brand-600 text-white rounded-tr-sm shadow-md shadow-brand-600/15'
              : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 rounded-tl-sm shadow-sm'
          }`}
        >
          {isUser ? (
            <p className="text-xs sm:text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>
          ) : (
            <div className="space-y-1">
              {renderFormattedText(displayedText)}
            </div>
          )}

          {/* Copy Button */}
          {!isUser && (
            <button
              onClick={copyToClipboard}
              className="opacity-0 group-hover:opacity-100 absolute top-2 right-2 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
              title="Copy response"
              aria-label="Copy response"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
