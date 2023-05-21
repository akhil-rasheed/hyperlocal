import { User } from "@prisma/client";
import Image from "next/image";
import CreatePost from "./CreatePost";

interface PostActionProps {
  user: User;
}

const PostAction: React.FC<PostActionProps> = ({ user }) => {
  return (
    <div className="h-full flex flex-col items-start lg:items-center p-4 justify-center w-full  lg:w-1/2 lg:p-8">
      <CreatePost user={user} />
    </div>
  );
};

export default PostAction;
