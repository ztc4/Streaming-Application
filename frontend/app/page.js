"use client";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col  items-center justify-between p-24">
        <h1>Future Landing Page</h1>
        <div className="bg-orange *:rounded-lg *:p-2 font-poppin- gap-3  w-full h-96 flex flex-row justify-center lg:bg-red-600 items-center text-white bg-[#440341]">
          <button className="bg-blue border-2">login </button>
          <button className="bg-blue">Click here</button>
        </div>

    </main>
  );
}
