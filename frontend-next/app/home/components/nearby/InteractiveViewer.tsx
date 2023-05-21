"use client";
import Map from "../map/Map";
import Nearby from "./Nearby";
import getPosts from "../../../actions/getPosts";
import { useEffect, useState } from "react";

interface Post {
  _id: number;
  username: string;
  desc: string;
  title: string;
  createdAt: Date;
  imageUrl: string;
}

const InteractiveViewer = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  useEffect(() => {
    getPosts().then((posts) => {
      setPosts(posts.reverse());
      console.log(posts);
    });
  }, []);
  return (
    <div className=" w-full max-w-4xl  h-full max-h-[900px] overflow-y-auto scrollbar-hide">
      <div className="sticky top-0">
        <Map posts={posts} />
      </div>
      {posts && posts.length !== 0 && <Nearby posts={posts} />}
    </div>
  );
};

export default InteractiveViewer;
