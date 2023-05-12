import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { GrMapLocation } from "react-icons/gr";
import { HiArrowLeftOnRectangle, HiUsers } from "react-icons/hi2";
import { signOut } from "next-auth/react";
import { CgCommunity } from "react-icons/cg";

const useRoutes = () => {
  const pathname = usePathname();

  const routes = useMemo(
    () => [
      {
        label: "Nearby",
        href: "/nearby",
        icon: GrMapLocation,
        active: pathname === "/nearby",
      },
      {
        label: "Communities",
        href: "/community",
        icon: CgCommunity,
        active: pathname === "/community",
      },
      {
        label: "Logout",
        onClick: () => signOut(),
        href: "#",
        icon: HiArrowLeftOnRectangle,
      },
    ],
    [pathname]
  );

  return routes;
};

export default useRoutes;
