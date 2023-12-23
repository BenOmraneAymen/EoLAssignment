import edit from "../assets/edit.png";
import del from "../assets/delete.png";
import { deleteBottle } from "../service/bottleService";
import { useState } from "react";
import BottleModal from "./bottleModal";

export default function BottleCard({bottle}) {

  const [modal, setModal] = useState(false);

  async function handleDelete(){
    await deleteBottle(bottle.id).then((response) => {
      console.log(response);
      window.location.reload(false);
    })
  }

  function handleEdit(){
    setModal(true);
  } 

  return (
    <div className="w-64 h-80 border-gray-500 border-2 rounded-lg ">
      <div className="w-full flex flex-row justify-end gap-2 p-2" >
        <img src={edit} onClick={()=>handleEdit()} className="w-5 hover:cursor-pointer" alt="" />
        <img src={del} onClick={()=>handleDelete()} className="w-5 hover:cursor-pointer" alt="" />
      </div>
      <div className="w-full h-full flex flex-col items-center">
        <img
          src="https://tiimg.tistatic.com/fp/1/007/890/unbreakable-leak-proof-light-weight-recyclable-empty-plastic-bottle-621.jpg"
          alt="bottle"
          className="h-36 w-36"
        />
        <div>
        <span className="font-medium text-xl">{bottle.name}</span>
        </div>
        <span>
          <span className="font-medium">Capacity:</span> {bottle.capacity}L
        </span>
        <span>
          <span className="font-medium">Weight:</span> {bottle.weight}g
        </span>
        <span>
          <span className="font-medium">Cycles:</span> {bottle.cycles}
        </span>
      </div>
      <BottleModal modal={modal} setModal={setModal} type={bottle.type} modalType="edit" data={bottle} />
    </div>
  );
}
