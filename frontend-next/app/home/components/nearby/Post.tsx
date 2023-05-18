import { ImArrowUp } from "react-icons/im";
import { BiUpvote } from "react-icons/bi";
import { BiDownvote } from "react-icons/bi";
import { ImArrowDown } from "react-icons/im";
import Image from "next/image";

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
  function getReadableTime(isoTimestamp: Date) {
    const date = new Date(isoTimestamp);
    const now = new Date();

    // Calculate the time difference in milliseconds
    const timeDifference = now - date;

    // Check if the timestamp is within the last week
    if (timeDifference < 7 * 24 * 60 * 60 * 1000) {
      const daysOfWeek = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      const dayOfWeek = daysOfWeek[date.getUTCDay()];

      // Check if the timestamp refers to the same day
      if (
        now.getUTCDate() === date.getUTCDate() &&
        now.getUTCMonth() === date.getUTCMonth() &&
        now.getUTCFullYear() === date.getUTCFullYear()
      ) {
        // Calculate the time difference in minutes and hours
        const minutes = Math.floor(timeDifference / (1000 * 60));
        const hours = Math.floor(timeDifference / (1000 * 60 * 60));

        if (minutes < 60) {
          return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
        } else {
          return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
        }
      }

      return `Last ${dayOfWeek}`;
    }

    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: false,
      timeZone: "UTC",
    };

    return date.toLocaleString("en-US", options);
  }
  return (
    <div
      key={_id}
      className=" bg-white/75 my-8 font-thin text-xl rounded-lg w-full flex flex-col text-white "
    >
      <div className="pt-2 pl-4 bg-white rounded-t-lg ">
        <div className="w-full flex justify-start ">
          {imageUrl && <img src={imageUrl} className="h-40 mb-4" />}
        </div>
        <div className="flex flex-row w-full justify-between rounded-t-lg bg-white pt-2 pb-2  pr-4">
          <span className=" text-lg font-bold text-teal-900 ">{title} </span>

          <div className="flex flex-col">
            <span className="text-sm text-white bg-gray-700 px-2 rounded-full">
              {username}
            </span>
            <span className="text-xs text-gray-700 font-thin text-center ">
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
