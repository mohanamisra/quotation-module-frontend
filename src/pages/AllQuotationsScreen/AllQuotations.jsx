import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import './AllQuotations.css'
import QuotationCard from '../../components/QuotationCard/QuotationCard.jsx'

const AllQuotations = () => {
    const navigate = useNavigate();

    const navigateToAddQuote = () => {
        navigate('/addquote')
    }

    const [allQuotations, setAllQuotations] = useState([])

    const url = "http://localhost:3000/quotations"

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
                        <QuotationCard client_name={quotation.client_name} expiry_date={quotation.expiry_date} key={index} />
                    )
                })}
            </div>
            <button onClick={navigateToAddQuote}>Add Quote</button>
        </div>
    );
};

export default AllQuotations;