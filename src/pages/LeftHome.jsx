import Title from "../components/Title";
import AddNote from "../components/AddNote";

const LeftHome = ({setNotes}) => {
  return (
    <div className="w-full lg:w-1/2 flex flex-col items-center justify-start bg-white shadow-xl">
      <Title />
      <AddNote setNotes={setNotes} />
    </div>
  );
};

export default LeftHome;
