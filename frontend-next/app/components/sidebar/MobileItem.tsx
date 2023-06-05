import Link from "next/link";

import clsx from "clsx";

interface MobileItemProps {
  href: string;
  icon: any;
  active?: boolean;
  onClick?: () => void;
}

const MobileItem: React.FC<MobileItemProps> = ({
  href,
  icon: Icon,
  active,
  onClick,
}) => {
  const handleClick = () => {
    if (onClick) {
      return onClick();
    }
  };

  return (
    <Link
      onClick={handleClick}
      href={href}
      className={clsx(
        `
        group 
        flex 
        gap-x-3 
        text-sm 
        leading-6 
        font-semibold 
        w-full 
        justify-between 
        px-3
        overflow-y-visible
        text-gray-500 
        hover:text-black 
        hover:bg-black-300
         flex-col
      `
      )}
      style={{ color: "#cb8c26" }}
    >
      {href === "/post" ? (
        <Icon className="h-20 w-20" />
      ) : (
        <Icon className="h-9 w-9" />
      )}
      {/* <p className="text-xs">{href}</p> */}
    </Link>
  );
};

export default MobileItem;
