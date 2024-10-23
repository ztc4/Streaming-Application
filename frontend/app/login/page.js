"use client";

import Cookies from "js-cookie";
import Form from "@/app/Components/form";
import AuthWithGoogle from "@/app/Components/oauth";
import form1Data from "@/app/data/login.json";
import { useState } from "react";
import useApi from "../API/useApiFlexible";
import axios from "axios";
import { useRouter } from "next/navigation";

function Login() {
  const router = useRouter();
  Cookies.set("animal", "cat");
  const [form, setForm] = useState({
    email:"",
    password:"",
  })
  const URL = "http://localhost:8080/api/v1"

  const handleClick = async () => {
    // Optionally log the current form state
    console.log("Form data:", form);

    try{
      const response = await axios.post(URL + "/user/login", form)
      Cookies.set("token", response.data)
      router.push('/dashboard');
    }
    catch(error){
      if (error.response) {
        // Server responded with a status other than 200 range
        console.error("Error response:", error.response.data);
        alert(error.response.data); // Show error message to user
    } else if (error.request) {
        // Request was made but no response received
        console.error("Error request:", error.request);
        alert("Network error. Please try again later.");
    } else {
        // Something happened in setting up the request
        console.error("Error message:", error.message);
        alert("An unexpected error occurred. Please try again.");
    }

    }
    // Example usage of API call from useApiFlexible hook
    const { data} = await axios.post(URL + "/user/login", form);
    console.log(data)


  };
  const handleChange = (e) => {
    const { name, id, value } = e.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
  };

  return (
    <>
      <Form data={form1Data}  title={"Log into your profile"} form={form} handleClick={handleClick} handleChange={handleChange}></Form>
      <AuthWithGoogle link="signup" />
    </>
  );
}

export default Login;
