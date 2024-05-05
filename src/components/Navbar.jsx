import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-cyan-900 flex justify-between px-10 items-center text-white w-[100%] sticky top-0 z-10">
      <div className="logo flex items-center p-2 gap-4 cursor-pointer" >
        <img className="w-12" src="./logo.png" alt="logo"/>
        <span className="text-xl font-bold">KeepSecret</span>
      </div>
      <ul className="flex gap-8 items-center">
        <li className="phone:hidden tab:block"><a href="/" className="text-base font-bold hover:text-[#FEA832] transition-all duration-300">Home</a></li>
        <li className="phone:hidden tab:block"><a href="/about" className="text-base font-bold hover:text-[#FEA832] transition-all duration-300">About</a></li>
        <li className="phone:hidden tab:block"><a href="/contact" className="text-base font-bold hover:text-[#FEA832] transition-all duration-300">Contact</a></li>
        <li className="phone:hidden tab:block"><a href="/code" className="text-base font-bold hover:text-[#FEA832] transition-all duration-300">Code</a></li>
        <button className="items-center justify-center flex gap-1 hover:bg-cyan-700  border-2 border-cyan-950 text-white px-2 py-[4px] rounded-xl transition-all duration-300">
          <img className="invert w-8" src="/github-01-stroke-rounded.svg" alt="Github"/>
          <span className="font-bold text-sm">Github</span>
        </button>
      </ul>
    </nav>
  );
};

export default Navbar;
