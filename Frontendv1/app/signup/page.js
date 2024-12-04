"use client";
import Form from "@/app/Components/form";
import AuthWithGoogle from "@/app/Components/oauth";
import form1Data from "@/app/data/signup.json";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie"; // Make sure to import Cookies
import { useRouter } from "next/navigation";

function Signup() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [form, setForm] = useState({
    username: "", // Adjusted field names to match UserCreateDTO
    password: "",
    email: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    cpassword:"" // This can be a string, can convert to number if needed
  });

  const [showPassword, setShowPassword] = useState(false);

  // Show Password functionality
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

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
  };

  // Handle form submission
  const URL = "http://localhost:8080/api/v1";

  const handleSubmit = async () => {
    console.log("Form data:", form);

    try {
      const response = await axios.post(URL + "/user/createAccount", form);
      Cookies.set("token", response.data);
      router.push('/dashboard');
    } catch (error) {
      if (error.response) {
        console.error("Error response:", error.response.data);
        alert(error.response.data); // Show error message to user
      } else if (error.request) {
        console.error("Error request:", error.request);
        alert("Network error. Please try again later.");
      } else {
        console.error("Error message:", error.message);
        alert("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <>
      {page === 1 && (
        <Form
          data={form1Data.page1}
          form={form}
          handleClick={handleClick}
          handleChange={handleChange}
          color="yellow"
        />
      )}
      {page === 1 && <AuthWithGoogle link="login" color="yellow" />}
      {page === 2 && (
        <Form
          color="yellow"
          data={form1Data.page2}
          form={form}
          handleClick={handleClick}
          handleChange={handleChange}
        />
      )}
      
      {page === 3 && (
        <div className="w-full">
          <h1 className="font-poppin-medium sm2:mb-2 mb-8 text-4xl text-left ">
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
                {form.firstName[0]?.toUpperCase() + form.firstName.substring(1) + " " +
                form.lastName[0]?.toUpperCase() + form.lastName.substring(1) || "Name is needed!"}
              </p>
            </div>
            <div
              onClick={() => changePage(2)}
              className="col-span-3 cursor-pointer"
            >
              <label className="text-[#606060]">Username</label>
              <p className="text-black ">{form.username.toLowerCase() || "Username is needed!"}</p>
            </div>
            <div
              onClick={() => changePage(2)}
              className="col-span-6 cursor-pointer"
            >
              <label className="text-[#606060]">Email</label>
              <p className="text-black ">{form.email.toLowerCase() || "Email is Needed!"}</p>
            </div>
            <div
              onClick={() => changePage(2)}
              className="col-span-6 cursor-pointer"
            >
              <label className="text-[#606060]">Number</label>
              <p className="text-black ">{form.phoneNumber || "Number is Needed!"}</p>
            </div>
            <div className="col-span-6 flex justify-between">
              <div className="cursor-pointer" onClick={() => changePage(2)}>
                <label className="text-[#606060]">Password</label>
                <p className="text-black ">
                  {showPassword ? form.password : `***********`}
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
              onClick={handleSubmit}
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
