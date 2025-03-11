"use client"
import {IUser} from "@/app/interfaces/IUser";
import axios from "axios";
import Cookies from "js-cookie";
import {useState} from "react";

export  function useUser(fetchURL: String){

    const [user,setUser] = useState<IUser| null>(null);
    const getUser = async () => {
        try{
            const token = Cookies.get("token");
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_FETCH_URL}${fetchURL}`,{
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            })
            setUser(response.data);
        }
        catch (error) {
           console.log("You didn't retrieve your user!")
        }
    }

    return{user, getUser};
}