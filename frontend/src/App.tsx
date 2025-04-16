import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Loader from "./components/Loader";
import ScrollToTop from "./components/ScrollToTop";
import Header from "./components/Header";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import { userExist, userNotExist } from "./redux/reducer/userReducer";
import { getUser } from "./redux/api/userAPI";
import { UserReducerInitialState } from "./types/reducer-types";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

const Home = lazy(() => import("./pages/Home"));
const Search = lazy(() => import("./pages/Search"));
const Contact = lazy(() => import("./pages/Contact"));
const Cart = lazy(() => import("./pages/Cart"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const Cookies = lazy(() => import("./pages/Cookies"));
const Terms = lazy(() => import("./pages/Terms"));
const SignUp = lazy(() => import("./pages/Login"));
const Orders = lazy(() => import("./pages/Orders"));
const Shipping = lazy(() => import("./pages/Shipping"));
const Dashboard = lazy(() => import("./pages/admin/Dashboard"));

function App() {
  const dispatch = useDispatch();
  const { user, loading } = useSelector(
    (state: { userReducer: UserReducerInitialState }) => state.userReducer
  );

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const data = await getUser(user.uid);
        dispatch(userExist(data.user));
      } else dispatch(userNotExist());
    });
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <Router>
      <ScrollToTop>
        <Header user={user} />
        <Suspense fallback={<Loader />} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/terms-and-conditions" element={<Terms />} />
          <Route path="/cookies" element={<Cookies />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          {/* not logged in  Route */}
          <Route
            path="/login"
            element={
              <ProtectedRoute isAuthenticated={user ? false : true}>
                <SignUp />
              </ProtectedRoute>
            }
          />
          {/* logged in user route */}
          <Route
            element={<ProtectedRoute isAuthenticated={user ? true : false} />}
          >
            <Route path="/shipping" element={<Shipping />} />
            <Route path="/orders" element={<Orders />} />
          </Route>
          {/* admin routes */}
          <Route
            element={
              <ProtectedRoute
                isAuthenticated={user ? true : false}
                adminOnly={true}
                admin={user?.role == "admin" ? true : false}
              />
            }
          >
            <Route path="/admin/dashboard" element={<Dashboard />} />
          </Route>
          {/* admin routes */}
        </Routes>
        <Footer />
      </ScrollToTop>
    </Router>
  );
}

export default App;
