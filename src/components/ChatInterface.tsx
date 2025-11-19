import { useState, useEffect, useRef } from "react";
import { Send } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Avatar } from "./ui/avatar";
import { useAuth } from "../contexts/AuthContext";
import { GroupChatMessage } from "../types";
import { formatTime } from "../lib/utils";
import { useMessages } from "@/hooks";

interface ChatInterfaceProps {
  groupId: number;
  chatId?: number;
}

export function ChatInterface({ groupId, chatId }: ChatInterfaceProps) {
  const { user } = useAuth();

  const { messages, getMessages, sendMessage, setMessages, loadMore, hasMore, loading } = useMessages(
    groupId,
    chatId
  );
  const initialMessage: GroupChatMessage = {
    id: "temp-" + Date.now(), // Use a unique string for temp messages
    senderId: user?.id!,
    sender: user!,
    content: "",
    chatId: chatId!,
  } as GroupChatMessage;
  const [newMessage, setNewMessage] =
    useState<GroupChatMessage>(initialMessage);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getMessages();
  }, []);

  useEffect(() => {
    if (isInitialLoad && messages.length > 0) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      setIsInitialLoad(false);
    }
  }, [messages, isInitialLoad]);

  const handleScroll = () => {
    const container = messagesContainerRef.current;
    if (container && container.scrollTop === 0 && hasMore && !loading) {
      loadMore();
    }
  };

  const handleSendMessage = () => {
    if (!newMessage?.content?.trim() || !user) return;
    setMessages((prev) => [...prev, newMessage]);
    setNewMessage(initialMessage);

    sendMessage(newMessage);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader className="border-b">
        <CardTitle>Group Chat</CardTitle>
      </CardHeader>
      <CardContent className="h-[100%] flex-1 flex flex-col p-0">
        <div className="flex-1 overflow-y-auto p-4 space-y-4" ref={messagesContainerRef} onScroll={handleScroll}>
          {loading && <div className="text-center text-xs text-gray-500">Loading...</div>}
          {messages.map((message: GroupChatMessage) => {
            const isOwnMessage = message.senderId === user?.id;
            // Use string key for temp messages, number for real ones
            const key = typeof message.id === "string" ? message.id : `msg-${message.id}`;
            return (
              <div
                key={key}
                className={`flex gap-3 ${isOwnMessage ? "flex-row-reverse" : ""}`}
              >
                <Avatar name={message.sender.name} />
                <div className={`flex-1 ${isOwnMessage ? "text-right" : ""}`}>
                  <div
                    className={`inline-block px-4 py-2 rounded-lg ${
                      isOwnMessage
                        ? "bg-primary text-white"
                        : "bg-gray-100 text-gray-900"
                    }`}
                  >
                    <p className="text-sm font-medium mb-1">
                      {isOwnMessage ? "You" : message.sender.name}
                    </p>
                    <p className="text-sm">{message.content}</p>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {formatTime(message.createdAt.toString())}
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
              value={newMessage.content}
              onChange={(e) => {
                setNewMessage({
                  ...newMessage,
                  content: e.target.value,
                  createdAt: new Date(),
                });
              }}
              onKeyPress={handleKeyPress}
            />
            <Button
              onClick={() => {
                handleSendMessage();
              }}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
