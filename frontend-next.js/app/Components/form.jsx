import Input from "@/app/Components/input";

function Form({ children, data, handleClick, handleChange,form,color ="blue" }) {
  const { title, input, button} = data;

 
  return (
    <>
      <h1 className="font-poppin-medium sm2:mb-2  mb-8 text-4xl text-center ">
        {title}
      </h1>

      <fieldset className="grid grid-cols-5 gap-5 w-full">
        {input && input.map((_) => (
          <Input
            key={_.field}
            placeholder={_.placeholder}
            field={_.field}
            label={_.label}
            span={_.span}
            value={form[_.field]}
            handleChange={handleChange}
            color={color == "blue" ? "blue" : "yellow" }
          />
        ))}

        <button
        onClick={handleClick}
          type="button"
          className={`${color == "blue" ? "bg-blue text-white" :"bg-yellow text-black"} self-center col-span-6 w-full font-poppin-medium  sm:w-5/12 rounded-md mx-auto h-10 sm:h-12`}
        >
          {button || "Lorem"}
        </button>
      </fieldset>
      {children}
    </>
  );
}

export default Form;
