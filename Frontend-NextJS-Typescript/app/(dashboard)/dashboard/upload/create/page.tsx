"use client";
import {useCreateVideoContext} from "@/app/context/CreateVideoContext";
import clsx from "clsx";
import {ChevronDown, ChevronRight} from "lucide-react";
import { useState} from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import axios from "axios";
import {NEXT_BODY_SUFFIX} from "next/dist/lib/constants";

export default function  CreateVideoPage(){
    const {pageOne} = useCreateVideoContext();
    const {basicForm, setBasicForm} = pageOne
    const [isClicked, setIsClicked] = useState<boolean>(false);
    const [errors, setErrors] = useState<Record<string, string>>({})
    const [loading, setLoading] = useState<"Normal"|"Successful" | "Submitting">("Normal");
    const router = useRouter();

    const validateForm = ()=> {
        const newErrors: Record<string, string> = {};
        if(basicForm.title.length < 8  && basicForm.title.length > 64) newErrors.title = "Title mustn't be greater than 64 characters or less than 8 characters ";
        if(basicForm.description.length  <  400) newErrors.title = "Description mustn't be over 400 characters ";
        setErrors(newErrors);

    }


    const editBasicForm = (e: React.ChangeEvent<HTMLInputElement> |  React.ChangeEvent<HTMLTextAreaElement> ) => {
        const {name, value} = e.target;
        setBasicForm( current => ({...current, [name]: value }))
        setErrors({ ...errors, [e.target.name]: "" });
    }

    const selectCategory = (e: React.ChangeEvent<HTMLInputElement>)=>{
        setBasicForm({...basicForm, category: e.target.value})
        setIsClicked(false);
    }

    const submitForm = async (e: React.FormEvent)=>{
        e.preventDefault();
        //navigate to different page
        try{
            const token = Cookies.get("token");
            let headers =  { headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' } };
            const res = await axios.post(process.env.NEXT_PUBLIC_API_FETCH_URL + "/video/createVideo", {...basicForm}, headers)
            console.log(res.data);
            alert(res)

            router.push("/dashboard/upload/add-video")
        }catch(error:any){
            console.log(error)
            alert(error.response)

        }

    }
    console.log(basicForm)

    if(loading == "Submitting") return <p className={"my-auto mx-auto text-3xl h-fit w-fit  font-bold"}>Loading <span className={"animate-pulse"}>... </span></p>
    return (

            <div className="max-w-screen-md mx-auto ">
                <h1 className="text-4xl font-medium ">Create Video </h1>
                {/*<p>{basicForm.category}</p>*/}
                <form className={"grid col-span-12 mt-8 gap-8"} onSubmit={submitForm}>
                    <div className={clsx(` flex flex-col gap-2 max-sm:col-span-6 col-span-12`)}>
                        <label htmlFor="title" className={"text-text-secondary h-4 mb-[8px] capitalize"}>Title: </label>
                        <input
                            onChange={editBasicForm}
                            name="title"
                            type="text"
                            placeholder="Enter your title here..."
                            value={basicForm.title}
                            className={` w-full outline-1  border-none bg-opacity-40 autofill:pl-8 autofill:outline-none rounded-2xl focus:placeholder:px-8 duration-700 bg-[#B0BAC3] py-3 px-6 outline  focus:text-text-secondary text-black`}/>
                        {errors.title && <p className="mt-1 text-sm text-pink-600 ">
                            {errors.title}
                        </p>}
                    </div>
                    <div className={clsx(` flex flex-col gap-2 max-sm:col-span-6 col-span-12`)}>
                        <label htmlFor="description"
                               className={"text-text-secondary h-4 mb-[8px] capitalize"}>Title: </label>
                        <textarea
                            onChange={editBasicForm}
                            name="description"
                            rows={9}
                            placeholder="Enter your description here..."
                            value={basicForm.description}
                            className={` w-full outline-1  border-none bg-opacity-40 autofill:pl-8 autofill:outline-none rounded-2xl focus:placeholder:px-8 duration-700 bg-[#B0BAC3] py-3 px-6 outline  focus:text-text-secondary text-black`}/>
                        {errors.description && <p className="mt-1 text-sm text-pink-600 ">
                            {errors.description}
                        </p>}
                    </div>
                    <div className={"col-span-12"}>
                        <div className={"w-1/4"}>
                            <h3>Category: </h3>
                            <button
                                onClick={() => setIsClicked(current => !current)}
                                type={"button"}
                                className={"bg-[#B0BAC3] text-lg px-4 flex capitalize flex-row justify-between  bg-opacity-40  items-center p-2 w-full rounded-3xl"}>
                                <span aria-hidden="true"/>
                                <span>{basicForm.category}</span>
                                <ChevronDown className={isClicked ? " rotate-180 duration-700 ":"duration-700"}/>
                            </button>
                            {isClicked &&
                                <div className=" w-1/4 mt-2 bg-white absolute shadow-lg rounded-lg overflow-hidden">
                                    <ul className="text-gray-700">
                                        {["none", "gaming", "educational","programming"]
                                            .filter((item) => item !== basicForm.category) // Remove selected category
                                            .map((item, index) => (
                                                <li key={index} className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                                                    <label className="flex items-center gap-2 cursor-pointer w-full">
                                                        <input type="radio" name="category" value={item.toUpperCase()}
                                                               checked={basicForm.category === item} className="hidden"
                                                               onChange={selectCategory}
                                                        />
                                                        {item}
                                                    </label>
                                                </li>
                                            ))}
                                    </ul>
                                </div>}
                        </div>
                    </div>
                    <div className="col-span-12 flex justify-end mt-8">
                        <button
                            type="submit"
                            className="flex flex-row items-center p-2 text-lg justify-between bg-blue-500  hover:bg-blue-600 text-white rounded-3xl w-1/4">
                            <span/>
                            <span>Continue</span>
                            <ChevronRight/>
                        </button>
                    </div>
                </form>
            </div>
    )
}