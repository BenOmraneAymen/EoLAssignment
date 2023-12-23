import { useParams } from "react-router";
import BottleScreen from "../components/bottle";
import BottleModal from "../components/bottleModal";
import Navbar from "../components/navbar";
import ProcessScreen from "../components/process";
import Sidebar from "../components/sidebar";

export default function DashboardScreen({ children}) {
  return (
    <div className="w-screen h-screen overflow-hidden">
      <Navbar />
      <div className="h-full flex flex-row">
        <Sidebar />
        <div className="w-full overflow-scroll">
            {children}
        </div>
      </div>
    </div>
  );
}
