
interface IEmpowerProps{
    header: string;
    paragraph: string;
    number: number;
}

export default function EmpowerItem({header = "Void", paragraph = "Void",number = 1}: IEmpowerProps) {


    return(
        <div className="flex flex-row gap-4">
            <div className="p-4 font-bold size-10 flex justify-center items-center rounded-full bg-orange">{number}</div>
            <p className="flex flex-col gap-1">
                <span className="text-[24px] font-extralight">{header}</span>
                <span  className="text-[19px] text-text-secondary font-extralight">{paragraph}</span>
            </p>

        </div>
    )
}