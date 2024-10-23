"use client";

import { useState } from "react";
import Image from "next/image";
import Card from "@/app/Components/card";
import useApi from "@/app/API/useApi";

function Dashboard() {
    const [navIsToggled, setNav] = useState(false)
    const [searchActive, setActive] = useState(false);
    const [toggle, setToggle] = useState(true);
    // 
    
    // Filter Menu
    const [isFilterOpen, toggleFilter] = useState(false)
    const [search,setSearch] = useState("")
    const [selectedSortBy, setSelectedSortBy] = useState("none");
    const [selectedOrder, setSelectedOrder] =  useState("none")
    const [selectedCategory, setSelectedCategory] =  useState("all")

    const handleActive = () => {
      setActive((current) => !current);
    };
    function toggleNav() {
      setToggle((current) => !current);
    }
    function handleClickFilter(){
        toggleFilter( current => !current)
    }
    function handleChangeSearch(e){
        setSearch( current => e.target.value)
    }

    const constructUrl = () => {
        let url = "http://localhost:8080/api/v1/search/videos?";
        
        if (search) {
            url += `title=${search}&`;
        }
        if (selectedCategory && selectedCategory !== "all") { // ["all", "programming", "gaming","information"]
            let categoryNumber;

            switch (selectedCategory) {
                case "programming":
                    categoryNumber = 1;
                    break;
                case "gaming":
                    categoryNumber = 2;
                    break;
                case "information":
                    categoryNumber = 3;
                    break;
                default:
                    categoryNumber = null; // This can also just be omitted
            }
        
            if (categoryNumber !== null) {
                url += `category=${categoryNumber}&`;
            }
        }
        if (selectedSortBy && selectedSortBy !== "none") {
            url += `sortBy=${selectedSortBy}&`;
        }
        if (selectedOrder && selectedOrder !== "none") {
            url += `order=${selectedOrder}&`;
        }

        return url.slice(0, -1); // Remove the trailing '&'
    };
    const { data, loading, error } = useApi(constructUrl());
    console.log(2, data)

    
    
    return ( 
        <>    
            <main className=" w-screen min-h-screen  bg-[#F8F8F8]  "> 
                <div className="sticky border-b-2 border-opacity-10  border-b-black grid items-center justify-center grid-cols-5 sm2:grid-cols-6 gap-2 p-2 sm:p-4">
                    <p className="hidden sm:block"></p>
                    <input placeholder="Search..." type="text" value={search} onChange={handleChangeSearch}
                        className={`order-2 col-span-3 sm2:col-span-3 sm:block text-black h-10 opacity-90 focus:opacity-100  placeholder:text-clip outline-none pl-4 sm:px-12  drop-shadow-md rounded-full ${searchActive ? "" : "hidden"}`}
                    />
                    <button onClick={ handleClickFilter} aria-label="Open up Filter Menu" className={`order-3 col-span-1 p-3 ${searchActive ? "block" : "hidden sm:block"}`}>
                        <Image width={20} height={20} src="/icons/dashboard/Filter.svg"
                            className={`size-10 border-1 rounded-md hover:bg-gray-300 duration-500 cursor-pointer p-1  sm:block`}
                            alt="Filter"
                        />
                    </button>
                    

                    {!searchActive ?
                     (
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
                    </>) 
                    : (
                        <button
                        onClick={handleActive}
                        className="bg-[#F4F4F4] order-1  sm:hidden rounded-full p-2 flex items-center justify-center"
                        >
                        <Image height={20} width={20}  className="size-5" alt="close the search arrow"  src="/icons/dashboard/arrow-search.svg"/>
                        </button>
                    )}
                </div>
                

                <div className=" pl-24  mr-4 flex flex-wrap justify-center items-center mt-4 flex-row gap-4">
                  
                    {loading ? (
                        <p>Loading videos...</p>
                    ) : error ? (
                        <p>Error fetching videos: {error.message}</p>
                    ) : (
                        data && data.content.map((video, index) => (
                            <Card hover={isFilterOpen} key={index + 120} video={video} />
                        ))
                    )}

                </div>
                {/* Filter Menu */}
                {/* Had problems with Z index so filter was put below! */}
                {isFilterOpen && <div className=" fixed top-10 right-10 z-50 pt-6  flex flex-col items-center  bg-white border-2 rounded-2xl w-72 min-h-96 max-h-fit">
                        <h6 className="font-poppin-semibold">Category</h6>
                        <div className="flex flex-col items-center justify-center flex-wrap w-full">
                            {["all", "programming", "gaming","information"].map(current => (
                            <div className="flex items-center  gap-2" key={current}>
                                <input type="radio" id={current} name="sort" value={current} checked={selectedCategory === current} onChange={() => setSelectedCategory(current)} className="hidden peer " />
                                <div className={`size-3 border-2 rounded-full ${selectedCategory === current ? "bg-blue border-blue-500" : "border-black bg-gray-100"} cursor-pointer`} onClick={() => setSelectedCategory(current)}></div>
                                <label htmlFor={current} className="cursor-pointer capitalize">{current}</label>
                            </div>
                            ))}
                        </div>
                        <h6 className="mt-5 font-poppin-semibold">Sort By: </h6>
                        <div className="flex flex-row gap-2 justify-center flex-wrap w-full">
                            {["none", "likes", "views","createdAt"].map(current => (
                            <div className="flex items-center gap-2" key={current}>
                                <input type="radio" id={current} name="sort" value={current} checked={selectedSortBy === current} onChange={() => setSelectedSortBy(current)} className="hidden peer" />
                                <div className={`size-3 border-2 ${selectedSortBy === current ? "bg-blue border-blue-500" : "border-black bg-gray-100"} cursor-pointer`} onClick={() => setSelectedSortBy(current)}></div>
                                <label htmlFor={current} className="cursor-pointer capitalize">{current}</label>
                            </div>
                            ))}
                        </div>
                        <h6 className="mt-5 font-poppin-semibold">Order</h6>
                        <div className="flex flex-row gap-2 justify-center flex-wrap w-full">
                            {["none", "descending", "ascending"].map(current => (
                            <div className="flex items-center gap-2" key={current}>
                                <input type="radio" id={current} name="sort" value={current} checked={selectedOrder=== current} onChange={() => setSelectedOrder(current)} className="hidden peer" />
                                <div className={`size-3 border-2 ${selectedOrder === current ? "bg-blue border-blue-500" : "border-black bg-gray-100"} cursor-pointer`} onClick={() => setSelectedOrder(current)}></div>
                                <label htmlFor={current} className="cursor-pointer capitalize">{current}</label>
                            </div>
                            ))}
                        </div>
                        <button onClick={handleClickFilter} className="w-full py-2 bg-blue  text-white rounded-2xl mt-4">
                            Close
                        </button>

                    </div>}



            </main>
        </>
     );
}

export default Dashboard;