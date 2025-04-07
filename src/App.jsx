import {BrowserRouter, Routes, Route} from "react-router-dom";
import AllQuotations from "./pages/AllQuotationsScreen/AllQuotations.jsx";
import AddQuote from "./pages/AddQuoteScreen/AddQuote.jsx";
import QuotationView from "./pages/QuotationViewScreen/QuotationView.jsx";

// PROVIDING ROUTES TO CERTAIN PAGES
// NO AUTHORISATION TO ACCESS QUOTES IMPLEMENTED **YET** DUE TO NATURE OF PRODUCT

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
