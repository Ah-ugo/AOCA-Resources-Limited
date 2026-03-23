/** @format */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Send,
  User,
  Search,
  MessageSquare,
  Loader2,
  ArrowLeft,
} from 'lucide-react';
import { authService } from '../../services/auth-service';

const API = 'https://aoca-resources-backend.onrender.com';
const WS_BASE = 'wss://aoca-resources-backend.onrender.com';

export default function Messages() {
  const [conversations, setConversations] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const messagesEndRef = useRef(null);
  const wsRef = useRef(null); // FIX #9: single stable ref, not state
  const currentUser = authService.getCurrentUser();

  // ── FIX #9 + #13: WebSocket opened ONCE on mount, never recreated ──────────
  useEffect(() => {
    if (!currentUser?.id) return;

    const socket = new WebSocket(`${WS_BASE}/instructor/ws/${currentUser.id}`);

    socket.onopen = () => console.log('WS connected');

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        // Use functional updater — reads activeChatRef, not stale closure
        setMessages((prev) => {
          // Only append if the message belongs to the currently viewed chat
          if (
            activeChatRef.current &&
            data.chatId === activeChatRef.current.id
          ) {
            return [...prev, data];
          }
          return prev;
        });
        // Update last message in sidebar
        setConversations((prev) =>
          prev.map((c) =>
            c.id === data.chatId
              ? { ...c, lastMessage: data.text, unread: (c.unread || 0) + 1 }
              : c,
          ),
        );
      } catch (e) {
        console.error('WS parse error', e);
      }
    };

    socket.onerror = () => console.warn('WS error');
    socket.onclose = () => console.log('WS disconnected');

    wsRef.current = socket;
    return () => socket.close();
  }, [currentUser?.id]); // runs once per user session

  // Ref to track active chat without causing WS re-connect
  const activeChatRef = useRef(null);
  useEffect(() => {
    activeChatRef.current = activeChat;
  }, [activeChat]);

  // ── FIX #14: load real conversations from API ─────────────────────────────
  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const token = authService.getToken();
        const res = await fetch(`${API}/messages/conversations`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          setConversations(data.conversations || data || []);
        } else {
          // Fallback: show empty list, not hardcoded mock
          setConversations([]);
        }
      } catch {
        setConversations([]);
      } finally {
        setLoading(false);
      }
    };
    fetchConversations();
  }, []);

  // ── Load messages when chat changes ──────────────────────────────────────
  useEffect(() => {
    if (!activeChat) return;
    const fetchMessages = async () => {
      try {
        const token = authService.getToken();
        const res = await fetch(
          `${API}/messages/conversations/${activeChat.id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        if (res.ok) {
          const data = await res.json();
          setMessages(data.messages || []);
          // Mark as read
          setConversations((prev) =>
            prev.map((c) => (c.id === activeChat.id ? { ...c, unread: 0 } : c)),
          );
        }
      } catch {
        setMessages([]);
      }
    };
    fetchMessages();
  }, [activeChat?.id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim() || !activeChat) return;

    const newMessage = {
      id: Date.now(),
      text: message,
      senderId: currentUser?.id,
      timestamp: new Date().toISOString(),
      chatId: activeChat.id,
    };

    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(newMessage));
    }

    // Optimistic update
    setMessages((prev) => [...prev, newMessage]);
    setConversations((prev) =>
      prev.map((c) =>
        c.id === activeChat.id ? { ...c, lastMessage: message } : c,
      ),
    );
    setMessage('');
  };

  const filtered = conversations.filter(
    (c) =>
      !searchQuery ||
      c.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.lastMessage?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className='h-[calc(100vh-80px)] md:h-screen bg-gray-50 flex flex-col md:flex-row overflow-hidden'>
      {/* Sidebar */}
      <div
        className={`w-full md:w-80 bg-white border-r border-gray-200 flex flex-col ${activeChat ? 'hidden md:flex' : 'flex'}`}
      >
        <div className='p-4 border-b border-gray-100'>
          <h2 className='text-xl font-serif font-bold text-gray-900 mb-4'>
            Messages
          </h2>
          <div className='relative'>
            <Search className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400' />
            <input
              type='text'
              placeholder='Search conversations...'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className='w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-lg text-sm focus:outline-none focus:border-emerald-500'
            />
          </div>
        </div>

        <div className='flex-1 overflow-y-auto'>
          {loading ? (
            <div className='flex justify-center p-8'>
              <Loader2 className='h-6 w-6 animate-spin text-emerald-600' />
            </div>
          ) : filtered.length === 0 ? (
            <div className='flex flex-col items-center justify-center p-8 text-gray-400'>
              <MessageSquare className='h-8 w-8 mb-2 text-gray-300' />
              <p className='text-sm'>No conversations yet</p>
            </div>
          ) : (
            filtered.map((chat) => (
              <button
                key={chat.id}
                onClick={() => setActiveChat(chat)}
                className={`w-full p-4 flex items-start gap-3 hover:bg-gray-50 transition-colors border-b border-gray-50 text-left
                  ${activeChat?.id === chat.id ? 'bg-emerald-50/50' : ''}`}
              >
                <div className='w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center shrink-0 text-gray-500'>
                  {chat.name?.[0]?.toUpperCase() || (
                    <User className='h-5 w-5' />
                  )}
                </div>
                <div className='flex-1 min-w-0'>
                  <div className='flex justify-between items-baseline mb-1'>
                    <h3 className='font-bold text-gray-900 text-sm truncate'>
                      {chat.name}
                    </h3>
                    {chat.role && (
                      <span className='text-[10px] text-gray-400 uppercase tracking-wide ml-2 shrink-0'>
                        {chat.role}
                      </span>
                    )}
                  </div>
                  <p className='text-sm text-gray-500 truncate'>
                    {chat.lastMessage}
                  </p>
                </div>
                {chat.unread > 0 && (
                  <span className='w-5 h-5 rounded-full bg-emerald-500 text-white text-[10px] font-bold flex items-center justify-center shrink-0'>
                    {chat.unread}
                  </span>
                )}
              </button>
            ))
          )}
        </div>
      </div>

      {/* Chat area */}
      <div
        className={`flex-1 flex flex-col bg-white ${!activeChat ? 'hidden md:flex' : 'flex'}`}
      >
        {activeChat ? (
          <>
            <div className='p-4 border-b border-gray-100 flex items-center gap-3 shadow-sm z-10'>
              <button
                onClick={() => setActiveChat(null)}
                className='md:hidden p-2 -ml-2 text-gray-500'
              >
                <ArrowLeft className='h-5 w-5' />
              </button>
              <div className='w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700'>
                <span className='font-bold'>
                  {activeChat.name?.[0]?.toUpperCase()}
                </span>
              </div>
              <div>
                <h3 className='font-bold text-gray-900'>{activeChat.name}</h3>
                <span className='flex items-center gap-1.5 text-xs text-emerald-600 font-medium'>
                  <span className='w-1.5 h-1.5 rounded-full bg-emerald-500' />
                  Online
                </span>
              </div>
            </div>

            <div className='flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/30'>
              <div className='text-center text-xs text-gray-400 my-4'>
                Today
              </div>
              {messages.map((msg, i) => {
                const isMe = msg.senderId === currentUser?.id;
                return (
                  <div
                    key={msg.id || i}
                    className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm
                      ${isMe ? 'bg-emerald-600 text-white rounded-br-none shadow-md' : 'bg-white text-gray-700 border border-gray-100 rounded-bl-none shadow-sm'}`}
                    >
                      {msg.text}
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            <div className='p-4 bg-white border-t border-gray-100'>
              <form onSubmit={handleSendMessage} className='flex gap-2'>
                <input
                  type='text'
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder='Type a message...'
                  className='flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500 transition-colors'
                />
                <button
                  type='submit'
                  disabled={!message.trim()}
                  className='p-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
                >
                  <Send className='h-5 w-5' />
                </button>
              </form>
            </div>
          </>
        ) : (
          <div className='flex-1 flex flex-col items-center justify-center text-gray-400 p-8'>
            <div className='w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4'>
              <MessageSquare className='h-8 w-8 text-gray-300' />
            </div>
            <p className='text-lg font-medium text-gray-500'>
              Select a conversation
            </p>
            <p className='text-sm mt-1'>
              Choose a student or instructor to message
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
