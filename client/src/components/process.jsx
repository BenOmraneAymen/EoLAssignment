import { useEffect, useState } from "react";
import { useStore } from "zustand";
import { getAllProcesses } from "../service/processService";
import { useFlowStore } from "../store/store";
import ProcessCard from "./processCard";
import ProcessModal from "./processModal";

export default function ProcessScreen({ title }) {
  const [modal, setModal] = useState(false);
  const [processes, setProcesses] = useState([]);

  const setElements = useFlowStore((state) => state.setElements);
 
  async function getProcesses() {
    await getAllProcesses(title)
      .then((res) => {
        setProcesses(res.data);
        setElements(
          res.data.map((process) => {
            return {
              id: process._id,
              data: { label: process.name },
              position: { x: process.position, y: process.position },
            };
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getProcesses();
    console.log(useFlowStore.getState().elements);
  }, []);

  return (
    <div className="w-full px-8 mt-10 ">
      <div className=" flex justify-between items-center my-4">
        <h1 className="font-normal text-3xl">{title}</h1>
        <div
          className="px-6 py-3 bg-green-600 text-white rounded-md hover:cursor-pointer hover:bg-green-700"
          onClick={() => {
            setModal(true);
            console.log(modal);
          }}
        >
          Add
        </div>
      </div>
      <div className="flex gap-4 flex-wrap">
        {processes.map((process) => {
          return <ProcessCard process={process} />;
        })}
      </div>
      <ProcessModal modal={modal} setModal={setModal} type={title} />
    </div>
  );
}
