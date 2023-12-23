import axios from "axios";
import { useEffect, useState } from "react";
import { getAllBottles } from "../service/bottleService";
import BottleCalcCard from "./bottleCalcCard";
import DisplayModal from "./displayModal";

export default function CalculateScreen() {

  const [modal, setModal] = useState(false);

  const [bottlesPET, setBottlesPET] = useState([]);
  const [bottleGLASS, setBottlesGLASS] = useState([]);
  const [bottles, setBottles] = useState([]);

  const [Results, setResults] = useState({
    NRG: 0,
    WC: 0,
    CO2: 0,
  });

  async function getBottles() {
    await getAllBottles("PET")
      .then((response) => {
        setBottlesPET(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    await getAllBottles("GLASS")
      .then((response) => {
        setBottlesGLASS(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    await getAllBottles("All")
      .then((response) => {
        response.data.forEach((bottle) => {
          bottle.number = 0;
        })
        setBottles(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function handleSubmit() {
    await axios
      .post("http://localhost:4000/processes/calc/", bottles)
      .then((res) => {
        console.log(res.data);
        setResults(res.data);
        setModal(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getBottles();
  }, []);

  return (
    <div className="px-6 py-4">
      <div className="text-3xl font-medium py-2">Choose Bottle</div>
      <div className="text-2xl font-medium">PET</div>
      <div className="flex flex-row flex-wrap gap-4">
        {bottlesPET.map((bottle) => {
          return (
            <BottleCalcCard
              bottle={bottle}
              bottleArray={bottles}
              setBottles={setBottles}
            />
          );
        })}
      </div>
      <div className="text-2xl font-medium">GLASS</div>
      <div className="flex flex-row flex-wrap gap-4">
        {bottleGLASS.map((bottle) => {
          return (
            <BottleCalcCard
              bottle={bottle}
              bottleArray={bottles}
              setBottles={setBottles}
            />
          );
        })}
      </div>
      <div className="w-full grid place-content-center" >
        <div
          className="my-4 mx-6 w-28 px-6 py-3 bg-green-600 text-white rounded-md hover:cursor-pointer hover:bg-green-700"
          onClick={() => handleSubmit()}
        >
          calculate
        </div>
      </div>
      <DisplayModal modal={modal} setModal={setModal} data={Results} />
    </div>
  );
}
