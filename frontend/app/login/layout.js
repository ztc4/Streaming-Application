

export const metadata = {
  title: "Login",
  description: "Landing Page of the Streaming Application",
};

export default function Layout({ children }) {
  return (

      <div className="h-screen  bg-[#F8F8F8] w-screen overflow-hidden flex">
        <div className=" h-full bg-red-500 bg-no-repeat bg-cover w-[40%] sm2:hidden bg-[url('/images/Login.png')]"></div>
        <div className="bg-full w-[65%] px-8 sm:px-40 sm2:w-full h-full absolute right-0 flex flex-col justify-center items-center bg-[#F8F8F8] z-10 rounded-l-2xl">
            {children}
        </div>
      </div>
  );
}
