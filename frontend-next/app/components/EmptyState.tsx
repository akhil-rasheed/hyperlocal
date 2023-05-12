import React from "react";

export default function EmptyState() {
  return (
    <div className="px-4 py-10 sm:px-6 lg:px-8 h-full flex justify-center items-center bg-gray-100">
      <div className="text-center items-center flex flex-col">
        <h3>Nothing to show here</h3>
      </div>
    </div>
  );
}
