import React from 'react';
import { Plus, MessageSquare, Trash2, X, History } from 'lucide-react';
import { Button } from '../ui/Button';
import { useToast } from '../../context/ToastContext';

export function ChatHistory({
  conversations,
  activeChatId,
  onSelectChat,
  onNewChat,
  onDeleteChat,
  onClearAll,
  isOpen,
  onClose
}) {
  const { addToast } = useToast();

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all chat history?')) {
      onClearAll();
      addToast('All chat history cleared', 'info');
    }
  };

  const handleDeleteSingle = (e, id) => {
    e.stopPropagation();
    onDeleteChat(id);
    addToast('Conversation deleted', 'info');
  };

  return (
    <aside
      aria-label="Chat Conversation History"
      className={`fixed lg:static inset-y-0 right-0 z-40 w-64 sm:w-72 bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 shadow-xl lg:shadow-none flex flex-col transition-transform duration-300 shrink-0 ${
        isOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'
      }`}
    >
      {/* History Header */}
      <div className="h-16 px-4 flex items-center justify-between border-b border-slate-100 dark:border-slate-800 shrink-0">
        <div className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
          <History className="w-4 h-4 text-brand-500" />
          <span>Chat History</span>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={onNewChat}
            className="p-1.5 rounded-lg text-slate-500 hover:text-brand-600 hover:bg-brand-50 dark:hover:bg-brand-950/40 transition-colors"
            title="New Chat"
            aria-label="Create new conversation"
          >
            <Plus className="w-4 h-4" />
          </button>
          <button
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            aria-label="Close history drawer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* New Chat Action Button */}
      <div className="p-3 border-b border-slate-100 dark:border-slate-800/80 shrink-0">
        <Button variant="primary" size="sm" onClick={onNewChat} className="w-full gap-2">
          <Plus className="w-4 h-4" />
          <span>New Conversation</span>
        </Button>
      </div>

      {/* Conversation List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-1">
        {conversations.length === 0 ? (
          <p className="text-xs text-slate-400 text-center py-6">No previous conversations</p>
        ) : (
          conversations.map(conv => {
            const isActive = conv.id === activeChatId;
            return (
              <div
                key={conv.id}
                onClick={() => onSelectChat(conv.id)}
                title={conv.title}
                className={`group flex items-center justify-between p-2.5 rounded-xl text-xs cursor-pointer transition-colors ${
                  isActive
                    ? 'bg-brand-50 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300 font-semibold border border-brand-200/60 dark:border-brand-800/50'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2 min-w-0 flex-1 pr-1 overflow-hidden">
                  <MessageSquare className="w-3.5 h-3.5 shrink-0 text-slate-400 group-hover:text-brand-500" />
                  <span className="truncate block w-full">{conv.title}</span>
                </div>

                <button
                  onClick={(e) => handleDeleteSingle(e, conv.id)}
                  className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-rose-500 transition-opacity shrink-0 ml-1"
                  title="Delete chat"
                  aria-label="Delete chat"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })
        )}
      </div>

      {/* Clear All Footer */}
      {conversations.length > 0 && (
        <div className="p-3 border-t border-slate-100 dark:border-slate-800 shrink-0">
          <button
            onClick={handleClearAll}
            className="w-full text-xs text-rose-500 hover:text-rose-600 flex items-center justify-center gap-1.5 py-1.5 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-colors font-medium"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear All History</span>
          </button>
        </div>
      )}
    </aside>
  );
}
