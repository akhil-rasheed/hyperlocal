import React from "react";
import EmptyState from "../components/EmptyState";
import PostAction from "./components/create/PostAction";
import getCurrentUser from "@/app/actions/auth/getCurrentUser";

async function Post() {
  const currentUser = await getCurrentUser();
  return (
    <div className=" h-full flex flex-col lg:flex-row justify-center items-center w-full  lg:px-40 bg-black">
      <PostAction user={currentUser!} />
    </div>
  );
}

export default Post;
