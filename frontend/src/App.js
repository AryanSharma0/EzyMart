import { Provider } from "react-redux";
import store from "../src/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import Navbar from "./Component/Navbar";
import SubNav from "./Component/SubNav";
import { BrowserRouter } from "react-router-dom";
import Router from "./Custom_Routes";
import { useEffect, useState } from "react";
import Footer from "./Component/Footer";
function App() {
  let persistor = persistStore(store);
  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Change the limit value based on when you want the scroll bar to become fixed
      const limit = 150;

      if (window.scrollY > limit) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <div className="h-max min-h-screen   w-screen relative  bg-[#f4f5f2]">
            <Navbar isFixed={isFixed} />
            <SubNav />
            {/* Custom Routes */}
            <Router />
            <div className="   absolute bottom-0 w-screen">
              <Footer />
            </div>
          </div>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
