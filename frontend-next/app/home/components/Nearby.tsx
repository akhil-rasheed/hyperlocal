"use client";
import { useState, useEffect } from "react";
import getPosts from "../../actions/getPosts";

interface Post {
  _id: number;
  creator: string;
  desc: string;
  title: string;
}

const Nearby = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  useEffect(() => {
    getPosts().then((posts) => {
      setPosts(posts);
      // console.log(posts)
    });
  }, []);

  return (
    <div className="p-20 bg-gray-100 justify-center items-center w-full h-1/2 overflow-y-scroll">
      {posts.map((post) => {
        return (
          <div
            key={post?._id}
            className="bg-gray-300/50 p-6 m-4 font-thin text-xl rounded-xl w-fit"
          >
            <span className="font-bold">{post?.creator} </span> {post?.desc}
          </div>
        );
      })}
    </div>
  );
};

export default Nearby;
