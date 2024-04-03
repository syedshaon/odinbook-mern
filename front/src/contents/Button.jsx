const Button = ({ text, color, hoverBG }) => {
  return <button className={`h-11 p-2.5 cursor-pointer transition duration-200   ease ${hoverBG === "emerald" ? "hover:text-white border hover:border-white hover:bg-emerald-500" : "hover:text-emerald-500 hover:bg-white hover:border hover:border-emerald-500"}   ${color === "emerald" ? "text-white bg-emerald-500" : "text-black border border-emerald-500"} rounded-10px rounded min-w-[93px]  mx-2 text-base font-medium `}>{text}</button>;
};

export const Button2 = ({ url }) => {
  return (
    <a href={url} className="min-h-11 px-4 py-2 md:p-2.5 cursor-pointer rounded text-sm md:text-lg   ring-2  text-emerald-500     hover:text-white   hover:bg-emerald-500 ring-emerald-500">
      Learn More &nbsp; <span className="text-xl">→</span>
    </a>
  );
};

export const Button3 = ({ text, color, hoverBG }) => {
  return <button className={`h-11 p-2.5 cursor-pointer transition duration-200   ease ${hoverBG === "orange" ? "hover:text-white border hover:border-white hover:bg-orange-500" : "hover:text-orange-500 hover:bg-white hover:border hover:border-orange-500"}   ${color === "orange" ? "text-white bg-orange-500" : "text-black border border-orange-500"} rounded-10px rounded min-w-[93px]  mx-2 text-base font-medium `}>{text}</button>;
};

export default Button;
