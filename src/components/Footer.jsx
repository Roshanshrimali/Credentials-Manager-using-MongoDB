import React from "react";

const Footer = () => {
  return (
    <footer className="bg-cyan-900 flex justify-between px-10 items-center text-white py-2 text-base font-semibold laptop:static fixed bottom-0 w-[100%]">
      <div className="text-xl text-center font-bold">
      <span className="text-xl font-bold">KeepSecret</span>
      </div>
      <div className="flex">Created with{" "}
       <img className="invert" src="/system-solid-48-favorite-heart.svg" alt="love"/>{" "}
        by Roshan
      </div>
    </footer>
  );
};

export default Footer;
