import React, { useEffect, useState } from "react";
import LeftHome from "./pages/LeftHome";
import RightHome from "./pages/RightHome";
import EditNote from "./components/EditNote";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [editTab, setEditTab] = useState(false);
  const [editingNote, setEditingNote] = useState(null);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("data")) || [];
    setNotes(storedData);
  }, []);

  function handleEditBtn(id) {
    const found = notes.find((d) => d.id === id);
    if (found) {
      setEditingNote(found);
      setEditTab(true);
    }
  }

  function closeEdit() {
    setEditTab(false);
    setEditingNote(null);
  }

  return (
    <div className="flex flex-col lg:flex-row w-screen lg:h-screen min-h-screen bg-(--color-tertiary)">
      {editTab && editingNote && (
        <EditNote
          data={editingNote}
          setData={setEditingNote}
          setNotes={setNotes}
          onClose={closeEdit}
        />
      )}

      <LeftHome setNotes={setNotes} />
      <RightHome onClick={handleEditBtn} data={notes} setNotes={setNotes} />
    </div>
  );
};

export default App;
