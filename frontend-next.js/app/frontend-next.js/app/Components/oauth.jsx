import Image from "next/image";
import Link from "next/link";


function AuthWithGoogle({link = "dashboard", color = "blue"}) {
  // console.log("AUTH: " + link)
  return (
    <div className="flex flex-col mt-3 gap-8 w-full">
      <Link href={link} className="text-left  self-start just">
        Don&apos;t have an account?<span className={`${color == "blue" ? "text-blue" :"text-yellow"}`}> { link == "login" ? "Login" : "Sign up"}</span>
      </Link>
      <p className={`${color == "blue" ? "text-blue" :"text-black"} font-poppin-medium self-center `}>- OR -</p>
      <button className="!font-poppin-medium text-sm py-2 flex w-fit  px-4 gap-2 self-center rounded-2xl border-2 border-[#7C838A]">
        <Image
          height={20}
          width={20}
          alt=""
          src="/icons/Google.svg"
          className=" "
        />
        <p>Log in with Google</p>
      </button>
    </div>
  );
}

export default AuthWithGoogle;
