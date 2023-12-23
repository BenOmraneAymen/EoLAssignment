export default function DisplayModal({ modal, setModal, data }) {
  const display = modal ? "block" : "hidden";

  return (
    <div
      className={
        display +
        " w-screen h-screen bg-black bg-opacity-50 fixed top-0 left-0 flex justify-center items-center"
      }
    >
      <div className="w-96 h-56 bg-white rounded-lg">
        <div className="w-full h-12 bg-gray-200 flex justify-between items-center px-4">
          <div className="text-lg font-bold">Results</div>
          <div
            className="text-lg font-bold hover:cursor-pointer"
            onClick={() => setModal(false)}
          >
            X
          </div>
        </div>
        <div className="h-40 flex flex-col items-center justify-around">
          <div className="flex flex-row items-center justify-between w-2/3 text-2xl font-medium">
            <span> Total NRG:</span> {data.NRG.toFixed(4)}
          </div>
          <div className="flex flex-row items-center justify-between w-2/3 text-2xl font-medium">
            <span> Total WC:</span> {data.WC.toFixed(4)}
          </div>
          <div className="flex flex-row items-center justify-between w-2/3 text-2xl font-medium">
            <span> Total CO2: </span>
            {data.CO2.toFixed(4)}
          </div>
        </div>
      </div>
    </div>
  );
}
