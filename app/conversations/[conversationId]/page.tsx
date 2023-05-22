import getConversationById from "@/app/actions/getConversationById";
import getMessages from "@/app/actions/getMessages";
import EmptyState from "@/app/components/EmptyState";
import ConversationHeader from "@/app/conversations/[conversationId]/components/ConversationHeader";
import ConversationBody from "@/app/conversations/[conversationId]/components/ConversationBody";
import MessageForm from "@/app/conversations/[conversationId]/components/MessageForm";

interface IParams {
  conversationId: string;
}
const ConversationId = async ({ params }: { params: IParams }) => {
  const { conversationId } = params;

  const [conversation, messages] = await Promise.all([
    getConversationById(conversationId),
    getMessages(conversationId),
  ]);
  console.log("messages", messages);

  if (!conversation) {
    return (
      <div className="lg:pl-80 h-full">
        <div className="h-full flex flex-col">
          <EmptyState />
        </div>
      </div>
    );
  }

  return (
    <div className="lg:pl-80 h-full">
      <div className="h-full flex flex-col">
        <ConversationHeader conversation={conversation} />
        <ConversationBody initialMessages={messages} />
        <MessageForm />
      </div>
    </div>
  );
};

export default ConversationId;
