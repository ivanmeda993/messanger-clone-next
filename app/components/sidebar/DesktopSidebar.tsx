"use client";

import useRoutes from "@/app/hooks/useRoutes";
import { useState } from "react";
import DesktopItem from "@/app/components/sidebar/DesktopItem";
import { User } from ".prisma/client";
import Avatar from "@/app/components/Avatar";

interface DesktopSidebarProps {
  currentUser: User;
}
const DesktopSidebar = ({ currentUser }: DesktopSidebarProps) => {
  const routes = useRoutes();
  const [isOpened, setIsOpened] = useState(false);

  console.log("Current User: ", currentUser);
  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:w-20 xl:px-6 lg:overflow-y-auto lg:bg-white lg:border-r-[1px] lg:pb-4 lg:flex lg:flex-col justify-between ">
      <nav className="mt-4 flex flex-col justify-between">
        <ul role="list" className="flex-col flex items-center space-y-1">
          {routes.map((route) => (
            <DesktopItem
              key={route.label}
              href={route.href}
              label={route.label}
              icon={route.icon}
              active={route.active}
              onClick={route.onClick}
            />
          ))}
        </ul>
      </nav>
      <nav className="mt-4 flex flex-col justify-between items-center">
        <div
          className="cursor-pointer hover:opacity-70 transition"
          onClick={() => setIsOpened(true)}
        >
          <Avatar user={currentUser} />
        </div>
      </nav>
    </div>
  );
};

export default DesktopSidebar;