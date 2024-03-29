"use client";
import { User } from ".prisma/client";
import UserBox from "@/app/users/components/UserBox";

interface UserListProps {
  users: User[];
}
const UserList = ({ users }: UserListProps) => {
  console.log(users);
  return (
    <aside
      className="
        fixed
        inset-y-0
        pb-0
        lg:pb-0
        lg:left-20
        lg:w-80
        lg:block
        overflow-y-auto
        border-r
        border-gray-200
        block
        w-full
        left-0"
    >
      <div className="px-5">
        <div className="flex-col flex">
          <div
            className="
            text-2xl
            font-bold
            text-neutral-800
            py-4"
          >
            Users
          </div>
        </div>
        {users.map((user) => (
          <UserBox key={user.id} user={user} />
        ))}
      </div>
    </aside>
  );
};

export default UserList;
