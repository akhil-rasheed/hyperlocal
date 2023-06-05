"use client";

import useRoutes from "@/app/hooks/useRoutes";
import MobileItem from "./MobileItem";
import Avatar from "../Avatar";
import { User } from "@prisma/client";
import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { GrMapLocation, GrAddCircle } from "react-icons/gr";
import { TbLocation } from "react-icons/tb";
import { HiArrowLeftOnRectangle } from "react-icons/hi2";
import { MdAddCircle } from "react-icons/md";
import { signOut } from "next-auth/react";
import { CgCommunity, CgProfile } from "react-icons/cg";

interface MobileFooterProps {
  currentUser: User;
}

const MobileFooter: React.FC<MobileFooterProps> = ({ currentUser }) => {
  const pathname = usePathname();

  const mobRoutes = useMemo(
    () => [
      {
        label: "Nearby",
        href: "/home",
        icon: TbLocation,
        active: pathname === "/nearby",
      },
      {
        label: "Communities",
        href: "/community",
        icon: CgCommunity,
        active: pathname === "/community",
      },
      {
        label: "Post",
        href: "/post",
        icon: MdAddCircle,
        active: pathname === "/post",
      },

      {
        label: "Logout",
        onClick: () => signOut(),
        href: "#",
        icon: HiArrowLeftOnRectangle,
      },
      {
        label: "Profile",
        href: "profile",
        icon: CgProfile,
      },
    ],
    [pathname]
  );
  return (
    <div
      className="
        fixed 
        justify-between 
        w-full 
        bottom-0 
        z-40 
        flex 
        px-4
        items-center 
        bg-black
        border-t-[1px] 
        lg:hidden
      "
    >
      {mobRoutes.map((route) => (
        <MobileItem
          key={route.href}
          href={route.href}
          active={route.active}
          icon={route.icon}
          onClick={route.onClick}
        />
      ))}
    </div>
  );
};

export default MobileFooter;
