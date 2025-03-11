"use client";
import Card from "@/app/Components/card";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

function YourAccount() {
  const [video, setVideo] = useState([])
  const [playlist,setPlaylist] = useState([])
  const [showingVideos, setChangeShowing] = useState(true)
  const [selectedOption, setSelectedOption] = useState("createdAt");
  let headers = (token) => ({ headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' } });
  const token = Cookies.get("token");

  useEffect(()=>{

  if(showingVideos){
    let data =  axios.get(`http://localhost:8080/api/v1/search/videos/me?sortBy=${selectedOption}&order=descending`, headers(token)).then( res => setVideo(res.data))
    console.log(data)
  }
  else{
    // get playlist
  }

 
  
  },[selectedOption])
  

  return (
    <main className="w-screen md:pl-56 min-h-screen pt-12 md:pt-40 bg-[#F8F8F8]">
      <div className=" w-full md:max-w-[1200px] flex-col justify-center items-center mx-auto">
        <div className="flex max-w-[800px] mx-auto flex-col md:flex-row justify-center items-center gap-8">
          <div className="bg-black aspect-square size-52 rounded-full"></div>
          <div className=" flex flex-col  items-center md:items-start gap-2">
            <h1 className="uppercase font-poppin-italic text-4xl">@Username</h1>
            <p className="text-2xl font-poppin-medium">
              <span className="font-poppin-bold">Subscribers</span> • 320
            </p>
            <div className="flex ml-4 mt-3 relative">
              <h5 className="transform text-2xl font-poppin-bold -rotate-90 origin-top-left whitespace-nowrap translate-y-20">About<span className="sr-only">About</span></h5>
              <div>
                <p className="text-base">Lorem ipsum dolor sit amet consectetur. Varius varius consectetur diam ultrices interdum egestas non fusce aliquet. Iaculis lectus elementum in condimentum eget ullamcorper sit justo. Ut nec.</p>
                <div className="w-full mt-4 flex flex-row gap-1 md:gap-8">
                  <Link href="" passHref>
                    <button className="border-2 border-blue rounded-3xl px-10 py-2 font-poppin-medium text-lg text-blue">Linkedin</button>
                  </Link>
                  <Link href="" passHref>
                    <button className="border-2 h-fit border-blue bg-blue text-white rounded-3xl px-10 py-2 font-poppin-medium text-lg ">Manage Videos</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row px-2 mt-12 border-b-4 border-t-0 justify-between">
          <div className="flex flex-row gap-3">
            <button onClick={ ()=>setChangeShowing(true)} className={`font-poppin-semibold text-xl + ${showingVideos ? "text-blue " :""} `}>Videos</button>
            <button onClick={()=>setChangeShowing(false) } className={`font-poppin-semibold text-xl + ${!showingVideos ? "text-blue " :""} `}>Playlist</button></div>
          {!showingVideos || <div className="flex flex-row items-center gap-4">
            <p>Sort:</p>
            {["createdAt","likes", "views"].map(current => (
              <div className="flex items-center gap-2" key={current}>
                <input type="radio" id={current} name="sort" value={current} checked={selectedOption === current} onChange={() => setSelectedOption(current)} className="hidden peer" />
                <div className={`size-3 border-2 ${selectedOption === current ? "bg-blue border-blue-500" : "border-black bg-gray-100"} cursor-pointer`} onClick={() => setSelectedOption(current)}></div>
                <label htmlFor={current} className="cursor-pointer capitalize">{current}</label>
              </div>
            ))}
          </div>}
        </div>
        <div className="flex flex-wrap justify-start items-center  mt-4 flex-row gap-4">
          { showingVideos ? video?.content?.map((_, i) => <Card key={i} video={_} />) : playlist?.content?.map((_, i) => <Card key={i} video={_} />)}
        </div>
      </div>
    </main>
  );
}

export default YourAccount;
