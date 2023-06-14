// import { ImArrowUp } from "react-icons/im";
import { BiUpvote } from "react-icons/bi";
import { BiDownvote } from "react-icons/bi";
// import { ImArrowDown } from "react-icons/im";
import Image from "next/image";
import getReadableTime from "@/app/actions/getReadableTime";
import ImageViewer from "react-simple-image-viewer";
import { useState, useCallback, useEffect } from "react";
import { User } from "@prisma/client";
import axios from "axios";
interface PostProps {
  user: User,
  _id: number;
  username: string;
  desc: string;
  title: string;
  createdAt: Date;
  imageUrl: string;
  upvotescount: number;
  downvotescount: number;
  upvotes: Array<string>;
  downvotes: Array<string>;

}

const Post: React.FC<PostProps> = ({
  user,
  _id,
  username,
  desc,
  title,
  createdAt,
  imageUrl,
  upvotescount,
  downvotescount
}) => {

  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [upvote, setUpvote] = useState(upvotescount);
  const [downvote, setDownvote] = useState(downvotescount);
  const openImageViewer = useCallback(() => {
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setIsViewerOpen(false);
  };


  const upVote = () => {

    const reqObj = { "userId": user.id.toString() }
    axios.put(`https://hyperlocal-backend.fly.dev/api/${_id}/upvote`, reqObj).then(function (response) {
      setUpvote(response.data.data.upvotescount);
      setDownvote(response.data.data.downvotescount);
    })
      .catch(function (error) {
        console.log(error);
      });



  };
  const downVote = () => {

    const reqObj = { "userId": user.id.toString() }
    axios.put(`https://hyperlocal-backend.fly.dev/api/${_id}/downvote`, reqObj).then(function (response) {
      setDownvote(response.data.data.downvotescount);
      setUpvote(response.data.data.upvotescount);
    })
      .catch(function (error) {
        console.log(error);
      });
  };


  return (
    <div
      key={_id}
      className=" bg-mint-green my-8 font-thin text-xl rounded-lg w-full max-w-xl flex flex-col text-white hover:ring-2 hover:cursor-pointer hover:ring-rich-black hover:shadow-lg hover:shadow-black  "
    >
      <div className="pt-2 pl-4 bg-ultra-violet rounded-t-lg ">
        <div className="w-full flex justify-start ">
          {imageUrl && (
            <img
              src={imageUrl}
              onClick={() => openImageViewer()}
              className="h-40 mb-4"
            />
          )}
          {isViewerOpen && (
            <ImageViewer
              src={[imageUrl]}
              disableScroll={false}
              closeOnClickOutside={true}
              onClose={closeImageViewer}
            />
          )}
        </div>
        <div className="flex flex-row w-full justify-between rounded-t-lg bg-ultra-violet pt-2 pb-2  pr-2">
          <span className=" text-lg font-bold text-teal-900 ">{title} </span>

          <div className="flex flex-col">
            <div className="flex flex-row justify-end">
              <span className="text-xs text-rich-black/75 px-2 border-2 border-rich-black font-bold w-fit whitespace-nowrap  ">
                {username}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-row px-4 py-2 items-center">
        <div className="flex flex-col">
          {/* <ImArrowUp color="black" /> */}
          <BiUpvote color="gray" onClick={upVote} />
          <span className="text-sm font-bold text-center text-black/75">
            {upvote - downvote}
          </span>
          {/* <ImArrowDown color="black" /> */}
          <BiDownvote color="gray" onClick={downVote} />
        </div>
        <div className="text-sm ml-4 text-black/75 x ">{desc}</div>
      </div>
    </div>
  );
};

export default Post;
