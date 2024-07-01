import Image from "next/image";

function VisionCard({image,text,header,color}) {
    return ( 

        <div className={`bg-red-700 flex flex-col justify-center items-center rounded-md shadow-xl p-8 gap-6 text-white ${color ? "" : ""}`}>
           <Image
           height={200}
           width={80}
           className=""
           src="/icons/Logo.svg"
           alt="Logo"/>
           <h3 className="font-poppin-semibold text-2xl">{header}</h3>
           <p className="font-poppin-italic text-base text-center">{text}</p>
        </div>

     );
}

export default VisionCard;