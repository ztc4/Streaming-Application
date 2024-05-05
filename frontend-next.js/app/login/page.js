"use client";

import Cookies from "js-cookie";
import Form from "@/app/Components/form";
import AuthWithGoogle from "@/app/Components/oauth";
import form1Data from "@/app/data/login.json";
import { useState } from "react";

function Login() {
  console.log(form1Data);
  Cookies.set("animal", "cat");
  const [form, setForm] = useState({
    email:"",
    password:"",
  })

  const handleClick = () => {
    setPage((current) => current + 1);
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
