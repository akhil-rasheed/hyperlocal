import React from "react";
import EmptyState from "../components/EmptyState";
import Map from "./components/map/Map";
import Nearby from "./components/nearby/Nearby";
import getCurrentUser from "@/app/actions/getCurrentUser";
import InteractiveViewer from "./components/nearby/InteractiveViewer";

async function Home() {
  const currentUser = await getCurrentUser();
  return (
    <div className=" h-full flex flex-col lg:flex-row justify-center items-center w-full  lg:px-40 bg-black">
      <InteractiveViewer user={currentUser!} />
    </div>
  );
}

export default Home;
