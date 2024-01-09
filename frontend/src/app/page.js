const page = () => {
  return (
    <>
      <div className=" h-full w-full bg-black flex flex-col ">
        <div className="mx-40 mt-20 mb-9 text-7xl  bg-black text-white">
          <div className="font-manrope drop-shadow-2xl">
            Invoice Reminder Automated!
          </div>
          <div>
            <a href="http://localhost:3000/auth/google">
              <button className="text-lg p-4 border"> Login with Google </button>
            </a>
          </div>
        </div>
        <div className=" mx-40 bg-white   text-red-500 border">
          <img src="Group2.png"></img>
        
        </div>
      </div>
    </>
  );
};

export default page;
