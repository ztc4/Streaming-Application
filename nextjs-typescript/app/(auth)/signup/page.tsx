"use client"

import Image from "next/image";

import Link from "next/link";
import React, {useState} from "react";
import AuthInput from "@/app/components/AuthInput";
import {ArrowLeft, ArrowRight} from "lucide-react";
import ReviewItem from "@/app/components/SReviewItem";
import {useRouter} from "next/navigation";

interface ISignupForm {
    email: string;
    username: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    password:string;
    confirmPassword:string;


}

export default function Signup(){
    const [formData, setFormData] = useState<ISignupForm>({
        confirmPassword: "",
        firstName: "",
        phoneNumber: "",
        lastName: "",
        email:'',
        username:'',
        password:''})

    const [pageNumber, setPageNumber] = useState<number>(1);
    const [errors, setErrors] = useState<Record<string, string>>({})

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" });
    };

    const validateCurrentPage = ()=>{
        const newErrors: Record<string, string> = {};

        if (pageNumber === 1) {
            if (!formData.firstName.trim()) newErrors.firstName = "First name is required.";
            if (!formData.lastName.trim()) newErrors.lastName = "Last name is required.";
            if (!formData.username.trim() || formData.username.length < 6) newErrors.username = "Username must be at least 6 characters.";
        } else if (pageNumber === 2) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const phoneRegex = /^[0-9-]+$/;

            if (!formData.email.trim() || !emailRegex.test(formData.email))
                newErrors.email = "Enter a valid email address.";
            if (!formData.phoneNumber.trim() || !phoneRegex.test(formData.phoneNumber))
                newErrors.phoneNumber = "Enter a valid phone number.";
        } else if (pageNumber === 3) {
            if (!formData.password.trim() || formData.password.length < 6)
                newErrors.password = "Password must be at least 6 characters.";
            if (formData.password !== formData.confirmPassword)
                newErrors.confirmPassword = "Passwords do not match.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;

    };
    const handleNext = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateCurrentPage()) {
            setPageNumber(pageNumber + 1);
        }
    };
    const handlePrevious = (e: React.FormEvent) => {
        e.preventDefault();
       return  setPageNumber(pageNumber - 1);
    };

    const handleSpecificPage = (e: React.FormEvent,page: 1 | 2 |3 ) => {
        e.preventDefault();
       return setPageNumber(page);
    };
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        useRouter().push('/dashboard');

    }



    return (
        <div className={"pb-6 pt-28 flex flex-col items-center px-8 gap-8 z-10   "}>
            <h1 className={"text-4xl font-semibold"}>
                {
                    pageNumber == 1 && "Signup" ||
                    pageNumber == 2 && " Continue Your Signup " ||
                    pageNumber == 3 && " Almost Done!" ||
                    pageNumber == 4 && "Review!"}</h1>
            {pageNumber == 4 && <h2 >Click Field to Move Page to Change!</h2>}
            <form className={"grid grid-cols-6 w-full justify-center items-center  gap-4"}>
                {pageNumber == 1 &&
                    <>
                        <AuthInput
                            inputFunction={handleInputChange}
                            colSpan={3} label="Full Name: "
                            placeholder="John "
                            error={errors?.firstName}
                            name="firstName" type={"Text"}
                            value={formData.firstName}
                        />
                        <AuthInput
                            inputFunction={handleInputChange}
                            colSpan={3} label=" "
                            placeholder="Doe "
                            error={errors?.firstName}
                            name="lastName" type={"Text"}
                            value={formData.lastName}
                        />
                        <AuthInput
                            inputFunction={handleInputChange}
                            colSpan={6} label="Username ( minimum 6 characters ) "
                            placeholder="124Randy"
                            error={errors?.username}
                            name="username" type={"Text"}
                            value={formData.username}
                        />
                        <button onClick={handleNext}  className={" flex bg-yellow rounded-3xl text-black  relative col-span-6 p-2  justify-center flex-row"}>
                            <span className={"text-lg"}>Continue Your Signup</span>
                            <ArrowRight className={"absolute right-[4%]"}/>
                        </button>

                    </>
                }
                {pageNumber == 2 &&
                    <>

                        <AuthInput
                            inputFunction={handleInputChange}
                            colSpan={6} label="Email:  "
                            placeholder="John@example.com "
                            error={errors?.email}
                            name="email" type={"Email"}
                            value={formData.email}
                        />
                        <AuthInput
                            inputFunction={handleInputChange}
                            colSpan={6} label="Phone Number"
                            placeholder="123-345-6789 "
                            error={errors?.phoneNumber}
                            name="phoneNumber" type={"Tel"}
                            value={formData.phoneNumber}
                        />

                        <div className={"col-span-6 grid grid-cols-7 gap-2"}>
                            <button
                                className={`col-span-1 p-1 flex justify-center items-center rounded-full bg-secondary `}
                                onClick={handlePrevious}><ArrowLeft/></button>
                            <button onClick={handleNext}
                                    className={" flex bg-yellow rounded-3xl text-black  relative col-span-6 p-2  justify-center flex-row"}>
                                <span className={"text-lg"}>Continue</span>
                                <ArrowRight className={"absolute right-[4%]"}/>
                            </button>
                        </div>

                    </>
                }
                {pageNumber == 3 &&
                    <>

                        <AuthInput
                            inputFunction={handleInputChange}
                            colSpan={6} label="Password:  "
                            placeholder="***** "
                            error={errors?.password}
                            name="password" type={"Password"}
                            value={formData.password}
                        />
                        <AuthInput
                            inputFunction={handleInputChange}
                            colSpan={6} label="Confirm Password"
                            placeholder="*****"
                            error={errors?.confirmPassword}
                            name="confirmPassword" type={"Password"}
                            value={formData.confirmPassword}
                        />
                        <div className={"col-span-6 grid grid-cols-7 gap-2"}>
                            <button
                                className={`col-span-1 p-1 flex justify-center items-center rounded-full bg-secondary`}
                                onClick={handlePrevious}><ArrowLeft/></button>
                            <button onClick={handleNext}
                                    className={" flex bg-yellow rounded-3xl text-black  relative col-span-6 p-2  justify-center flex-row"}>
                                <span className={" text-lg"}>Go to Review</span>
                                <ArrowRight className={"absolute right-[4%]"}/>
                            </button>
                        </div>


                    </>
                }
                {pageNumber == 4 &&
                    <>
                        <ReviewItem
                            inputFunction={(e) => handleSpecificPage(e, 1)}
                            label={"Full Name"} colSpan={3}
                            value={formData.firstName + " " + formData.lastName}/>
                        <ReviewItem
                            inputFunction={(e) => handleSpecificPage(e, 1)}
                            label={"Username"} colSpan={3}
                            value={formData.username}/>
                        <ReviewItem
                            inputFunction={(e) => handleSpecificPage(e, 2)}
                            label={"Email"}
                            colSpan={4}
                            value={formData.email}/>
                        <ReviewItem
                            inputFunction={(e) => handleSpecificPage(e, 2)}
                            label={"Phone Number"}
                            colSpan={3}
                            value={formData.phoneNumber}/>
                        <ReviewItem
                            inputFunction={(e) => handleSpecificPage(e, 3)}
                            label={"Password"}
                            colSpan={4}
                            value={formData.password}/>
                        <div className={"col-span-6 grid grid-cols-7 gap-2"}>
                            <button
                                className="col-span-1 p-1 flex justify-center items-center rounded-full bg-secondary"
                                onClick={handlePrevious}>
                                    <ArrowLeft/>
                            </button>
                            <button
                                onClick={handleSubmit}
                                className={" flex bg-yellow rounded-3xl text-text relative col-span-6 p-1  justify-center flex-row"}>
                                    <span className={""}>Go to Review</span>
                                    <ArrowRight className={"absolute right-[4%]"}/>
                            </button>
                        </div>
                    </>
                }
            </form>
            {pageNumber == 1 &&
                <>
                    <Link className={"self-start text-text-secondary"} href={"/login"}>
                        Already have an Account?
                        <span className={'text-yellow ml-1'}>Login</span>
                    </Link>
                    <p className={"uppercase"}> - or - </p>
                    <button className={" border-2 bg-secondary rounded-3xl flex flex-row justify-center gap-4 items-center font-light p-3 "}>
                        <Image src={"/Images/Google.png"} alt={"Google Logo"} height={"25"} width={"25"}/>
                        <span>Log in With Google</span>
                    </button>
                </>
            }

        </div>
    )
}
