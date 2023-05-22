import Sidebar from "@/app/components/sidebar/Sidebar";
import ConversationsList from "@/app/conversations/components/ConversationsList";
import getConversations from "@/app/actions/getConversations";
import getUsers from "@/app/actions/getUsers";

const ConversationsLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [conversations, users] = await Promise.all([
    getConversations(),
    getUsers(),
  ]); // [conversations, users
  return (
    // @ts-expect-error Server Component
    <Sidebar>
      <div className="h-full">
        <ConversationsList initialItems={conversations} users={users} />
        {children}
      </div>
    </Sidebar>
  );
};

export default ConversationsLayout;
