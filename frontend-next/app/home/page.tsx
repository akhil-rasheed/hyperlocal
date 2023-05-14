import React from "react";
import EmptyState from "../components/EmptyState";
import Map from "./components/Map";
import Nearby from "./components/Nearby";
import PostAction from "./components/PostAction";
import getCurrentUser from "@/app/actions/getCurrentUser";

async function Home() {
  const currentUser = await getCurrentUser();
  console.log("hi hello", currentUser);
  return (
    <div className="hidden h-full lg:flex lg:flex-row">
      <div className="mx-20 w-1/2">
        <Map />
        <Nearby />
      </div>
      <div className="w-1/2">
        <PostAction user={currentUser!} />
      </div>
    </div>
  );
}

export default Home;
