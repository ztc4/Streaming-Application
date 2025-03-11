
interface IReviewItem {
    inputFunction: (event: React.MouseEvent<HTMLInputElement>) => void;
    label:string;
    colSpan:number;
    value: string;
}

export default function ReviewItem({ inputFunction, label, colSpan, value }: IReviewItem) {
    return  (
        <div className={`col-span-${colSpan} flex flex-col cursor-pointer z-20 `} onClick={inputFunction}>
            <span className={"opacity-80 text-sm "}>{label}</span>
            <span>{value}</span>
        </div>
    )
}