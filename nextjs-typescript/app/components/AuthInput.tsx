import clsx from "clsx";

interface IAuthInput{
    inputFunction: (event: React.ChangeEvent<HTMLInputElement>) => void; //  This will be a function
    colSpan: number;
    label: string;
    placeholder: string;
    name:string;
    type: "Email" | "Password" | "PasswordConfirm" | "Text" | "Tel";
    value:string;
    error: string | null ;
}


export default function AuthInput({inputFunction, colSpan = 6 , error = null, label, placeholder, name, type = "Text", value}: IAuthInput){

    return (
        <div className={clsx(` flex flex-col gap-2 `, ` max-sm:col-span-6 col-span-${colSpan}`)}>
            <label htmlFor={name} className={"text-text-secondary-2 h-4 mb-[8px] capitalize"}>{label}</label>
            <input
                onChange={inputFunction}
                name={name}
                type={type.toLowerCase()}
                placeholder={placeholder}
                value={value}
                className={` w-full outline-1  border-none  autofill:pl-8 autofill:outline-none rounded-2xl focus:placeholder:px-8 duration-700 bg-input py-3 px-6 outline-none  focus:text-text text-text-secondary`}/>
                {error && <p className="mt-1 text-sm text-pink-600 ">
                    {error}
                </p>}
        </div>

    )
}