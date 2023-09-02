import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import { Helmet, HelmetProvider } from "react-helmet-async";
import DetailEvent from "./pages/Detail.Event";
import LoginForm from "./pages/login";
import RegisterForm from "./pages/register";
import CheckoutTickets from "./pages/Checkout.Tickets";
import ScrollToTop from "./utils/components/ScrollToTop";
import ProtectedRoute from "./utils/protectedRoute";
import Payment from "./pages/Payment";
import { ProtectRoutes } from "./hooks/protectedRoutes";
import { useAuth } from "./hooks/auth";
import Transaction from "./pages/Transaction";

function App() {
  const { token } = useAuth();
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Calo Tiket - Proyek Konser Tiket</title>
          <link rel="canonical" href="https://calo-tix.netlify.app/" />
          <meta
            name="description"
            content="CaloTix adalah platform berbasis web untuk memesan tiket di konser artis kesayanganmu."
          />
        </Helmet>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/detail/:id" element={<DetailEvent />} />
          <Route path="/transaction" element={<Transaction />} />
          <Route element={<ProtectRoutes />}>
            <Route path="/transaction/:orderId/payment" element={<Payment />} />
          </Route>
          <Route
            path="/checkout-tickets"
            element={
              <ProtectedRoute redirect="/">
                <CheckoutTickets />
              </ProtectedRoute>
            }
          />

          {token ? (
            <Route
              path="/login"
              element={<Navigate to="/" />} // Jika sudah login, arahkan ke halaman utama
            />
          ) : (
            <Route path="/login" element={<LoginForm />} />
          )}

          <Route path="/register" element={<RegisterForm />} />
        </Routes>
      </HelmetProvider>
    </>
  );
}

export default App;
