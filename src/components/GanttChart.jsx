import { AiOutlineLeft, AiOutlineRight, AiOutlineStar } from "react-icons/ai";
import { HiBars3BottomRight } from "react-icons/hi2";
import { BsPerson, BsArrowReturnRight } from "react-icons/bs";
import { IoIosTimer } from "react-icons/io";
import { TbFilter, TbLayoutKanban } from "react-icons/tb";
import { CgAddR, CgRemoveR } from "react-icons/cg";
import React from "react";

const monthMap = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const dayMap = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function datediff(first, second) {
  return Math.floor((second - first) / (1000 * 60 * 60 * 24));
}

function processGantChartData(data) {
  var newData = {};
  var leastDate = null;
  var maxDate = null;
  newData.people = [...data.people];
  newData.tasks = [];

  for (var entry of data.tasks) {
    newData.tasks.push(entry);
    entry.showChild = true;
    if (entry.subTasks !== undefined) {
      entry.subTasks.forEach((subtask) => {
        subtask.isSubTask = true;
      });
      newData.tasks.push(...entry.subTasks);
    }
  }
  for (var task of newData.tasks) {
    if (leastDate == null || leastDate.getTime() > entry.startDate.getTime()) {
      leastDate = new Date(task.startDate.getTime());
    }
    if (maxDate == null || maxDate.getTime() < entry.endDate.getTime()) {
      maxDate = new Date(task.endDate.getTime());
    }
  }
  var minMaxDiff = datediff(leastDate, maxDate);
  if (minMaxDiff < 30) {
    leastDate.setDate(leastDate.getDate() - (30 - minMaxDiff) / 2);
    maxDate.setDate(maxDate.getDate() + (30 - minMaxDiff) / 2);
  }
  leastDate.setDate(leastDate.getDate() - 3);
  newData.leastDate = new Date(leastDate.getTime());
  maxDate.setDate(maxDate.getDate() + 3);
  newData.maxDate = new Date(maxDate.getTime());
  return newData;
}

const GanttChart = (props) => {
  var data = processGantChartData(props.data);
  var [ganttState, setGanttState] = React.useState(data);

  React.useEffect(() => {
    var data = processGantChartData(props.data);
    setGanttState(data);
  }, [props.data]);
  return (
    <div className="bg-white grid row-auto-fr grow ">
      <GanttChartTopbar people={data.people} tasks={data.tasks} />
      <div className="w-full grid col-auto-fr overflow-hidden">
        <GanttChartSideBar data={ganttState} />
        <GanttChartRaw data={ganttState} />
      </div>
    </div>
  );
};

const GanttChartTopbar = ({ people, tasks }) => {
  return (
    <div className="min-h-16 bg-slate-50 flex flex-col sm:grid col-auto-fr-auto text-gray-600 ">
      <div className="p-2 pt-5">
        <div className="text-center ">
          <AiOutlineStar className="inline-block " size={24} />
          <div className="inline-block ml-2 px-2 py-1 rounded bg-slate-200 text-sm">
            <BsPerson className="inline-block mr-1" size={16} />
            <div className="inline-block">{people.length} people</div>
          </div>
          <div className="inline-block ml-2 px-2 py-1 rounded bg-amber-200 text-sm text text-amber-600">
            <IoIosTimer className="inline-block mr-1 mb-1" size={16} />
            <div className="inline-block">
              {tasks.filter((task) => task.isSubTask === undefined).length}{" "}
              tasks left
            </div>
          </div>
        </div>
      </div>
      <div className="p-2 pt-5 ">
        <div className="text-center ">2023</div>
      </div>
      <div className="p-2 ">
        <div className="text-center">
          <div className="bg-gray-100 w-10 h-10 mt-1 rounded-md inline-block self-center content-center border-gray-200 border-solid border  hover:bg-gray-300 hover:norder-gray-400">
            <TbFilter
              className="text-gray-500 text-center w-full mt-2"
              size={22}
            />
          </div>
          <div className="bg-gray-100 w-10 ml-2 h-10 mt-1 rounded-l-md inline-block self-center content-center border-gray-200 border-solid border hover:bg-gray-300 hover:norder-gray-400">
            <TbLayoutKanban
              className="text-gray-500 text-center w-full mt-2"
              size={22}
            />
          </div>
          <div className="bg-gray-100 w-10 h-10 mt-1 rounded-r-md inline-block self-center content-center border-gray-200 border-solid border  hover:bg-gray-300 hover:norder-gray-400">
            <HiBars3BottomRight
              className="text-gray-500 text-center w-full mt-2"
              size={22}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
const GanttChartSideBar = ({ data }) => {
  return (
    <div className="h-full  sm:w-[300px] w-[150px] grid row-auto-fr overflow-hidden">
      <div className="text-center p-3 h-16">
        <div className="rounded border border-gray-200 bg-gray-100  inline-block ">
          <div className="rounded p-1 text-center w-28 cursor-pointer sm:inline-block border border-gray-200  bg-gray-200">
            Tasks
          </div>
          <div className="rounded p-1 text-center w-28 cursor-pointer sm:inline-block">
            People
          </div>
        </div>
      </div>
      <div className="text-gray-500 overflow-auto">
        {data.tasks.map((task) => {
          return (
            <div
              className="h-16 p-5 hover:bg-slate-100 cursor-pointer"
              key={task.name}
            >
              {task.isSubTask !== undefined && task.isSubTask ? (
                <BsArrowReturnRight
                  className="inline-block mb-1 mr-3 "
                  size={14}
                />
              ) : task.subTasks === undefined || !task.showChild ? (
                <CgAddR className="inline-block mb-1 mr-3 " size={20} />
              ) : (
                <CgRemoveR className="inline-block mb-1 mr-3 " size={20} />
              )}
              <div className="inline-block">{task.name}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const GanttChartRaw = ({ data }) => {
  const days = datediff(data.leastDate, data.maxDate);
  return (
    <div className="h-full w-full overflow-hidden relative">
      <div className="h-full w-full grid row-auto-fr overflow-x-auto no-scrollbar">
        <div className=" h-16 whitespace-nowrap ">
          {Array.from({ length: days }, (_, index) => index).map((item) => {
            var startDate = new Date(data.leastDate.getTime());
            var date = new Date(startDate.setDate(startDate.getDate() + item));
            return (
              <div
                className={
                  "z-1 h-16 w-10 inline-block text-center py-1 " +
                  (datediff(date, new Date()) === 0
                    ? "bg-blue-200 rounded-t-xl"
                    : "text-gray-400 bg-white hover:bg-slate-200")
                }
                key={item}
              >
                <div className="text-xs">{monthMap[date.getMonth()]}</div>
                <div className="text-black">{date.getDate()}</div>
                <div className="text-xs">{dayMap[date.getDay()]}</div>
              </div>
            );
          })}
        </div>
        <div className=" overflow-auto overflow-y-scroll no-scrollbar">
          <div className=" overflow-x-hidden ">
            {Array.from({ length: data.tasks.length }, (_, index) => index).map(
              (item) => {
                return (
                  <GanttChartItem
                    data={data}
                    index={item}
                    key={data.tasks[item].name}
                  />
                );
              }
            )}
          </div>
        </div>
      </div>
      <AiOutlineLeft className="absolute left-0 top-0 z-2 bg-slate-100 border-x border-gray-200 h-16 w-10 py-6 hover:bg-slate-200" />
      <AiOutlineRight className="absolute right-0 top-0 z-2 bg-slate-100 border-x border-gray-100 h-16 w-10 py-6 hover:bg-slate-200" />
    </div>
  );
};

const GanttChartItem = ({ data, index }) => {
  const { startDate, endDate, assignedTo, name } = data.tasks[index];
  const { leastDate, maxDate } = data;
  const paddingLeft = datediff(leastDate, startDate);
  const width = datediff(startDate, endDate) + 1;
  const totalWidth = datediff(leastDate, maxDate) + 1;
  return (
    <div
      className="h-16 bg-gray-50  border-gray-100 overflow-hidden relative"
      style={{ width: 40 * totalWidth }}
    >
      <div className="absolute">
        {Array.from({ length: totalWidth }, (_, index) => index).map((item) => {
          var startDate = new Date(data.leastDate.getTime());
          var date = new Date(startDate.setDate(startDate.getDate() + item));
          return (
            <div
              className={
                "h-16 border-x border-dashed inline-block " +
                (datediff(date, new Date()) === 0
                  ? date.getDay() !== 0 && date.getDay() !== 6
                    ? "bg-blue-100"
                    : "stripped-background-today"
                  : date.getDay() !== 0 && date.getDay() !== 6
                  ? ""
                  : "stripped-background")
              }
              key={item}
              style={{
                width: 40,
              }}
            ></div>
          );
        })}
      </div>
      <div
        className="h-12 my-2 rounded-full z-10 absolute cursor-pointer"
        style={{
          backgroundColor: data.people[assignedTo].color,
          width: 40 * width,
          marginLeft: 40 * paddingLeft,
        }}
      >
        <div className={"h-12 px-4 pt-3 truncate text-[#11111199]"}>{name}</div>
      </div>
    </div>
  );
};
export default GanttChart;
