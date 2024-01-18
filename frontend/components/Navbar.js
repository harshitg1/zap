const Navbar = () => {
  return (
    <>
      <div className="bg-black p-4">
        <div className=" flex px-10 items-center justify-between">
          <a href="#" className="text-white text-2xl font-bold">
            Zap
          </a>

          <a href="http://localhost:3000/logout">
            <button className="bg-black  text-white px-4 py-2  border rounded-md">
              Logout
            </button>
          </a>
        </div>
      </div>
    </>
  );
};

export default Navbar;
