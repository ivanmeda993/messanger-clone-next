import Sidebar from "@/app/components/sidebar/Sidebar";
import ConversationsList from "@/app/conversations/components/ConversationsList";
import getConversations from "@/app/actions/getConversations";

const ConversationsLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const conversations = await getConversations();
  return (
    // @ts-expect-error Server Component
    <Sidebar>
      <div className="h-full">
        <ConversationsList initialItems={conversations} />
        {children}
      </div>
    </Sidebar>
  );
};

export default ConversationsLayout;
