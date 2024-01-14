const Navbar = () => {
  return (
    <>
      <nav className="bg-black p-4">
        <div className="container mx-auto flex items-center justify-between">
          <a href="#" className="text-white text-lg font-bold">
            Zap
          </a>

          <a href="http://localhost:3000/logout">
            <button className="bg-black  text-white px-4 py-2  border rounded-md">
              Logout
            </button>
          </a>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
