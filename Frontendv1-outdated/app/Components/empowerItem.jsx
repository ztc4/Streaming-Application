


function EmpowerItem({number = 1 ,header = "Create Your Account", paragraph = "Unlock the Power to Support Fellow Users: Create Your Account Today."}) {
    return ( 
        <div  className="flex gap-8 pl-4 min-h-fit py-4 min-w-fit flex-row">
              <div className="bg-orange  size-10 2xl:size-14 rounded-full min-w-fit flex justify-center items-center text-white">
                <p className="w-10 h-10 flex justify-center items-center ">{number}</p>
              </div>
              <div className=" flex flex-col min-hit gap-2">
                <p className="h-10 text-xl 2xl:text-3xl font-poppin-semibold">{header}</p>
                <p className="font-poppin-medium text-[#161C2D] dark:text-white 2xl:text-xl text-opacity-70">
                  {paragraph}
                </p>
              </div>
            </div>
     );
}


export default EmpowerItem;