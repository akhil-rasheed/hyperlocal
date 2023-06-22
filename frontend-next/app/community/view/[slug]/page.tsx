"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import getCommunity from "@/app/actions/community/getCommunity";
export default function CommunityView({
  params,
}: {
  params: { slug: string };
}) {
  const [loading, setLoading] = useState(true);
  const [community, setCommunity] = useState({
    communityName: "",
    joinCode: "",
    desc: "",
    users: [],
  });

  useEffect(() => {
    getCommunity(params.slug).then((community) => {
      setCommunity(community);
    });
  }, []);

  return (
    <div className="text-white font-bold h-full flex flex-col items-center">
      <div className="bg-ultra-violet w-full rounded-b-xl text-rich-black flex flex-col items-center justify-center p-4">
        <p className="text-4xl font-bold ">{community.communityName}</p>
        <p className="font-normal text-honey-yellow text-sm">
          {community.desc}
        </p>
        <p className="self-start font-normal text-sm mt-4">
          Total Users:{" "}
          <span className="text-honey-yellow">{community.users.length}</span>
        </p>
      </div>

      {community.users.length < 2 && (
        <div className="bg-rich-black flex flex-col gap-4 rounded-xl p-6 text-ultra-violet mt-8 mx-6">
          It sounds a little quiet in here, why not invite some new members?
          <p>Here's your join code!</p>
          <div className="text-4xl text-white font-bold text-center bg-honey-yellow p-2">
            {community.joinCode.split("").map((char, index) => {
              if (index < 5) return <span>{char}-</span>;
              else return <span>{char}</span>;
            })}
          </div>
        </div>
      )}
    </div>
  );
}
