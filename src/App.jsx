import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import { Helmet, HelmetProvider } from "react-helmet-async";
import DetailEvent from "./pages/Detail.Event";
import LoginForm from "./pages/login";
import RegisterForm from "./pages/register";

function App() {
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
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/detail/:id" element={<DetailEvent />} />
          <Route path="/login/" element={<LoginForm />} />
          <Route path="/register/" element={<RegisterForm />} />
        </Routes>
      </HelmetProvider>
    </>
  );
}

export default App;
