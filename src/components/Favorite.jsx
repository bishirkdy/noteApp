import { Delete, HeartMinus } from "lucide-react";
import React from "react";

const Favorite = ({ data, setNotes }) => {
  function removeFromFavorite(id) {
    const stored = JSON.parse(localStorage.getItem("data")) || [];

    const updated = stored.map((d) =>
      d.id === id ? { ...d, favorite: false } : d,
    );

    localStorage.setItem("data", JSON.stringify(updated));
    setNotes(updated);
  }
  return (
    <div className="flex-1 bg-white rounded-2xl p-5 overflow-y-auto shadow-inner">
      <h1 className="text-2xl font-bold mb-4 text-(--color-secondary)">
        Favorites
      </h1>

      {data.length > 0 ? (
        <div className="grid gap-4">
          {data.map((d, i) => (
            <div
              key={i}
              className="rounded-xl p-4 shadow-md border-l-4 bg-(--color-tertiary)"
              style={{ borderLeftColor: d.color }}
            >
              <div className="flex flex-row items-start justify-between w-full">
                <h2 className="text-lg font-semibold text-(--color-primary)">
                  {d.title}
                </h2>
                <div>
                  <HeartMinus
                    className="bg-white p-1 rounded-md text-red-500 cursor-pointer hover:scale-105"
                    onClick={() => removeFromFavorite(d.id)}
                  />
                </div>
              </div>
              <p className="text-sm text-(--color-forth)">{d.content}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-(--color-forth) mt-10">
          No favorites yet
        </p>
      )}
    </div>
  );
};

export default Favorite;
