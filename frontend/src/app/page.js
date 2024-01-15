const page = () => {
  return (
    <>
      <div className=" h-screen w-full bg-black flex bottom-0 pb-0 flex-col ">
        <div className="mx-10 md:mx-20 lg:mx-40 mt-20 bg-black text-white">
          <div className="font-manrope text-5xl mb-10 sm:mb-8  sm:text-6xl drop-shadow-2xl">
            Invoice Reminder Automated!
          </div>

          <a href="http://localhost:3000/auth/google">
            <button className="text-sm px-10 py-3  border  md:text-lg">
              {" "}
              Login 
            </button>
          </a>
        </div>
        <div className=" mt-4 mx-12 sm:mx-16  md:mx-20 lg:mx-40 bg-white  ">
          <img src="Group2.png"></img>
        </div>
      </div>
    </>
  );
};

export default page;
