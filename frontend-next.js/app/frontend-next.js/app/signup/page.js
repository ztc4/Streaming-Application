"use client";
import Form from "@/app/Components/form";
import AuthWithGoogle from "@/app/Components/oauth";
import form1Data from "@/app/data/signup.json";
import { useState, useEffect } from "react";

function Signup() {
  const [page, setPage] = useState(1);
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    username: "",
    number: "",
    password: "",
    cpassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  //Show Password
  const showPass = () => {
    setShowPassword((current) => !current);
  };

  // Change Page & Edit Form
  const handleClick = () => {
    setPage((current) => current + 1);
  };
  const changePage = (index) => {
    setPage(index);
  };
  // Edit Form
  const handleChange = (e) => {
    const { name, id, value } = e.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
  };

  return (
    <>
      {page == 1 && (
        <Form
          data={form1Data.page1}
          form={form}
          handleClick={handleClick}
          handleChange={handleChange}
          color="yellow"
        ></Form>
      )}
      {page == 1 && <AuthWithGoogle link="login" color="yellow" />}
      {page == 2 && (
        <Form
          color="yellow"
          data={form1Data.page2}
          form={form}
          handleClick={handleClick}
          handleChange={handleChange}
        ></Form>
      )}
      {page == 3 && (
        <div className="w-full">
          <h1 className="font-poppin-medium sm2:mb-2  mb-8 text-4xl text-left ">
            Review
          </h1>
          <p>Click field to move to page to change field</p>
          <div className="grid grid-cols-6 w-full mt-6 gap-4 font-poppin-medium">
            <div
              onClick={() => changePage(1)}
              className="col-span-3 cursor-pointer"
            >
              <label className="text-[#606060]">Full Name</label>
              <p className="text-black ">
                {form?.firstname[0]?.toUpperCase() +
                  form?.firstname?.substring(1) +
                  " " +
                  form?.lastname[0]?.toUpperCase() +
                  form?.lastname?.substring(1)}
              </p>
            </div>
            <div
              onClick={() => changePage(2)}
              className="col-span-3 cursor-pointer"
            >
              <label className="text-[#606060]">Username</label>
              <p className="text-black ">{form.username?.toLowerCase()}</p>
            </div>
            <div
              onClick={() => changePage(1)}
              className="col-span-6 cursor-pointer"
            >
              <label className="text-[#606060]">Email</label>
              <p className="text-black ">{form.email?.toLowerCase()}</p>
            </div>
            <div
              onClick={() => changePage(2)}
              className="col-span-6 cursor-pointer"
            >
              <label className="text-[#606060]">Number</label>
              <p className="text-black ">{form.password?.toLowerCase()}</p>
            </div>
            <div className="col-span-6 flex justify-between">
              <div className="cursor-pointer" onClick={() => changePage(2)}>
                <label className="text-[#606060]">Password</label>
                <p className="text-black ">
                  {showPassword ? form.password?.toLowerCase() : ""}
                </p>
              </div>
              <button
                className="border-2 p-1 hover:border-black hover:border-opacity-85 rounded-xl text-yellow text-opacity-80"
                onClick={showPass}
              >
                {showPassword ? "Hide Password" : "Show Password"}
              </button>
            </div>
            <button
              onClick={handleClick}
              type="button"
              className="bg-yellow col-span-6 w-full font-poppin-medium text-black sm:w-5/12 rounded-md mx-auto h-10 sm:h-12"
            >
              Create Account
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Signup;
