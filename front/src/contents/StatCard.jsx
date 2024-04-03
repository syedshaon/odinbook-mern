import React from "react";

function StatCard({ imgURL, title, number }) {
  return (
    <div className=" w-42 xl:w-72 h-[180px]   xl:h-[290px] bg-white rounded-[20px] shadow-md flex flex-col items-center justify-center">
      <div className="w-[70px] h-[70px] xl:w-[100px] xl:h-[100px] bg-emerald-100 rounded-[10px] flex justify-center">
        <img src={imgURL} alt={title} />
      </div>
      <p className="text-black my-4 text-3xl font-semibold ">{number}</p>
      <p className="text-black text-base font-medium ">{title}</p>
    </div>
  );
}

export default StatCard;
