"use client";
import { useState, useEffect } from "react";
import getPosts from "../../actions/getPosts";
import Post from "./Post";
interface Post {
  _id: number;
  username: string;
  desc: string;
  title: string;
  createdAt: Date;
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
          <Post
            key={post._id}
            id={post._id}
            username={post.username}
            title={post.title}
            desc={post.desc}
            date={post.createdAt}
          />
        );
      })}
    </div>
  );
};

export default Nearby;
