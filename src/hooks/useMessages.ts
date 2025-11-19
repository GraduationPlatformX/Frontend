import { useState, useCallback, useEffect } from "react";
import { api, supabase } from "../services/api";
import { useAuth } from "@/contexts/AuthContext";
import { GroupChatMessage } from "@/types";

export function useMessages(groupId: number, chatId?: number) {
  const { user } = useAuth();
  const [messages, setMessages] = useState<GroupChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const channel = supabase
      .channel("custom-messages-channel")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "group_chat_message",
          filter: `chatId=eq.${chatId}`,
        },
        async (payload: any) => {
          const msg = payload.new as GroupChatMessage;

          if (user?.id !== msg.senderId) {
            const { data: sender } = await supabase
              .from("users")
              .select("id, name, email, role, createdAt, updatedAt")
              .eq("id", msg.senderId)
              .single();

            setMessages((prev: any) => [
              ...prev,
              { ...msg, sender }, // attach sender info
            ]);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const getMessages = useCallback(
    async (nextPage?: number) => {
      setLoading(true);
      setError(null);

      try {
        const currentPage = nextPage ?? page;
        const response = await api.get<any>(
          `groups/${groupId}/messages?limit=${10}&page=${currentPage}`
        );
        const newMessages = response.data.data.messages;
        if (newMessages.length < 10) setHasMore(false);

        setMessages((prev) =>
          currentPage === 1 ? newMessages : [...newMessages, ...prev]
        );
        setPage(currentPage);
        return response.data.data;
      } catch (err: any) {
        const errorMessage =
          err.response?.data?.message || "Failed to fetch messages";
        setError(errorMessage);
        setHasMore(false);
        return [];
      } finally {
        setLoading(false);
      }
    },
    [groupId, page]
  );

  const loadMore = useCallback(() => {
    if (hasMore && !loading) {
      getMessages(page + 1);
    }
  }, [hasMore, loading, page, getMessages]);

  const sendMessage = useCallback(
    async (message: GroupChatMessage) => {
      setLoading(true);
      setError(null);

      try {
        const response = await api.post<{
          success: boolean;
          data: GroupChatMessage;
        }>(`/groups/${groupId}/messages`, {
          content: message?.content,
        });
        const newMessage = response.data.data;
        return newMessage;
      } catch (err: any) {
        const errorMessage =
          err.response?.data?.message || "Failed to send message";
        setError(errorMessage);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [groupId]
  );

  return {
    messages,
    loading,
    error,
    getMessages,
    sendMessage,
    setMessages,
    loadMore,
    hasMore,
  };
}
