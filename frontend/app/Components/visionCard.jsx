import Image from "next/image";

function VisionCard({text,header,color = 1,icon}) {
    return ( 

        <div className={`${color == 1 && "bg-[#473BF0]" || color == 2 && "bg-[#F64B4B]" || color == 3 && "bg-[#83FFA3]"} flex flex-col justify-center items-center rounded-md shadow-xl p-8 gap-6 text-white ${color ? "" : ""}`}>
           <Image
           height={280}
           width={190}
           className=""
           src={`/icons/landing/${icon}.svg`}
           alt="Logo"/>
           <h3 className="font-poppin-semibold text-2xl text-center">{header}</h3>
           <p className="font-poppin-italic text-base text-center">{text}</p>
        </div>

     );
}

export default VisionCard;