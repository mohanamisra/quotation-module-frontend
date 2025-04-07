import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import './AllQuotations.css'
import QuotationCard from '../../components/QuotationCard/QuotationCard.jsx'

// CURRENTLY EXPOSED BACKEND URL
// MODIFY IF REQUIRED

const AllQuotations = () => {
    const navigate = useNavigate();

    // TO ADD A NEW QUOTE
    const navigateToAddQuote = () => {
        navigate('/addquote')
    }

    const [allQuotations, setAllQuotations] = useState([])

    const url = "https://quotation-module-backend.onrender.com/quotations"

    const fetchAllQuotations = async () => {
        const res = await fetch(url)
        const data = await res.json()
        setAllQuotations(data)
    }

    useEffect(() => {
        fetchAllQuotations();
    }, [])

    return (
        <div className="all-quotations-page">
            <h1>All Quotes</h1>
            <div className="all-quotations-container">
                {allQuotations.map((quotation, index) => {
                    return (
                        <QuotationCard quotation={quotation} key={index} />
                    )
                })}
            </div>
            <button onClick={navigateToAddQuote}>Add Quote</button>
        </div>
    );
};

export default AllQuotations;