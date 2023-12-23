import { useEffect, useState } from "react";
import { createProcess, updateProcess } from "../service/processService";

export default function ProcessModal({
  modal,
  setModal,
  type,
  modalType,
  data,
}) {
  const display = modal ? "block" : "hidden";

  const [process, setProcesses] = useState({
    name: "",
    position: "",
    NRG: "",
    WC: "",
    CO2: "",
    BottleType: type,
  });

  function changeName(e) {
    setProcesses({
      ...process,
      name: e.target.value,
    });
  }

  function changeNRG(e) {
    setProcesses({
      ...process,
      NRG: parseFloat(e.target.value),
    });
  }

  function changeWC(e) {
    setProcesses({
      ...process,
      WC: parseFloat(e.target.value),
    });
  }

  function changeCO2(e) {
    setProcesses({
      ...process,
      CO2: parseFloat(e.target.value),
    });
  }

  function changePosition(e) {
    setProcesses({
      ...process,
      position: parseInt(e.target.value),
    });
  }

  async function handleAdd() {
    if (process.name === "" || process.NRG === "" || process.WC === "") {
      alert("Please fill all the fields");
    } else {
      if (modalType === "edit") {
        await updateProcess(data.id, process)
          .then((res) => {
            console.log(res.data);
            setModal(false);
            setProcesses({
              name: "",
              position: "",
              NRG: "",
              WC: "",
              CO2: "",
              type: type,
            });
            window.location.reload(false);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        await createProcess(process)
          .then((res) => {
            console.log(res.data);
            setModal(false);
            setProcesses({
              name: "",
              NRG: "",
              WC: "",
              CO2: "",
              type: type,
            });
            window.location.reload(false);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  }

  useEffect(() => {
    if (modalType === "edit") {
      setProcesses(data);
    }
  },[]);

  return (
    <div
      className={
        display +
        " w-screen h-screen bg-black bg-opacity-50 fixed top-0 left-0 flex justify-center items-center"
      }
    >
      <div className="w-1/2 h-2/3 bg-white rounded-lg">
        <div className="w-full h-12 bg-gray-200 flex justify-between items-center px-4">
          <div className="text-lg font-bold">
            {modalType === "edit" ? "Edit Process" : "Add Process"}
          </div>
          <div
            className="text-lg font-bold hover:cursor-pointer"
            onClick={() => setModal(false)}
          >
            X
          </div>
        </div>
        <div className="w-full h-full flex flex-col items-center justify-center gap-3">
          <input
            className="w-2/3 h-10 my-2 px-2 rounded-lg border-2 border-gray-400 focus:outline-none focus:border-blue-500"
            type="text"
            placeholder="Name"
            onChange={(e) => changeName(e)}
            value={process.name}
          />
          <input
            className="w-2/3 h-10 my-2 px-2 rounded-lg border-2 border-gray-400 focus:outline-none focus:border-blue-500"
            type="number"
            placeholder="Position in the process flow "
            onChange={(e) => changePosition(e)}
            value={process.position}
          />
          <input
            className="w-2/3 h-10 my-2 px-2 rounded-lg border-2 border-gray-400 focus:outline-none focus:border-blue-500"
            type="number"
            placeholder="Energy consumption in killo watts per tonne"
            onChange={(e) => changeNRG(e)}
            value={process.NRG}
          />
          <input
            className="w-2/3 h-10 my-2 px-2 rounded-lg border-2 border-gray-400 focus:outline-none focus:border-blue-500"
            type="number"
            placeholder="Water consumption in liters per tonne"
            onChange={(e) => changeWC(e)}
            value={process.WC}
          />
          <input
            className="w-2/3 h-10 my-2 px-2 rounded-lg border-2 border-gray-400 focus:outline-none focus:border-blue-500"
            type="number"
            placeholder="CO2 equivalent in gCO2-eq per Km"
            onChange={(e) => changeCO2(e)}
            value={process.CO2}
          />
          <div
            className="px-6 py-3 bg-green-600 text-white rounded-md hover:cursor-pointer hover:bg-green-700"
            onClick={handleAdd}
          >
            {modalType === "edit" ? "Edit" : "Add"}
          </div>
        </div>
      </div>
    </div>
  );
}
