"use client";

import { User } from ".prisma/client";
import Image from "next/image";
import useActiveList from "@/app/hooks/useActiveList";

interface AvatarProps {
  user?: User;
}
const Avatar = ({ user }: AvatarProps) => {
  const { members } = useActiveList();
  const isActive = members.indexOf(user?.email!) > -1;

  console.log("members", members);
  return (
    <div className="relative flex justify-center">
      <div className="relative inline-block rounded-full overflow-hidden h-9 w-9 ">
        <Image
          src={user?.image || "/images/placeholder.jpg"}
          alt="Avatar"
          fill
        />
      </div>
      {isActive && (
        <span className="absolute block rounded-full bg-green-500 ring-2 ring-white top-0 right-0 h-2 w-2" />
      )}
    </div>
  );
};

export default Avatar;
