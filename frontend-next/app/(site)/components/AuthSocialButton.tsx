import { IconType } from "react-icons";

interface AuthSocialButtonProps {
  icon: IconType;
  onClick: () => void;
}

export const AuthSocialButton: React.FC<AuthSocialButtonProps> = ({
  icon: Icon,
  onClick,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex w-full justify-center hover:bg-mint-green rounded-md bg-ultra-violet px-4 py-2 text-gray-500 shadow-sm hover:bg-gray-50 focus:outline-offset"
    >
      <Icon />
    </button>
  );
};
