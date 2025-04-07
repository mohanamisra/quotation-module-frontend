import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as Dialog from '@radix-ui/react-dialog';
import PartForm from '../../components/PartForm/PartForm.jsx';
import './QuotationView.css'
import html2pdf from "html2pdf.js";
import refreshIcon from "../../assets/refresh.png"

// BACKEND URL EXPOSED
// MODIFY IF REQUIRED

const QuotationView = () => {
    const { quoteId } = useParams();
    const [quote, setQuote] = useState(null);
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    const [exchangeRate, setExchangeRate] = useState(null);
    const [displayMode, setDisplayMode] = useState('original');

    // HANDLES RE-RENDERING OF THE QUOTE IN 2 SCENARIOS
    // 1. IF PART IS ADDED, QUOTE IS RE-RENDERED TO SHOW TABLE WITH NEW PART
    // 2. IF CURRENCY IS CHANGED, QUOTE IS RE-RENDERED TO SHOW TABLE WITH CHANGED CURRENCY

    const refreshQuote = async () => {
        if (!exchangeRate) {
            const res = await fetch('https://quotation-module-backend.onrender.com/currency/rates');
            const data = await res.json();
            setExchangeRate(data.rate);
        }

        setDisplayMode(prev => prev === 'original' ? 'converted' : 'original');

        setRefreshTrigger(prev => prev + 1);
    };

    useEffect(() => {
        const fetchQuote = async () => {
            const res = await fetch(`https://quotation-module-backend.onrender.com/quotations/${quoteId}`);
            const data = await res.json();
            setQuote(data);
        };
        fetchQuote();

        const fetchExchangeRate = async () => {
            const res = await fetch('https://quotation-module-backend.onrender.com/currency/rates');
            const data = await res.json();
            setExchangeRate(data.rate);
        };
        fetchExchangeRate();

    }, [quoteId, refreshTrigger]);

    if (!quote) return <p>Loading...</p>;

    const allQuantities = Array.from(
        new Set(quote.parts.flatMap(part => part.prices.map(p => p.qty)))
    ).sort((a, b) => a - b);

    // html2pdf HANDLES GENERATION OF QUOTATION PDF FOR DOWNLOAD
    const handleDownloadPDF = () => {
        const quotation = document.getElementById("quotation")
        html2pdf(quotation, {
            // PASS PARAMETERS TO MODIFY THE GENERATED PDF. REFER html2pdf DOCS.
            margin: 10,
            filename: 'quotation.pdf',
        });
    }

    const isOriginalCurrency = displayMode === 'original';
    const originalCurrency = quote.currency.toLowerCase();
    const alternateCurrency = originalCurrency === 'inr' ? 'usd' : 'inr';
    const displayCurrency = isOriginalCurrency ? originalCurrency : alternateCurrency;

    const getCurrencySymbol = (currency) => {
        return currency.toLowerCase() === 'inr' ? '₹' : '$';
    };

    const convertPrice = (price) => {
        if (!exchangeRate || price <= 0) return price;

        if (isOriginalCurrency) return price;

        if (originalCurrency === 'inr') {
            return (price / parseFloat(exchangeRate)).toFixed(2);
        } else {
            return (price * parseFloat(exchangeRate)).toFixed(2);
        }
    };

    return (
        <div className="quotation-view-container" id="quotation">
            <h1>Quotation Details</h1>
            <p><strong>Client Name:</strong> {quote.client_name}</p>
            <p><strong>Expiry Date:</strong> {quote.expiry_date}</p>
            <p className="currency-row"><strong>Currency:</strong> {displayCurrency.toUpperCase()}
                <button className="refresh-button" onClick={refreshQuote} data-html2canvas-ignore>
                    <img src={refreshIcon} alt="refresh icon" width={"16px"}/>
                </button>
            </p>

            <h2>Part Details (as per RFQ)</h2>
            <table border="1" cellPadding="10">
                <thead>
                <tr>
                    <th>Part Name</th>
                    <th>MOQ</th>
                    {allQuantities.map(qty => (
                        <th key={qty}>Unit Price ({qty} Qty)</th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {quote.parts.map((part, idx) => (
                    <tr key={idx}>
                        <td>{part.part_name}</td>
                        <td>{part.moq}</td>
                        {allQuantities.map(qty => {
                            const priceObj = part.prices.find(p => p.qty === qty);
                            let unitPrice = priceObj?.unit_price || 0;
                            const displayPrice = convertPrice(unitPrice);
                            const symbol = getCurrencySymbol(displayCurrency);

                            return (
                                <td key={qty}>
                                    {unitPrice > 0 ? `${symbol} ${displayPrice}` : '-'}
                                </td>
                            );
                        })}
                    </tr>
                ))}
                </tbody>
            </table>
            <div className="bottom-buttons">
                <div className="dialog-box">
                    <Dialog.Root className="DialogRoot">
                        <Dialog.Trigger asChild>
                            <button data-html2canvas-ignore>
                                Add Part
                            </button>
                        </Dialog.Trigger>

                        <Dialog.Portal>
                            <Dialog.Overlay className="DialogOverlay"/>
                            <Dialog.Content className="DialogContent" aria-describedby={undefined}>
                                <Dialog.Title>Add Part</Dialog.Title>
                                <PartForm quote={quote} onQuoteUpdate={() => setRefreshTrigger(prev => prev + 1)}/>
                                <Dialog.Close asChild>
                                    <button aria-label="Close">
                                        ×
                                    </button>
                                </Dialog.Close>
                            </Dialog.Content>
                        </Dialog.Portal>
                    </Dialog.Root>
                </div>
                <button className="pdf-button" data-html2canvas-ignore onClick={handleDownloadPDF}>Download PDF</button>
            </div>
        </div>
    );
};

export default QuotationView;