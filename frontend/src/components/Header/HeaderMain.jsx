import React from "react";
import { Link } from "react-router-dom";
import { BsPlusCircle, BsPencilFill } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { HiHome } from "react-icons/hi";
import { FaHistory } from "react-icons/fa";
import { BiLogOutCircle } from "react-icons/bi";
import { GrClose } from "react-icons/gr";
import { useState } from "react";
import ModalEditBudget from "../Modals/ModalEditBudget";

/*
  Header of the application with the user's profile picture, the user's budget and the navigation bar.
  @param money: String. User's budget
  @param img: String. User's profile picture
  @param logOut: Function. Function to log out the user
  @returns {Object} - Header of the application
*/
const Header = ({ money, img, logOut }) => {

  // State to know if the user is on a mobile device
  const [isMovile, setIsMovile] = useState(false);
  const [viewModal, setViewModal] = useState(false);

  return (
    
    <header className="">
      <nav className="flex items-center justify-between relative">
        <div className="flex items-center justify-between container mx-auto relative p-5 ">
          <div className="flex flex-col md:flex-row items-center gap-2">
            <Link to="/home/profile">
              <div className="h-14 w-14 md:h-20 md:w-20 overflow-hidden shadow-2xl border-2 border-orange-500 rounded-full active:bg-black">
                {img === "img" || img == undefined ? (
                  <div className="relative">
                    {/* Default user image icon*/}
                    <img
                      src="https://res.cloudinary.com/dkxm9njd6/image/upload/v1656799468/user_fjmynn.png"
                      alt=""
                      className="object-cover"
                    />
                    {/* Edit user image icon*/}
                    <div className="absolute md:text-2xl top-7 right-1 md:top-10 md:right-1 text-stone-900">
                      <BsPencilFill />
                    </div>
                  </div>
                ) : (
                  <img src={img.url} alt="" className="object-cover" />
                )}
              </div>
            </Link>
            {/*} User budget and edit user budget icon*/}
            <div
              onClick={() => setViewModal(true)}
              className="flex items-center mb-4 md:mb-0 gap-2 text-sm md:text-xl font-semibold bg-slate-100 shadow-lg p-2 border-2 border-black rounded-3xl"
            >
              <p>  My Budget:</p>
              {money?.startsWith("-") ? (
                <h2 className="text-red-600 font-bold">${money}</h2>
              ) : (
                <h2 className="font-bold text-green-700">${money}</h2>
              )}
              <button
                onClick={() => setViewModal(true)}
                className="text-indigo-500 font-bold text-xl md:text-2xl cursor-pointer hover:text-indigo-700 md:hover:text-3xl transistion duration-300 ease-in-out"
              >
                {/* Edit user budget*/}
                <BsPlusCircle />
              </button>
            </div>
          </div>
          <div className="hidden md:flex md:flex-row items-center gap-5 font-semibold mt-10 md:mt-0 text-2xl md:text-base">
            <Link
              to="/home"
              className="hover:text-gray-500 focus:text-gray-500 hover:underline focus:underline"
            >
              Home
            </Link>
            <Link
              className="hover:text-gray-500 focus:text-gray-500 hover:underline focus:underline"
              to="/home/transactions"
            >
              History
              {/* Log out button */}
            </Link>
            <button
              className="p-2 bg-red-600 text-white rounded-2xl shadow-md hover:shadow-lg hover:bg-red-500 transition duration-200 ease-in-out"
              onClick={() => logOut()}
            >
              Log out
            </button>
          </div>
        </div>
        {/* Navbar mobile*/}
        <button
          className="px-8 text-2xl md:hidden absolute top-10 right-0"
          onClick={() => setIsMovile(true)}
        >
          {" "}
          {/* Hamburger menu icon for mobile */}
          <GiHamburgerMenu />
        </button>
        {isMovile && (
          <div className="md:hidden fixed top-0 right-0 w-1/4">
            <div className=" bg-slate-800 text-gray-200 p-5 w-full absolute top-0 right-0 text-md h-screen">
              <button
                className="py-5 px-5 text-2xl font-bold text-cyan-300"
                onClick={() => setIsMovile(false)}
              >
               X
              </button>
              {/* Navigation bar for mobile */}
              <div className="flex flex-col items-center gap-12 pt-12">
                <Link
                  to="/home"
                  className="flex gap-2 items-center text-cyan-300"
                  onClick={() => setIsMovile(false)}
                >
                  <p className="text-2xl">
                    <HiHome />
                  </p>
                  Home
                </Link>
                <Link
                  to="/home/transactions"
                  className="flex gap-2 items-center text-cyan-300"
                  onClick={() => setIsMovile(false)}
                >
                  // History button
                  <p className="text-2xl ">
                    <FaHistory />
                  </p>
                  History
                </Link>
                <button
                  className="py-2 px-4 bg-red-600 text-white rounded-3xl flex gap-2 items-center hover:bg-red-500 duration-200 border-b-2 border border-cyan-300 focus:border-none"
                  onClick={() => logOut()}
                >
                  <p className="text-2xl">
                    <BiLogOutCircle />
                  </p>
                  Log out
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
      {viewModal && <ModalEditBudget setViewModal={setViewModal} />}
    </header>
  );
};

export default Header;
