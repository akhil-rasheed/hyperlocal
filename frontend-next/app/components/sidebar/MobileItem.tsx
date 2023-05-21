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
        justify-center 
        p-4 
        text-gray-500 
        hover:text-black 
        hover:bg-black-300
         flex-col
      `,
        active && " text-black"
      )}
    >
      {href === "/post" ? (
        <Icon color="black" className="h-9 w-9 text-rich-black" />
      ) : (
        <Icon color="black" className="h-6 w-6" />
      )}
      {/* <p className="text-xs">{href}</p> */}
    </Link>
  );
};

export default MobileItem;
