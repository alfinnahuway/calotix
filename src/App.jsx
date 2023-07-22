import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
// import { Helmet } from "react-helmet";
import { Helmet, HelmetProvider } from 'react-helmet-async';
function App() {
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Calo Tiket - Proyek Konser Tiket</title>
          <link
            rel="canonical"
            href="https://calo-tix.netlify.app/"
          />
          <meta
            name="description"
            content="CaloTix adalah platform berbasis web untuk memesan tiket di konser artis kesayanganmu."
          />
        </Helmet>
        <Routes>
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </HelmetProvider>
    </>
  );
}

export default App;
