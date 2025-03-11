"use client"
import AuthInput from "@/app/components/AuthInput";
import {useState} from "react";

interface IFormData {
    email: string;
    password: string;
}

export default function LoginForm(){
    const [formData, setFormData] = useState<IFormData>({ email: "", password: "" });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <form className={"grid grid-cols-6 w-full  gap-4"}>
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
                value={formData.password} />

        </form>
    )
}