"use client";

import PostC from "./Post";

interface Post {
  id: number;
  username: string;
  desc: string;
  title: string;
  createdAt: Date;
  imageUrl: string;
}

const Nearby = ({ posts }) => {
  console.log("being recieved", posts);
  return (
    <div className="px-8 mb-10 justify-center items-center w-full bg-rich-black overflow-y-scroll scrollbar-hide ">
      {posts.map((post) => {
        return (
          <PostC
            key={post._id}
            _id={post._id}
            username={post.username}
            title={post.title}
            desc={post.desc}
            createdAt={post.createdAt}
            imageUrl={post.imageUrl}
          />
        );
      })}
    </div>
  );
};

export default Nearby;
