"use client";

import { Conversation, Message } from "@prisma/client";
import { User } from ".prisma/client";
import { FullMessageType } from "@/app/types";
import { useEffect, useRef, useState } from "react";
import useConversation from "@/app/hooks/useConversation";
import MessageBox from "@/app/conversations/[conversationId]/components/MessageBox";
import axios from "axios";
import { pusherClient } from "@/app/libs/pusher";
import { find } from "lodash";

interface IConversationBodyProps {
  initialMessages: FullMessageType[];
}

const ConversationBody = ({ initialMessages }: IConversationBodyProps) => {
  console.log("initialMessages", initialMessages);
  const [messages, setMessages] = useState(initialMessages);

  const bottomRef = useRef<HTMLDivElement>(null);

  const { conversationId } = useConversation();

  useEffect(() => {
    axios.post(`/api/conversations/${conversationId}/seen`);
  }, [conversationId]);

  useEffect(() => {
    pusherClient.subscribe(conversationId);
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });

    const messageHandler = (message: FullMessageType) => {
      setMessages((prev) => {
        if (find(prev, { id: message.id })) return prev;

        return [...prev, message];
      });
      axios.post(`/api/conversations/${conversationId}/seen`);
    };

    pusherClient.bind("messages:new", messageHandler);

    return () => {
      pusherClient.unsubscribe(conversationId);
      pusherClient.unbind("messages:new", messageHandler);
    };
  }, [conversationId]);

  return (
    <div className="flex-1 overflow-y-auto bg-neutral-50">
      {messages.map((message, i) => (
        <MessageBox
          isLastMessage={i === messages.length - 1}
          key={message.id}
          data={message}
        />
      ))}
      <div className="pt-24" ref={bottomRef} />
    </div>
  );
};

export default ConversationBody;
