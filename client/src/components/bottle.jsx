import { useEffect, useLayoutEffect, useState } from "react";
import { getAllBottles } from "../service/bottleService";
import { useProcessStore } from "../store/useProcessStore";
import BottleCard from "./bottleCard";
import BottleModal from "./bottleModal";

export default function BottleScreen({ title }) {
  const [Bottles, setBottles] = useState([]);
  const [modal, setModal] = useState(false);

  function getBottles() {
    getAllBottles(title)
      .then((res) => {
        console.log(res.data);
        setBottles(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAdd() {
    setModal(true);
  }

  useEffect(() => {
    getBottles();
    console.log(Bottles)
  }, [])

  return (
    <div className="w-full px-8 mt-10 ">
      <div className="w-full flex justify-between items-center my-4">
        <h1 className="font-normal text-3xl">{title}</h1>
        <div className="px-6 py-3 bg-green-600 text-white rounded-md hover:cursor-pointer hover:bg-green-700 " onClick={handleAdd} >
          Add
        </div>
      </div>
      <div className="flex gap-4 flex-wrap">
        {Bottles.map((bottle) => {
          return <BottleCard bottle={bottle} />;
        })}
      </div>
      <BottleModal modal={modal} setModal={setModal} type={title} />
    </div>
  );
}
