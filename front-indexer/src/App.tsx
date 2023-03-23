import Navbar from "@/scenes/navbar";
import Home from "@/scenes/home";
import SignIn from "@/scenes/signIn";
import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  BrowserRouter,
} from "react-router-dom";
import ReactDOM from "react-dom";
import Register from "./scenes/register";
import Subscription from "./scenes/subscription";
import ContactUs from "./scenes/contactUs";
import Benefits from "./scenes/benefits";

function App() {
  // const [selectedPage, setSelectedPage] = useState<SelectedPage>(
  //   SelectedPage.Home
  // );
  const [isTopOfPage, setIsTopOfPage] = useState<boolean>(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0) {
        setIsTopOfPage(true);
        // setSelectedPage(SelectedPage.Home);
      }
      if (window.scrollY !== 0) setIsTopOfPage(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="app bg-gray-20" text-blue-600>
      <Navbar
        isTopOfPage={isTopOfPage}
        // selectedPage={selectedPage}
        // setSelectedPage={setSelectedPage}
      />

      <BrowserRouter>
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route index path="/" element={<Benefits />} />
          <Route index path="/subscription" element={<Subscription />} />
          <Route index path="/contact" element={<ContactUs />} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
