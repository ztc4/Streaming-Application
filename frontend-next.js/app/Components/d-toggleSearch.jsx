import Image from "next/image";

function toggleSearch({ searchActive, handleActive }) {
  return (
    <header
    className="stickyborder-b-2 border-opacity-10 border-b-black
    grid items-center justify-center grid-cols-5 sm2:grid-cols-6 gap-2 p-2 sm:p-4"
  >
    <p className="hidden sm:block"></p>
    <input
      placeholder="Search..."
      type="text"
      className={`order-2 col-span-3 sm2:col-span-3 sm:block text-black h-10 opacity-90 
      focus:opacity-100  placeholder:text-clip outline-none pl-4 sm:px-12  drop-shadow-md rounded-full ${
        searchActive ? "" : "hidden"
      }`}
    />
    <toggleSearch
      searchActive={searchActive}
      handleActive={handleActive}
    />
     {!searchActive ? (
  <>
    <button className="col-span-1  sm:hidden flex justify-center items-center   order-1">
      <Image
        height={20}
        width={20}
        className="size-10"
        alt="logo"
        src="/icons/Logo.svg"
      />
    </button>
    <button
      aria-label="Click to start searching"
      onClick={handleActive}
      className="col-span-3  sm:hidden flex justify-end pr-3   order-2"
    >
      <Image
        height={20}
        width={20}
        className="size-8 my-1"
        alt=""
        src="/icons/dashboard/Search.svg"
      />
    </button>
  </>
) : (
  <button
    onClick={handleActive}
    className="bg-[#F4F4F4] order-1  sm:hidden rounded-full p-2 flex items-center justify-center"
  >
    <Image
      height={20}
      width={20}
      className="size-5"
      alt="close the search arrow"
      src="/icons/dashboard/arrow-search.svg"
    />
  </button>
)}
    <div className={`order-3 col-span-1 p-3 ${searchActive ? "block" : "hidden sm:block"}`}>
      <Image
        width={20}
        height={20}
        src="/icons/dashboard/Filter.svg"
        className={`size-10 border-1 rounded-md hover:bg-gray-300 duration-500 cursor-pointer p-1  sm:block`}
        alt="Button to Expand NavBar"
      />
    </div>
  </header>
  );
}
export default toggleSearch;
