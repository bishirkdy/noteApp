import React, { useState } from "react";
import ColorPicker from "./ColorPicker";
const AddNote = ({ setNotes }) => {
  const [form, setForm] = useState({
    title: "",
    content: "",
    category: "",
    color: "#003049",
  });

  function onChangeHandler(e) {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  function submitHandler(e) {
    e.preventDefault();

    let data = JSON.parse(localStorage.getItem("data")) || [];
    if (!Array.isArray(data)) {
      data = [];
    }
    if (!form.content.trim()) {
      alert("Content must contain at least one character");
      return;
    }

    if (form.title.trim().length > 100) {
      alert("Maximum allowed characters is 100");
      return;
    }
    const isDuplicate = data.some(
      (d) =>
        d.title.trim().toLowerCase() === form.title.trim().toLowerCase() &&
        d.content.trim().toLowerCase() === form.content.trim().toLowerCase(),
    );

    if (isDuplicate) {
      alert("Data already exists with same title and content");
      return;
    }

    const newItem = {
      ...form,
      id: Date.now(),
    };

    data.push(newItem);
    localStorage.setItem("data", JSON.stringify(data));
    alert("Form updated successfully");
    setNotes(data);
    setForm({
      title: "",
      content: "",
      category: "",
      color: "#003049",
    });
  }
  return (
    <div className="flex flex-col items-center w-full px-6">
      <form
        onSubmit={submitHandler}
        className="w-full max-w-lg bg-white rounded-2xl shadow-2xl p-6 flex flex-col gap-5"
      >
        <h1 className="text-2xl font-bold text-(--color-secondary) text-center">
          Add Note
        </h1>

        <input
          value={form.title}
          type="text"
          placeholder="Title"
          name="title"
          onChange={onChangeHandler}
          className="border-2 border-gray-200 rounded-lg p-3 focus:outline-none focus:border-(--color-secondary) transition"
        />

        <textarea
          value={form.content}
          name="content"
          placeholder="Write your note..."
          onChange={onChangeHandler}
          required
          className="border-2 border-gray-200 rounded-lg p-3 h-32 focus:outline-none focus:border-(--color-secondary) transition"
        />

        <input
          value={form.category}
          type="text"
          name="category"
          placeholder="Category (Optional)"
          onChange={onChangeHandler}
          className="border-2 border-gray-200 rounded-lg p-3 focus:outline-none focus:border-(--color-secondary) transition"
        />

        <div className="flex items-center justify-between">
          <label className="text-sm text-(--color-forth)">Theme Color</label>
          <ColorPicker
            selectedColor={form.color}
            onChange={(color) =>
              setForm((prev) => ({
                ...prev,
                color,
              }))
            }
          />
        </div>

        <button className="cursor-pointer w-full bg-(--color-secondary) hover:bg-(--color-primary) text-white py-3 rounded-lg font-semibold transition duration-300">
          Save Note
        </button>
      </form>
    </div>
  );
};

export default AddNote;
