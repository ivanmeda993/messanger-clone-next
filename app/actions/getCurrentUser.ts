import prismadb from "@/app/libs/prismadb";
import getSession from "@/app/actions/getSession";

export default async function getCurrentUser() {
  try {
    const session = await getSession();
    if (!session?.user?.email) {
      return null;
    }

    const user = await prismadb.user.findUnique({
      where: {
        email: session.user.email as string,
      },
    });

    if (!user) {
      return null;
    }
    return user;
  } catch (err: any) {
    console.log(err);
    return null;
  }
}
