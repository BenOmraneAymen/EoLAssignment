import { useEffect, useState } from "react";
import { createBottle, updateBottle } from "../service/bottleService";

export default function BottleModal({
  modal,
  setModal,
  type,
  modalType,
  data,
}) {
  const display = modal ? "block" : "hidden";

  const cycles = type === "PET" ? 1 : 10;

  const [bottle, setBottle] = useState({
    name: "",
    capacity: "",
    weight: "",
    cycles: cycles,
    type: type,
  });

  function handleChange(e, name) {
    setBottle({
      ...bottle,
      [name]: e.target.value,
    });
  }

  function changeWeight(e) {
    setBottle({
      ...bottle,
      weight: parseInt(e.target.value),
    });
  }

  function changeCapacity(e) {
    setBottle({
      ...bottle,
      capacity: parseFloat(e.target.value),
    });
  }

  async function handleAdd() {
    if (bottle.name === "" || bottle.capacity === "" || bottle.weight === "") {
      alert("Please fill all the fields");
    } else {
      if (modalType === "edit") {
        await updateBottle(data.id, bottle)
          .then((res) => {
            console.log(res.data);
            setBottle({
              name: "",
              capacity: "",
              weight: "",
              cycles: cycles,
              type: type,
            });
            window.location.reload(false);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        await createBottle(bottle)
          .then((res) => {
            console.log(res.data);
            setBottle({
              name: "",
              capacity: "",
              weight: "",
              cycles: cycles,
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
    console.log(bottle);
  }, [bottle]);

  useEffect(() => {
    if (data) {
      setBottle(data);
    }
  }, []);

  return (
    <div
      className={
        display +
        " w-screen h-screen bg-black bg-opacity-50 fixed top-0 left-0 flex justify-center items-center"
      }
    >
      <div className="w-1/2 h-1/2 bg-white rounded-lg">
        <div className="w-full h-12 bg-gray-200 flex justify-between items-center px-4">
          <div className="text-lg font-bold">{modalType == "edit" ? "Edit Bottle" : "Add Bottle"}</div>
          <div
            className="text-lg font-bold hover:cursor-pointer"
            onClick={() => setModal(false)}
          >
            X
          </div>
        </div>
        <div className="w-full h-full flex flex-col items-center justify-center gap-4">
          <input
            className="w-2/3 h-10 my-2 px-2 rounded-lg border-2 border-gray-400 focus:outline-none focus:border-blue-500"
            type="text"
            placeholder="name"
            onChange={(e) => handleChange(e, "name")}
            value={bottle.name}
          />
          <input
            className="w-2/3 h-10 my-2 px-2 rounded-lg border-2 border-gray-400 focus:outline-none focus:border-blue-500"
            type="number"
            placeholder="capacity in litres"
            onChange={(e) => changeCapacity(e)}
            value={bottle.capacity}
          />
          <input
            className="w-2/3 h-10 my-2 px-2 rounded-lg border-2 border-gray-400 focus:outline-none focus:border-blue-500"
            type="number"
            placeholder="weight in grams  "
            onChange={(e) => changeWeight(e)}
            value={bottle.weight}
          />
          <div
            className="px-6 py-3 bg-green-600 text-white rounded-md hover:cursor-pointer hover:bg-green-700"
            onClick={handleAdd}
          >
            {modalType == "edit" ? "Edit" : "Add"}
          </div>
        </div>
      </div>
    </div>
  );
}
