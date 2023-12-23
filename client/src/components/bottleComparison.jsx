import { useEffect, useState } from "react";
import { getAllBottles } from "../service/bottleService";
import BottleCard from "./bottleCard";
import BottleModal from "./bottleModal";

export default function BottleComparison() {
  const [Bottles, setBottles] = useState([]);
  const [modal, setModal] = useState(false);
  const [capacities, setCapacities] = useState([]);

  function getBottles() {
    getAllBottles("All")
      .then((res) => {
        console.log(res.data);
        setBottles(res.data);

        setCapacities(
          removeDuplicates(
            res.data.map((bottle) => {
              return bottle.capacity;
            })
          )
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function removeDuplicates(array) {
    return array.filter((a, b) => array.indexOf(a) === b);
  }

  function handleAdd() {
    setModal(true);
  }

  useEffect(() => {
    getBottles();
  }, []);

  useEffect(() => {
    console.log(capacities);
  }, [capacities]);

  return (
    <div className="w-full px-8 mt-10 ">
      <div className="flex gap-4 flex-wrap">
        {capacities.map((capacity) => {
          return (
            <div className="w-1/2">
              <div className="w-full flex justify-between items-center my-4">
                <h1 className="font-normal text-3xl">{capacity} L</h1>
              </div>
              <div className="flex gap-4 flex-wrap">
                {Bottles.map((bottle) => {
                  if (bottle.capacity === capacity) {
                    return <BottleCard bottle={bottle} view={"advanced"} />;
                  }
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
