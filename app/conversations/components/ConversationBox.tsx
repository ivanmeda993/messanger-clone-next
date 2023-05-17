"use client";

import { User, Conversation, Message } from "@prisma/client";
import { FullConversationType } from "@/app/types";
import { useCallback, useMemo } from "react";
import { format } from "date-fns";
import clsx from "clsx";
import useOtherUser from "@/app/hooks/useOtherUser";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
interface ConversationBoxProps {
  data: FullConversationType;
  selected?: boolean;
}
const ConversationBox = ({ selected, data }: ConversationBoxProps) => {
  const otherUser = useOtherUser(data);
  const session = useSession();
  const router = useRouter();

  const handleClick = useCallback(() => {
    router.push(`/conversations/${data.id}`);
  }, [router, data.id]);

  const lastMessage = useMemo(() => {
    const messages = data.messages || [];
    return messages[messages.length - 1];
  }, [data.messages]);

  const userEmail = useMemo(() => {
    return session.data?.user?.email;
  }, [session.data?.user?.email]);

  const hasSeen = useMemo(() => {
    if (!lastMessage) return false;

    const seenArray = lastMessage.seen || [];

    if (!userEmail) return false;

    return seenArray.filter((user) => user.email === userEmail).length !== 0;
  }, [lastMessage, userEmail]);

  return <div>ConversationBox</div>;
};

export default ConversationBox;
