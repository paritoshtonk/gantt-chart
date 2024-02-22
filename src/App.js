import GanttChart from "./components/GanttChart";
import TopBar from "./components/TopBar";
import VerticalNav from "./components/VerticalNav";

var GanttChartInfo = {
  tasks: [
    {
      name: "Illustrations",
      assignedTo: 0,
      startDate: new Date(2023, 8, 11),
      endDate: new Date(2023, 8, 30),
    },
    {
      name: "Graphics",
      assignedTo: 1,
      startDate: new Date(2023, 8, 13),
      endDate: new Date(2023, 8, 20),
      subTasks: [
        {
          name: "Typeface",
          assignedTo: 1,
          startDate: new Date(2023, 8, 13),
          endDate: new Date(2023, 8, 14),
        },
        {
          name: "Grid templates",
          assignedTo: 0,
          startDate: new Date(2023, 8, 16),
          endDate: new Date(2023, 8, 18),
        },
      ],
    },
    {
      name: "Research",
      assignedTo: 2,
      startDate: new Date(2023, 8, 21),
      endDate: new Date(2023, 8, 30),
    },
    {
      name: "UI Kit",
      assignedTo: 2,
      startDate: new Date(2023, 9, 1),
      endDate: new Date(2023, 9, 5),
    },
    {
      name: "Presentation",
      assignedTo: 0,
      startDate: new Date(2023, 9, 6),
      endDate: new Date(2023, 9, 10),
    },
    {
      name: "Announcement",
      assignedTo: 1,
      startDate: new Date(2023, 9, 11),
      endDate: new Date(2023, 9, 15),
    },
    {
      name: "Migration",
      assignedTo: 2,
      startDate: new Date(2023, 9, 16),
      endDate: new Date(2023, 9, 20),
    },
    {
      name: "Deployment",
      assignedTo: 0,
      startDate: new Date(2023, 9, 21),
      endDate: new Date(2023, 9, 25),
    },
  ],
  people: [
    { id: 0, name: "Paritosh Tonk", icon: "P", color: "#B078FF" },
    { id: 1, name: "Kritika Srivastava", icon: "K", color: "#FF74C4" },
    { id: 1, name: "Yash Gandhi", icon: "Y", color: "#FFD132" },
  ],
};

function App() {
  return (
    <div>
      <VerticalNav />
      <div className="flex flex-col w-full  pl-16 h-screen ">
        <TopBar />
        <div id="mainContent" className="w-full h-full flex overflow-hidden">
          <GanttChart data={GanttChartInfo} />
        </div>
      </div>
    </div>
  );
}

export default App;
