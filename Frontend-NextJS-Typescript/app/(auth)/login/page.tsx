"use client"
import Image from "next/image";

import Cookies from "js-cookie";
import Link from "next/link";
import AuthInput from "@/app/components/AuthInput";
import {useState} from "react";
import {useRouter} from "next/navigation";

import axios from "axios";

interface IFormData {
    email: string;
    password: string;
}

export default function Login() {
    const [formData, setFormData] = useState<IFormData>({ email: "", password: "" });

    const router = useRouter()
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const formSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Submitted!")
        // ;
        try {
            const response = await axios.post(process.env.NEXT_PUBLIC_API_FETCH_URL + "/auth/login", formData);
            router.push('/dashboard');

        }
        catch (e) {
            console.log(e)
            alert(e);
        }


    }

    return (
        <div className={"pb-6 pt-40 flex flex-col items-center px-8 gap-8   "}>
            <h1 className={"text-4xl text-center font-semibold"}>Login to Your Account</h1>
            <form onSubmit={formSubmit} className={"grid grid-cols-6 w-full  gap-4"}>
                <AuthInput
                    inputFunction={handleInputChange}
                    colSpan={6} label="Email: "
                    placeholder="Enter Your Email"
                    name="email" type={"Email"} error={null}
                    value={formData.email}/>
                <AuthInput
                    inputFunction={handleInputChange}
                    colSpan={6} label="Password: "
                    placeholder="Enter Your Password"
                    name="password" type={"Password"} error={null}
                    value={formData.password}/>
                <button

                    className="col-span-6 mx-auto hover:bg-blue-900 rounded-md py-2 w-1/3 px-6 drop-shadow-md text-text bg-blue ">
                    Login
                </button>

            </form>
            <Link className={"self-start  text-text-secondary"} href={"/signup"}> Don&#39;t have an account? <span
                className={'text-blue'}>Sign Up</span> </Link>
            <p className={"uppercase"}> - or - </p>
            <button
                className={" border-2 bg-secondary rounded-3xl flex flex-row justify-center gap-4 items-center font-light p-3 "}>
                <Image src={"/Images/Google.png"} alt={"Google Logo"} height={"25"} width={"25"}/>
                <span>Log in With Google</span>
            </button>
        </div>

    )
}