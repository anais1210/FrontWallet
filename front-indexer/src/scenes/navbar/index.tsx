import { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import Logo from "@/assets/Logo.png";
import { ethers } from "ethers";
import useMediaQuery from "@/hooks/useMediaQuery";
declare var window: any;

type Props = {
  isTopOfPage: boolean;
};

const Navbar = ({ isTopOfPage }: Props) => {
  const flexBetween = "flex items-center justify-between";
  const [isMenuToggled, setIsMenuToggled] = useState<boolean>(false);
  const isAboveMediumScreens = useMediaQuery("(min-width: 850px)");
  const navbarBackground = isTopOfPage ? "" : "bg-primary-100 drop-shadow";
  const [walletAddress, setWalletAddress] = useState("");

  async function requestAccount() {
    console.log("Requesting account...");

    if (window.ethereum) {
      console.log("detected");

      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setWalletAddress(accounts[0]);
      } catch (error) {
        console.log("Error connecting...");
      }
    } else {
      alert("Meta Mask not detected");
    }
  }
  // Check if metamask is detected

  return (
    <nav>
      <div
        className={`${navbarBackground} ${flexBetween} fixed top-0 z-30 w-full py-6`}
      >
        <div className={`${flexBetween} mx-auto w-5/6`}>
          <div className={`${flexBetween} w-full gap-16`}>
            {/* LEFT SIDE */}
            <a href="/">
              <img alt="logo" src={Logo} className="h-11 w-auto" />
            </a>

            {isAboveMediumScreens ? (
              <div className={`${flexBetween} w-full`}>
                <div className={`${flexBetween} text-md gap-8`}></div>
                {/* RIGHT SIDE */}
                <div className={`${flexBetween} gap-8`}>
                  <a
                    href="/signIn"
                    className="transition hover:text-primary-300 "
                  >
                    Sign In
                  </a>
                  <a
                    href="/subscription"
                    className="rounded-md bg-secondary-500 px-10 py-2 hover:bg-primary-500 hover:text-white"
                  >
                    Become a Member
                  </a>
                </div>
              </div>
            ) : (
              <button
                className="rounded-full bg-secondary-500 p-2"
                onClick={() => setIsMenuToggled(!isMenuToggled)}
              >
                <Bars3Icon className="h-6 w-6 text-white" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* MOBILE MENU MODAL*/}
      {!isAboveMediumScreens && isMenuToggled && (
        <div className="fixed right-0 bottom-0 z-40 h-full w-[300px] bg-primary-100 drop-shadow-xl">
          {/* CLOSE ICON */}
          <div className="flex justify-end p-12">
            <button onClick={() => setIsMenuToggled(!isMenuToggled)}>
              <XMarkIcon className="h-6 w-6 text-gray-400" />
            </button>
          </div>
          {/* MENU ITEMS */}
          <div className="ml-[25%] flex flex-col gap-10 text-2xl">
            <a className=" hover:text-white" onClick={requestAccount}>
              Sign In
            </a>
            <a className=" hover:text-white" href="/subscription">
              Become a Member
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
