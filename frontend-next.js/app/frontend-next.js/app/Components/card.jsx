"use client"
function Card() {
  return (
    <div className="h-56 w-full sm:w-80 rounded-lg p-2 bg-cover flex flex-col justify-between bg-red-300 bg-[url('/images/card-placeholder.jpg')]">
      {/* Tags and likes */}
      <div className="">
        <p className="bg-orange block w-fit p-1 bg-tr rounded-lg">Tag 1</p>
      </div>
      {/* Video Information */}
      <div className=" text-left">
        <h6>USERNAME</h6>
        <p>VIDEO TITLE</p>
      </div>
    </div>
  );
}

export default Card;
