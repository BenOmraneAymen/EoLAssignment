import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="h-full w-64 bg-green-800 backdrop-blur-sm">
      <div className="w-full h-full flex flex-col gap-4 ">
        <Link
          to={"/dashboard/process"}
          className="text-base lg:text-lg font-normal text-slate-300 hover:cursor-pointer px-6 py-3 hover:bg-green-950 "
        >
          Process
        </Link>
        <Link
          to={"/dashboard/bottle"}
          className="text-base lg:text-lg font-normal text-slate-300 hover:cursor-pointer px-6 py-3 hover:bg-green-950 "
        >
          Bottles
        </Link>
        <Link
          to={"/dashboard/calculator"}
          className="text-base lg:text-lg font-normal text-slate-300 hover:cursor-pointer px-6 py-3 hover:bg-green-950 "
        >
          Calculator
        </Link>
        {/* <Link
          to={"/dashboard/ProcessFlow"}
          className="text-base lg:text-lg font-normal text-slate-300 hover:cursor-pointer px-6 py-3 hover:bg-green-950 "
        >
          Process Flow
        </Link> */}
        <Link
          to={"/dashboard/compare"}
          className="text-base lg:text-lg font-normal text-slate-300 hover:cursor-pointer px-6 py-3 hover:bg-green-950 "
        >
          Bottle Comparaison
        </Link>
      </div>
    </div>
  );
}
