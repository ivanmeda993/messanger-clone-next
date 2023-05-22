"use client";

import { User } from ".prisma/client";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import axios from "axios";
import Avatar from "@/app/components/Avatar";
import LoadingModal from "@/app/components/modals/LoadingModal";

interface UserBoxProps {
  user: User;
}
const UserBox = ({ user }: UserBoxProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = useCallback(() => {
    setIsLoading(true);

    axios
      .post("/api/conversations", {
        userId: user.id,
      })
      .then((res) => {
        router.push(`/conversations/${res.data.id}`);
      })
      .finally(() => setIsLoading(false));
  }, [router, user.id]);

  return (
    <>
      {isLoading && <LoadingModal />}
      <div
        onClick={handleClick}
        className="w-full relative flex items-center space-x-3 bg-white p-2 hover:bg-neutral-100 rounded-lg cursor-pointer transition"
      >
        <Avatar user={user} />
        <div className="min-w-0 flex-1">
          <div className="focus:outline-none">
            <div className="flex justify-between items-center mb-1">
              <p className="text-sm font-medium text-gray-900">{user.name}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserBox;
