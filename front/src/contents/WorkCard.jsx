import { Button2 } from "./Button";

function WorkCard({ img, title, desc, url }) {
  return (
    <div className=" py-12   flex flex-col justify-center items-center text-center md:text-left md:justify-start md:items-start space-y-7">
      <div className="p-8 bg-emerald-100 rounded-lg flex justify-center items-center space-x-2.5">
        <img className="w-8 h-8" src={img} alt="Icon" />
      </div>
      <div className="">
        <h3 className="text-black text-2xl mb-5 font-semibold ">{title}</h3>
        <p className="text-black text-lg font-normal ">{desc}</p>
      </div>

      <Button2 url={url} />
    </div>
  );
}

export default WorkCard;
