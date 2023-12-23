import axios from "axios";
import { useEffect, useState } from "react";

export default function BottleCalcCard({ bottle, bottleArray, setBottles }) {
  const [number, setNumber] = useState(0);

  function searchBottle(n) {
    const updatedBottles = bottleArray.map((b) => {
      if (b.id === bottle.id) {
        b.number = n;
      }
      return b;
    });
    setBottles(updatedBottles);
  }

  function handlelower() {
    if (number > 0) {
      setNumber(number - 1);
      searchBottle(number - 1);
    } else {
      setNumber(0);
      alert("Number of bottle can't be lower than 0");
    }
  }

  function handleAdd() {
    setNumber(number + 1);
    searchBottle(number + 1);
  }

  useEffect(() => {
    console.log("updatedbottels", bottleArray);
  }, [bottleArray]);

  return (
    <div className="w-64 h-64 border-gray-500 border-2 rounded-lg ">
      <div className="w-full h-full flex flex-col justify-center items-center">
        <img
          src="https://tiimg.tistatic.com/fp/1/007/890/unbreakable-leak-proof-light-weight-recyclable-empty-plastic-bottle-621.jpg"
          alt="bottle"
          className="w-1/2 h-1/2"
        />
        <span className="font-medium text-xl">{bottle.name}</span>
        <span>
          <span className="font-medium">Cycles:</span> {bottle.cycles}
        </span>
        <div className="flex flex-row items-center gap-2">
          <button
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:cursor-pointer hover:bg-green-700 "
            onClick={() => handlelower()}
          >
            -
          </button>
          <div className="text-lg" >{number}</div>
          <button
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:cursor-pointer hover:bg-green-700 "
            onClick={() => handleAdd()}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}
