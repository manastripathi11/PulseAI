import React, { useState, useEffect } from 'react';
import { Send, Mic, MicOff, Sparkles } from 'lucide-react';
import { useSpeechRecognition } from '../../hooks/useSpeechRecognition';
import { useToast } from '../../context/ToastContext';

export function ChatInput({ onSendMessage, isLoading }) {
  const [input, setInput] = useState('');
  const { addToast } = useToast();

  const {
    isListening,
    transcript,
    isSupported,
    startListening,
    stopListening,
    resetTranscript
  } = useSpeechRecognition();

  // Sync transcript from speech recognition into input field
  useEffect(() => {
    if (transcript) {
      setInput(prev => (prev ? `${prev} ${transcript}` : transcript));
    }
  }, [transcript]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    onSendMessage(input);
    setInput('');
    resetTranscript();
  };

  const handleVoiceToggle = () => {
    if (!isSupported) {
      addToast('Voice input is not supported in this browser. Please try Chrome or Edge.', 'info', 4000);
      return;
    }

    if (isListening) {
      stopListening();
      addToast('Voice recognition stopped', 'info', 1500);
    } else {
      startListening();
      addToast('Listening... Speak into your microphone', 'info', 2500);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="relative flex items-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-lg focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-500/20 transition-all p-2 gap-2">
        {/* Voice Input Button */}
        <button
          type="button"
          onClick={handleVoiceToggle}
          className={`p-2.5 rounded-xl transition-colors shrink-0 ${
            isListening
              ? 'bg-rose-500 text-white animate-pulse'
              : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
          title={isListening ? 'Stop recording' : 'Start voice input'}
        >
          {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
        </button>

        {/* Text Input */}
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={isListening ? 'Listening to voice...' : 'Ask PulseAI about employees, departments, or metrics...'}
          disabled={isLoading}
          className="w-full bg-transparent text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 outline-none px-2 py-1.5"
        />

        {/* Send Button */}
        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          className="p-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 disabled:bg-slate-200 dark:disabled:bg-slate-800 text-white disabled:text-slate-400 dark:disabled:text-slate-600 shadow-md shadow-brand-600/20 disabled:shadow-none transition-all shrink-0"
          title="Send message"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>

      <div className="flex items-center justify-between px-3 pt-2 text-[11px] text-slate-400 dark:text-slate-500">
        <span>Press <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 font-mono text-[10px]">Enter</kbd> to send</span>
        {isListening && <span className="text-rose-500 font-medium animate-pulse">● Recording Voice...</span>}
      </div>
    </form>
  );
}
