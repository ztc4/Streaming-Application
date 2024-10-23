"use client";

import Image from 'next/image';
import { useState } from 'react';

function Feedback() {
    const [wordCount, setWordCount] = useState(0); // Fix: Use useState for wordCount
    const [form, setForm] = useState({
        email: "",
        advice: ""
    });

    const changeForm = (e) => {
        const { id, value } = e.target;
        setForm(prevForm => ({
            ...prevForm,
            [id]: value
        }));

        if (id === "advice") {
            setWordCount(value.length); // Update word count based on advice field
        }
    };
    const submitForm =  (e)=>{
        e.preventDefault();
    }

    return (
        <main id="FEEDBACK" className="flex min-h-screen w-full flex-col md:py-40 px-6 md:px-40 bg-white dark:bg-dark-background overflow-x-hidden  items-start justify-start">
            <h1 className="font-poppin-semibold mt-32 md:mt-0  text-5xl">Give Us Advice</h1>
            <form className=" w-full md:w-8/12">
                <div className="mb-6 w-full mt-12">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter Email</label>
                    <input
                        type="email"
                        id="email"
                        value={form.email} // Control value
                        onChange={changeForm} // Handle change
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue dark:focus:border-blue"
                    />
                </div>
                <div className="mb-6 w-full h-80 mt-12">
                    <label htmlFor="advice" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Advice/Problem!</label>
                    <textarea
                        id="advice"
                        value={form.advice} // Control value
                        onChange={changeForm} // Handle change
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg min-h-60 focus:ring-blue focus:border-blue block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue dark:focus:border-blue"
                    />
                    <p className='w-fit ml-auto'>Your word count is: {wordCount}</p>
                    <button className='h-16 w-48 ml-auto flex flex-row justify-center items-center px-4 bg-orange border hover:bg-black duration-700'
                    style={{ borderRadius: "20px 6.21px 35px 6.21px" }}
                    >
                        <p className='uppercase text-white font-poppin-semibold text-xlwd tracking-wide'>Submit</p>
                        <Image
                        className=" text-white ml-4 size-12"
                        height={25}
                        width={25}
                        src="/icons/landing/arrowRight.svg"
                        />
                    </button>
                </div>
                
            </form>
        </main>
    );
}

export default Feedback;
