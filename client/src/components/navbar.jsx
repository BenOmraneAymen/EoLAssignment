import MyDropdown from "./dropdown";

export default function Navbar() {
  return (
    <div className="w-screen h-20 flex flex-row justify-between items-center z-50 px-8 md:px-20 lg:px-40 bg-green-800 bg-opacity-70 backdrop-blur-sm">
      <span className="text-xl font-medium  md:text-2xl hover:cursor-pointer">
        <a href="#Hero">CO2 Calculator</a>
      </span>
      <MyDropdown />
    </div>
  );
}
