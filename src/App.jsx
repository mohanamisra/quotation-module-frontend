import {BrowserRouter, Routes, Route} from "react-router-dom";
import './App.css'
import AllQuotations from "./pages/AllQuotationsScreen/AllQuotations.jsx";
import AddQuote from "./pages/AddQuoteScreen/AddQuote.jsx";
import QuotationView from "./pages/QuotationViewScreen/QuotationView.jsx";

function App() {

  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<AllQuotations/>}/>
            <Route path="/addquote" element={<AddQuote/>}/>
            <Route path="/quote/:quoteId" element={<QuotationView/>}/>
        </Routes>
    </BrowserRouter>
  )
}

export default App
