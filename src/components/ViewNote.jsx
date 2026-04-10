import {
  CopyX,
  FilePenLine,
  HeartMinus,
  HeartPlus,
  Pin,
  PinOff,
} from "lucide-react";
import React, { useState } from "react";

const ViewNote = ({ data, onClick, setNotes }) => {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [selected, setSelected] = useState([]);
  function handleDelete(id) {
    let data = JSON.parse(localStorage.getItem("data")) || [];

    const updated = data.filter((d) => d.id !== id);

    localStorage.setItem("data", JSON.stringify(updated));
    setNotes(updated);
  }
  function addToFavorite(id) {
    let data = JSON.parse(localStorage.getItem("data")) || [];

    data = data.map((item) => {
      if (item.id === id) {
        return { ...item, favorite: true };
      }
      return item;
    });

    localStorage.setItem("data", JSON.stringify(data));
    setNotes(data);
  }
  function togglePin(id) {
    let data = JSON.parse(localStorage.getItem("data")) || [];

    data = data.map((item) =>
      item.id === id ? { ...item, pinned: !item.pinned } : item,
    );

    localStorage.setItem("data", JSON.stringify(data));
    setNotes(data);
  }
  function toggleSelect(id) {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  }
  function deleteSelected() {
    let data = JSON.parse(localStorage.getItem("data")) || [];

    const updated = data.filter((item) => !selected.includes(item.id));

    localStorage.setItem("data", JSON.stringify(updated));
    setNotes(updated);
    setSelected([]);
  }

  const filteredData = data.filter(
    (d) =>
      d.title.toLowerCase().includes(search.toLowerCase()) ||
      d.category.toLowerCase().includes(search.toLowerCase()) ||
      d.content.toLowerCase().includes(search.toLowerCase()),
  );
  const sortedData = [...filteredData].sort((a, b) => {
    if (b.pinned !== a.pinned) return b.pinned - a.pinned;
    if (sortBy === "title") return a.title.localeCompare(b.title);
    if (sortBy === "color") return a.color > b.color ? 1 : -1;
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  return (
    <div className="flex-1 bg-(--color-tertiary) rounded-2xl p-5 overflow-y-auto shadow-inner scrollbar-hide">
      <h1 className="text-2xl font-bold mb-4 text-(--color-primary)">
        Memories
      </h1>

      <div className="flex flex-row items-center justify-between gap-2">
        <input
          type="text"
          placeholder="Search notes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-4 p-2 border rounded w-full"
        />
        <select
          className="p-2 mb-4 border"
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="date">Date</option>
          <option value="title">Title</option>
          <option value="color">Color</option>
        </select>
      </div>
      {selected.length > 0 && (
        <button
          className="w-full bg-(--color-secondary) p-2 rounded-lg text-white hover:bg-(--color-primary) cursor-pointer mb-4"
          onClick={deleteSelected}
        >
          Delete Selected ({selected.length})
        </button>
      )}

      {sortedData.length > 0 ? (
        <div className="grid gap-4">
          {sortedData.map((d, i) => (
            <div
              key={i}
              className="rounded-xl p-4 shadow-md flex flex-col gap-2 transition hover:scale-[1.02]"
              style={{ backgroundColor: d.color }}
            >
              <div className="flex flex-row items-start justify-between w-full">
                <h2 className="text-lg font-semibold text-white">
                  {d.title.split(0, 20)}
                </h2>
                <div className="flex flex-row items-center gap-2 bg-white p-1 rounded-lg">
                  <HeartPlus
                    className={`w-4 hover:w-5 cursor-pointer ${d.favorite ? "text-(--color-secondary)" : ""}`}
                    onClick={() => addToFavorite(d.id)}
                  />
                  <FilePenLine
                    onClick={() => onClick(d.id)}
                    className="w-4 hover:scale-105 cursor-pointer"
                  />
                  <CopyX
                    className="text-red-500 w-4 hover:scale-105 cursor-pointer"
                    onClick={() => handleDelete(d.id)}
                  />
                  <button onClick={() => togglePin(d.id)}>
                    {d.pinned ? (
                      <PinOff className=" w-4 hover:scale-105 cursor-pointer" />
                    ) : (
                      <Pin className=" w-4 hover:scale-105 cursor-pointer" />
                    )}
                  </button>
                  <input
                    type="checkbox"
                    checked={selected.includes(d.id)}
                    onChange={() => toggleSelect(d.id)}
                  />
                </div>
              </div>
              <p className="text-sm text-white opacity-90">{d.content}</p>

              {d.category && (
                <span className="text-xs bg-white text-black px-2 py-1 rounded w-fit">
                  {d.category}
                </span>
              )}
              <div className="flex items-center justify-end gap-2 w-full p-1 rounded-lg text-[10px]">
                <p className="bg-white p-1 rounded-lg">
                  Created :{" "}
                  {new Date(d.id).toLocaleString("en-IN", {
                    dateStyle: "short",
                    timeStyle: "short",
                  })}
                </p>{" "}
                {d.updatedAt && (
                  <p className="bg-white p-1 rounded-lg">
                    Edited :{" "}
                    {new Date(d.updatedAt).toLocaleString("en-IN", {
                      dateStyle: "short",
                      timeStyle: "short",
                    })}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-(--color-forth) mt-10">
          No notes available
        </p>
      )}
    </div>
  );
};

export default ViewNote;
