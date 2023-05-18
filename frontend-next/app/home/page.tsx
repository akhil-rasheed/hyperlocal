import React from "react";
import EmptyState from "../components/EmptyState";
import Map from "./components/map/Map";
import Nearby from "./components/nearby/Nearby";
import PostAction from "./components/create/PostAction";
import getCurrentUser from "@/app/actions/getCurrentUser";
import InteractiveViewer from "./components/nearby/InteractiveViewer";

async function Home() {
  const currentUser = await getCurrentUser();
  return (
    <div className="hidden h-full lg:flex lg:flex-row justify-center items-center w-full px-40">
      <InteractiveViewer />
      <PostAction user={currentUser!} />
    </div>
  );
}

export default Home;
