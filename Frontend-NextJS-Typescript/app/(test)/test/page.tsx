"use client"
import axios from "axios";
import {useState} from "react";
import {IUser} from "@/app/interfaces/IUser";


export default async function Test(){
    const [user, setUser] = useState<IUser>()

    const fetchData = async () => {
        try {
            const { data } = await axios.post("/api/auth/login",{
                email:"zachary4coats@gmail.com",
            }); // Correct relative URL
            console.log("Response:", data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    fetchData();
    return (
        <div className="bg-main">
            <h1 className="text-text">Hello there zachary</h1>
        </div>
    )
}