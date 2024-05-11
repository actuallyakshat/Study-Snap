import React from "react";

export default function ProfileCard({ title, icon, value }) {
  return (
    <div className="h-fit rounded-xl bg-gray-700/20 px-6 py-3">
      <h2 className="flex items-center justify-center gap-2 text-xl font-bold text-gray-300">
        {title} {icon}
      </h2>
      <p className="my-2 text-center text-4xl font-black">{value}</p>
    </div>
  );
}
