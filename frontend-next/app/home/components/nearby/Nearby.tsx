"use client";

import PostC from "./Post";

import { User } from "@prisma/client";

interface Post {
  user: User;
  id: number;
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

const Nearby = ({ posts ,user }) => {
  console.log("being recieved", posts);
  return (
    <div className="px-8 mb-10 justify-center items-center w-full bg-rich-black overflow-y-scroll scrollbar-hide ">
      {posts.map((post) => {
        return (
          <PostC
            user={user}
            key={post._id}
            _id={post._id}
            username={post.username}
            title={post.title}
            desc={post.desc}
            createdAt={post.createdAt}
            imageUrl={post.imageUrl}
            upvotescount={post.upvotescount}
            downvotescount={post.downvotescount}
            upvotes={post.upvotes}
            downvotes={post.downvotes}
          />
        );
      })}
    </div>
  );
};

export default Nearby;
