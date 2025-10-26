import { useState, useEffect, useRef } from 'react';
import { Send } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Avatar } from './ui/avatar';
import { useAuth } from '../contexts/AuthContext';
import { getMessages, STORAGE_KEYS } from '../services/mockData';
import { Message } from '../types';
import { formatTime } from '../lib/utils';

interface ChatInterfaceProps {
  groupId: string;
}

export function ChatInterface({ groupId }: ChatInterfaceProps) {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const groupMessages = getMessages(groupId);
    setMessages(groupMessages);
  }, [groupId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !user) return;

    const message: Message = {
      id: `msg${Date.now()}`,
      groupId,
      senderId: user.id,
      senderName: user.name,
      content: newMessage,
      timestamp: new Date().toISOString(),
      isRead: false,
    };

    const allMessages = JSON.parse(localStorage.getItem(STORAGE_KEYS.MESSAGES) || '[]');
    const updated = [...allMessages, message];
    localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(updated));
    
    setMessages([...messages, message]);
    setNewMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader className="border-b">
        <CardTitle>Group Chat</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col p-0">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => {
            const isOwnMessage = message.senderId === user?.id;
            return (
              <div
                key={message.id}
                className={`flex gap-3 ${isOwnMessage ? 'flex-row-reverse' : ''}`}
              >
                <Avatar name={message.senderName} />
                <div className={`flex-1 ${isOwnMessage ? 'text-right' : ''}`}>
                  <div
                    className={`inline-block px-4 py-2 rounded-lg ${
                      isOwnMessage
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <p className="text-sm font-medium mb-1">
                      {isOwnMessage ? 'You' : message.senderName}
                    </p>
                    <p className="text-sm">{message.content}</p>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>
        <div className="border-t p-4">
          <div className="flex gap-2">
            <Input
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <Button onClick={handleSendMessage}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

