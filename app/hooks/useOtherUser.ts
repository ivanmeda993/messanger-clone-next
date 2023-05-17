import { useSession } from "next-auth/react";
import { useMemo } from "react";
import { FullConversationType } from "@/app/types";

const useOtherUser = (conversation: FullConversationType) => {
  const session = useSession();

  return useMemo(() => {
    const currentUserEmail = session?.data?.user?.email;
    return conversation.users.find((user) => user.email !== currentUserEmail);
  }, [conversation.users, session?.data?.user?.email]);
};

export default useOtherUser;
