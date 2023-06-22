"use client";
import Map from "../map/Map";
import Nearby from "./Nearby";
import getPosts from "../../../actions/post/getPosts";
import { useEffect, useState } from "react";
import { User } from "@prisma/client";
import axios from "axios";
import { headers } from "next/dist/client/components/headers";
import { data } from "autoprefixer";
import { config } from "process";

interface Post {
  user: User,
  _id: number;
  username: string;
  desc: string;
  title: string;
  createdAt: Date;
  imageUrl: string;
}

const InteractiveViewer = ({ user }) => {
  const [distWithin, setDistWithin] = useState(4);
  const [posts, setPosts] = useState<Post[]>([]);



  useEffect(() => {

    navigator.geolocation.getCurrentPosition((position) => {

      const lat = position.coords.latitude;
      const long = position.coords.longitude;
      console.log(lat);
      console.log(long);
      axios.get(`http://localhost:8080/api/nearBy-news?distWithin=${distWithin}&longitude=${long}&latitude=${lat}`,)
        .then(response => {
          // Handle the response
          setPosts(response.data.data);

        })
        .catch(error => {
          // Handle the error
          console.log(error);
        });
    });



  }, []);
  return (
    <div className=" w-full max-w-4xl  h-full max-h-[900px] overflow-y-auto scrollbar-hide">
      <div className="sticky top-0">
        <Map posts={posts} />
      </div>
      {posts && posts.length !== 0 && <Nearby posts={posts} user={user} />}
    </div>
  );
};

export default InteractiveViewer;