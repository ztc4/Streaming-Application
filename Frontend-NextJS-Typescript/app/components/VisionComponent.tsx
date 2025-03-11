import {User, Cloud, MessageCircle, MoveRight, MoveLeft} from 'lucide-react';


interface IVisionComponentProps {
    header:"Upload" | "Interact" | "Share";
    paragraph:string;

}


export default function VisionComponent({header, paragraph}: IVisionComponentProps) {

    const getImage = ()=>{
        switch(header){
            case "Upload": return VisionUploadImage();
            case "Interact": return VisionInteractImage();
            case "Share": return VisionShareImage();
            default:return null;
        }
    }

    return(
        <div className=" max-w-[465px] h-[350px] md:h-[440px] bg-secondary aspect-auto p-1 z-20 border group mt-4 border-1 group rounded-[5px] ">
            <div className={"w-full h-full px-4 md:px-8 border border-1 duration-700 group-hover:-translate-x-3 group-hover:-translate-y-3 rounded-[5px] bg-main "}>
                <div className={"h-1/2 overflow-hidden "}>
                    {getImage()}
                </div>
                <div className={"h-1/2"}>
                    <h1 className={"text-stroke  text-transparent group-hover:underline underline-offset-4 duration-700 underline-red-400 group-hover:text-text text-4xl md:text-6xl font-bold"}>{header}</h1>
                    <p className={" opacity-80 text-text-secondary mt-2"}>{paragraph}</p>
                </div>
            </div>

        </div>
    )
}
function VisionShareImage(){
    return(
        <div className={"grid  grid-cols-5 gap-2 -mt-10 justify-center h-full w-full "}>
            {Array(8).fill(null).map( (current, index) => {
                return (
                    <div key={index + 8} className={"w-full aspect-1 aspect-square  drop-shadow-xl p-2 md:p-4 flex justify-center items-center  border-2 border-white rounded-2xl border-opacity-80"}>
                        <User className="opacity-30 duration-700 group-hover:opacity-100 " size={"%100"} />
                    </div>
                )
            })}
            {Array(7).fill(null).map( (current, index) => {
                return (
                    <div key={index + 40} className={"w-full drop-shadow-xl p-2 md:p-4 flex aspect-1  justify-center items-center aspect-square border-2 border-white rounded-2xl border-opacity-80"}>
                        <User className="opacity-5 duration-1000 group-hover:opacity-90" size={"%100"} />
                    </div>
                )
            })}
        </div>
    )
}
function VisionInteractImage(){
    return(
        <div className={"h-full w-full flex flex-row gap-3 justify-center items-center"}>
            <MessageCircle size={"%30"}/>
            <div className={" flex"}>
                <MoveLeft size={"%30"} strokeWidth={1} className={"-rotate-6  "}/>
                <MoveRight size={"%30"} strokeWidth={1} className={"-rotate-6"}/>
            </div>
            <MessageCircle size={"%30"} strokeWidth={2} className={"text-stroke scale-x-[-1] opacity-30 group-hover:opacity-100"}/>
        </div>
    )
}
 function VisionUploadImage(){
    return(
        <div className={"h-full w-full flex justify-center items-center relative"}>
            <Cloud size={"%40"} strokeWidth={.2} className={" absolute left-0"}/>
            <Cloud size={"%40"} strokeWidth={.2} className={" absolute left-[10%] opacity-40"}/>
            <Cloud size={"%40"} strokeWidth={.2} className={" absolute left-[20%] opacity-30"}/>
        </div>
    )
}