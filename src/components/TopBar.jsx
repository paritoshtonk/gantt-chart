import { AiOutlineLeft } from "react-icons/ai";
const TopBar = () => {
  return (
    <div className="h-16 bg-slate-200  grid col-auto-fr-auto text-gray-600 ">
      <div className="p-2 pt-5">
        <div className="text-center ">
          <AiOutlineLeft className="inline-block mb-1" />
          <div className="inline-block pl-2">All Projects</div>
        </div>
      </div>
      <div className="p-2 pt-5 ">
        <div className="text-center ">Master Project</div>
      </div>
      <div className="p-2 ">
        <div className="text-center">
          <div className="bg-slate-600 w-12 h-12 rounded inline-block self-center">
            <div className="bg-white w-8 h-8 rounded-full p-2 m-2"> </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
