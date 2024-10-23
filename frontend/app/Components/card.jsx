// "use client"
// function Card() {
//   return (
//     <div className=" h-48 w-auto aspect-video duration-500 z-auto  hover:scale-110 hover:z-40  text-white rounded-lg p-2 bg-cover flex flex-col justify-between bg-red-300 bg-[url('/images/card-placeholder.jpg')]">
//       {/* Tags and likes */}
//       <div className="">
//         <p className="bg-orange block w-fit p-1 bg-tr rounded-lg">Tag 1</p>
//       </div>
//       {/* Video Information */}
//       <div className=" text-left">
//         <h6>USERNAME</h6>
//         <p>VIDEO TITLE</p>
//       </div>
//     </div>
//   );
// }

// export default Card;

"use client";
import Image from 'next/image';

function Card({hover = false, video}) {

  let categories = [ "All","Programming","Gaming", "Information"]
  let {videoId,title,user, likes, description, views, category} = video
  return (
    <div className="relative hover:cursor-pointer h-48 w-auto aspect-video duration-500 z-10 hover:scale-110 hover:z-40 text-white rounded-lg p-2 bg-red-300 flex flex-col justify-between overflow-hidden">
      {/* Image */}
      <Image
        src="/images/card-placeholder.jpg" // Path to your image
        alt="Card placeholder" // Alt text for accessibility
        layout="fill" // Fills the parent div
        objectFit="cover" // Ensures the image covers the entire div
        className="absolute inset-0 z-0" // Positions the image absolutely
      />
      {/* Tags and likes */}
      <div className="z-10">
        <p className="bg-orange block w-fit p-1 bg-tr rounded-lg">{categories[category] || "ALL"}</p>
      </div>
      {/* Video Information */}
      <div className="text-left z-10">
        <h6>{user.username}</h6>
        <p>{title}</p>
        <p>{likes}</p>
      </div>
    </div>
  );
}

export default Card;
