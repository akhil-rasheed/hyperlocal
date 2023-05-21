import { ImArrowUp } from "react-icons/im";
import { BiUpvote } from "react-icons/bi";
import { BiDownvote } from "react-icons/bi";
import { ImArrowDown } from "react-icons/im";
import Image from "next/image";
import getReadableTime from "@/app/actions/getReadableTime";

interface PostProps {
  _id: number;
  username: string;
  desc: string;
  title: string;
  createdAt: Date;
  imageUrl: string;
}

const Post: React.FC<PostProps> = ({
  _id,
  username,
  desc,
  title,
  createdAt,
  imageUrl,
}) => {
  return (
    <div
      key={_id}
      className=" bg-mint-green my-8 font-thin text-xl rounded-lg w-full max-w-xl flex flex-col text-white hover:ring-2 hover:cursor-pointer hover:ring-rich-black hover:shadow-lg hover:shadow-black  "
    >
      <div className="pt-2 pl-4 bg-ultra-violet rounded-t-lg ">
        <div className="w-full flex justify-start ">
          {imageUrl && <img src={imageUrl} className="h-40 mb-4" />}
        </div>
        <div className="flex flex-row w-full justify-between rounded-t-lg bg-ultra-violet pt-2 pb-2  pr-4">
          <span className=" text-lg font-bold text-teal-900 ">{title} </span>

          <div className="flex flex-col">
            <span className="text-sm text-white bg-gray-700 px-2 rounded-full">
              {username}
            </span>
            <span className="text-xs text-mint-green font-thin text-center ">
              {getReadableTime(createdAt)}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-row px-4 py-2 items-center">
        <div className="flex flex-col">
          {/* <ImArrowUp color="black" /> */}
          <BiUpvote color="gray" />
          <span className="text-sm font-bold text-center text-black/75">
            {Math.floor(Math.random() * 30)}
          </span>
          {/* <ImArrowDown color="black" /> */}
          <BiDownvote color="gray" />
        </div>
        <div className="text-sm ml-4 text-black/75 x ">{desc}</div>
      </div>
    </div>
  );
};

export default Post;
