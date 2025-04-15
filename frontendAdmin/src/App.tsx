import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Loader from "./components/Loader";
const Costumers = lazy(() => import("./pages/Costumers"));
const Transaction = lazy(() => import("./pages/Transaction"));
const Products = lazy(() => import("./pages/Products"));
const Dashboard = lazy(() => import("./pages/Dashboard"));

const App = () => {
  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/products" element={<Products />} />
          <Route path="/admin/transaction" element={<Transaction />} />
          <Route path="/admin/costumers" element={<Costumers />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
