"use client";
import React from "react";
import EmptyState from "../components/EmptyState";
import Map from "./components/Map";

const Home = () => {
  return (
    <div className="hidden lg:block lg:pl-80 h-full">
      <Map />
    </div>
  );
};

export default Home;
