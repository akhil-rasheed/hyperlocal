import { User } from "@prisma/client";
import Image from "next/image";
import CreatePost from "./CreatePost";

interface PostActionProps {
  user: User;
}

const PostAction: React.FC<PostActionProps> = ({ user }) => {
  return (
    <div className="h-full flex flex-col items-center justify-center w-full p-8">
      <p className="text-white text-4xl font-bold ">
        Welcome to hyperlocal,{" "}
        <span className="text-green-500 whitespace-nowrap">{user?.name}</span>{" "}
        start by making a post
      </p>
      <CreatePost user={user} />
    </div>
  );
};

export default PostAction;
