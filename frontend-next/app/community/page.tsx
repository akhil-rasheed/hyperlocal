import React from "react";
import EmptyState from "../components/EmptyState";
import getCurrentUser from "@/app/actions/getCurrentUser";

async function Community() {
  const currentUser = await getCurrentUser();
  return (
    <div className=" h-full flex flex-col lg:flex-row justify-center items-center w-full  lg:px-40 bg-black"></div>
  );
}

export default Community;
