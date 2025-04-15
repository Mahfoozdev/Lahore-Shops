import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Loader from "./components/Loader";
import Layout from "./Layout";
import ScrollToTop from "./components/ScrollToTop";

const Home = lazy(() => import("./pages/Home"));
const Search = lazy(() => import("./pages/Search"));
const Contact = lazy(() => import("./pages/Contact"));
const Cart = lazy(() => import("./pages/Cart"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const Cookies = lazy(() => import("./pages/Cookies"));
const Terms = lazy(() => import("./pages/Terms"));
const SignUp = lazy(() => import("./pages/Login"));

function App() {
  return (
    <Router>
      <ScrollToTop>
        <Suspense fallback={<Loader />} />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/terms-and-conditions" element={<Terms />} />
            <Route path="/cookies" element={<Cookies />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/log-in" element={<SignUp />} />
          </Route>
        </Routes>
      </ScrollToTop>
    </Router>
  );
}

export default App;
