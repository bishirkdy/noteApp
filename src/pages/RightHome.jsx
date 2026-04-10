import React, { useEffect, useState } from "react";
import ViewNote from "../components/ViewNote";
import Favorite from "../components/Favorite";

const RightHome = ({ onClick, data, setNotes }) => {
  let filtered = data.length ? data.filter((d) => d.favorite) : "";
  return (
    <div className="w-full lg:w-1/2 flex flex-col lg:flex-row gap-4 p-4 overflow-hidden">
      <ViewNote data={data} onClick={onClick} setNotes={setNotes} />
      <Favorite data={filtered} setNotes={setNotes} />
    </div>
  );
};

export default RightHome;
