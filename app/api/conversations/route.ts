import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prismadb from "@/app/libs/prismadb";

export async function POST(req: Request) {
  try {
    console.log("POST /api/conversations", req.body);
    const currentUser = await getCurrentUser();
    const body = await req.json();
    const { userId, isGroup, members, name } = body;

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (isGroup && (!members || members?.length < 2 || !name)) {
      console.log("check group members and name", members, name);
      return new NextResponse("Bad Request", { status: 400 });
    }

    if (isGroup) {
      console.log("isGroup", isGroup, members, name);
      const newConversation = await prismadb.conversation.create({
        data: {
          name,
          isGroup,
          users: {
            connect: [
              ...members.map((member: { value: string }) => ({
                id: member.value,
              })),
              { id: currentUser.id },
            ],
          },
        },
        include: {
          users: true,
        },
      });
      return NextResponse.json(newConversation);
    }

    const existingConversations = await prismadb.conversation.findMany({
      where: {
        OR: [
          {
            userIds: {
              equals: [currentUser.id, userId],
            },
          },
          {
            userIds: {
              equals: [userId, currentUser.id],
            },
          },
        ],
      },
    });

    const singleConversation = existingConversations[0];
    if (singleConversation) {
      return NextResponse.json(singleConversation);
    }

    const newConversation = await prismadb.conversation.create({
      data: {
        users: {
          connect: [{ id: currentUser.id }, { id: userId }],
        },
      },
      include: {
        users: true,
      },
    });
    return NextResponse.json(newConversation);
  } catch (e: any) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
