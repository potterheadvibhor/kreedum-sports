import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyle from "./components/common/GlobalStyle";
import HomePage from "./pages/HomePage";
import QuotePage from "./pages/QuotePage";

export default function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/quote" element={<QuotePage />} />
      </Routes>
    </BrowserRouter>
  );
}
