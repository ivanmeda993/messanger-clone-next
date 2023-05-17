import prismadb from "@/app/libs/prismadb";
import getSession from "@/app/actions/getSession";
import getCurrentUser from "@/app/actions/getCurrentUser";

export default async function getConversations() {
  const currentUser = await getCurrentUser();

  if (!currentUser?.id) {
    return [];
  }

  try {
    return await prismadb.conversation.findMany({
      orderBy: {
        lastMessageAt: "desc",
      },
      where: {
        userIds: {
          has: currentUser.id,
        },
      },
      include: {
        users: true,
        messages: {
          include: {
            sender: true,
            seen: true,
          },
        },
      },
    });
  } catch (e: any) {
    return [];
  }
}
