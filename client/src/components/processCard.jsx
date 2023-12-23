import edit from "../assets/edit.png";
import del from "../assets/delete.png";
import { deleteProcess } from "../service/processService";
import { useState } from "react";
import ProcessModal from "./processModal";

export default function ProcessCard({ process }) {
  const [modal, setModal] = useState(false);

  async function handleDelete() {
    await deleteProcess(process.id)
      .then((response) => {
        console.log(response);
        window.location.reload(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleEdit() {
    setModal(true);
  }

  return (
    <div className="w-64 h-56 border-gray-500 border-2 rounded-lg ">
      <div className="w-full flex flex-row justify-end gap-2 p-2">
        <img
          src={edit}
          onClick={() => handleEdit()}
          className="w-5 hover:cursor-pointer"
          alt=""
        />
        <img
          src={del}
          onClick={() => handleDelete()}
          className="w-5 hover:cursor-pointer"
          alt=""
        />
      </div>
      <div className="w-full h-full flex flex-col items-center py-1">
        <span className="font-medium text-xl mb-3 ">{process.name}</span>
        <div className="flex flex-col gap-3">
        <span>
            <span className="font-medium">Position: </span> {process.position}
          </span>
          <span>
            <span className="font-medium">WC: </span> {process.WC}
          </span>
          <span>
            <span className="font-medium">NRG: </span> {process.NRG}
          </span>
          <span>
            <span className="font-medium">CO2: </span>
            {process.CO2}
          </span>
        </div>
      </div>
      <ProcessModal
        modal={modal}
        setModal={setModal}
        modalType="edit"
        data={process}
      />
    </div>
  );
}
