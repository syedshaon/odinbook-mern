function Section_Intro({ title, sub }) {
  return (
    <div className="heading  text-center md:text-left">
      <h3 className="text-green-500 text-xl font-medium  uppercase">{title}</h3>
      <h4 className=" my-5 lg:w-4/12 mx-auto md:mx-0 text-black text-3xl font-semibold ">{sub}</h4>
    </div>
  );
}

export default Section_Intro;
