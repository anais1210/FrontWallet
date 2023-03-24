import { useEffect, useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import Logo from "@/assets/Logo.png";
import { ethers } from "ethers";
import useMediaQuery from "@/hooks/useMediaQuery";
import Web3Modal from "web3modal";
import { providerOptions } from "@/shared/ProviderOptions";
import { Tooltip, Text, HStack, Button } from "@chakra-ui/react";
import { truncateAddress } from "@/shared/utils";

type Props = {
  isTopOfPage: boolean;
};
const web3Modal = new Web3Modal({
  cacheProvider: true, // optional
  providerOptions, // required
});

const Navbar = ({ isTopOfPage }: Props) => {
  const flexBetween = "flex items-center justify-between";
  const [isMenuToggled, setIsMenuToggled] = useState<boolean>(false);
  const isAboveMediumScreens = useMediaQuery("(min-width: 850px)");
  const navbarBackground = isTopOfPage ? "" : "bg-primary-100 drop-shadow";
  const [provider, setProvider] = useState<any>();
  const [library, setLibrary] = useState<any>();
  const [account, setAccount] = useState<string>();
  const [chainId, setChainId] = useState<Number>();
  const [network, setNetwork] = useState<string>();

  async function connectWallet() {
    try {
      const provider = await web3Modal.connect();
      const library = new ethers.providers.Web3Provider(provider);
      const accounts = await library.listAccounts();
      const network = await library.getNetwork();
      setProvider(provider);
      setLibrary(library);
      if (accounts) setAccount(accounts[0]);
      setChainId(network.chainId);
    } catch (error) {
      console.log(error);
    }
  }
  const refreshState = () => {
    setAccount(account);
    setChainId(chainId);
    // setNetwork("");
    // setMessage("");
    // setSignature("");
    // setVerified(undefined);
  };

  const disconnect = async () => {
    await web3Modal.clearCachedProvider();
    refreshState();
  };
  useEffect(() => {
    if (provider?.on) {
      const handleAccountsChanged = (accounts: string) => {
        console.log("accountsChanged", accounts);
        if (accounts) setAccount(accounts[0]);
      };

      const handleChainChanged = (_hexChainId: Number) => {
        setChainId(_hexChainId);
      };

      const handleDisconnect = () => {
        console.log("disconnect");
        disconnect();
      };

      provider.on("accountsChanged", handleAccountsChanged);
      provider.on("chainChanged", handleChainChanged);
      provider.on("disconnect", handleDisconnect);

      return () => {
        if (provider.removeListener) {
          provider.removeListener("accountsChanged", handleAccountsChanged);
          provider.removeListener("chainChanged", handleChainChanged);
          provider.removeListener("disconnect", handleDisconnect);
        }
      };
    }
  }, [provider]);
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
                  <HStack>
                    {!account ? (
                      <Button onClick={connectWallet}>Connect Wallet</Button>
                    ) : (
                      <div>
                        <Tooltip label={account} placement="right">
                          <Text>{`Account: ${truncateAddress(account)}`}</Text>
                        </Tooltip>
                        <Button onClick={disconnect}>Disconnect</Button>
                      </div>
                    )}
                  </HStack>
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
            <a className=" hover:text-white" onClick={connectWallet}>
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
