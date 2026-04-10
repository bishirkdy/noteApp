import React from "react";
import ColorPicker from "./ColorPicker";

const EditNote = ({ data, setData, setNotes, onClose }) => {
  function handleChange(e) {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSave(e) {
    e.preventDefault();

    const fullData = JSON.parse(localStorage.getItem("data")) || [];
    if (!data.content.trim()) {
      alert("Content must contain at least one character");
      return;
    }

    if (data.title.trim().length > 100) {
      alert("Maximum allowed characters is 100");
      return;
    }
    const isDuplicate = fullData.some(
      (d) =>
        d.id !== data.id &&
        (d.title || "").trim().toLowerCase() ===
          data.title.trim().toLowerCase() &&
        (d.content || "").trim().toLowerCase() ===
          data.content.trim().toLowerCase(),
    );
    if (isDuplicate) {
      alert("Data already exists with same title and content");
      return;
    }
    const updatedData = fullData.map((d) =>
      d.id === data.id ? { ...d, ...data , updatedAt : Date.now() } : d,
    );
    localStorage.setItem("data", JSON.stringify(updatedData));
    setNotes(updatedData);
    onClose();
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="absolute inset-0 bg-black/80" onClick={onClose}></div>

      <form
        onSubmit={handleSave}
        className="relative bg-(--color-tertiary) w-[90%] max-w-md p-6 rounded-2xl shadow-xl"
      >
        <h2 className="text-xl font-bold mb-4 text-(--color-primary)">
          Edit Note
        </h2>

        <input
          type="text"
          name="title"
          value={data.title}
          onChange={handleChange}
          className="w-full mb-3 p-2 rounded-md border outline-none"
        />

        <textarea
          name="content"
          value={data.content}
          onChange={handleChange}
          rows="4"
          className="w-full mb-4 p-2 rounded-md border outline-none"
        />

        <input
          type="text"
          name="category"
          value={data.category}
          onChange={handleChange}
          className="w-full mb-3 p-2 rounded-md border outline-none"
        />

        <ColorPicker
          selectedColor={data.color}
          onChange={(color) =>
            setData((prev) => ({
              ...prev,
              color,
            }))
          }
        />

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-md bg-gray-300"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-4 py-2 rounded-md bg-(--color-secondary) text-white"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditNote;
