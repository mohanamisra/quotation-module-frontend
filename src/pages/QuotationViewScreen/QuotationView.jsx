import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as Dialog from '@radix-ui/react-dialog';
import PartForm from '../../components/PartForm/PartForm.jsx';
import './QuotationView.css'

const QuotationView = () => {
    const { quoteId } = useParams();
    const [quote, setQuote] = useState(null);
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    const refreshQuote = () => {
        setRefreshTrigger(prev => prev + 1);
    };

    useEffect(() => {
        const fetchQuote = async () => {
            const res = await fetch(`http://localhost:3000/quotations/${quoteId}`);
            const data = await res.json();
            setQuote(data);
        };
        fetchQuote();
    }, [quoteId, refreshTrigger]); // Add refreshTrigger to dependency array

    if (!quote) return <p>Loading...</p>;

    const allQuantities = Array.from(
        new Set(quote.parts.flatMap(part => part.prices.map(p => p.qty)))
    ).sort((a, b) => a - b);

    return (
        <div className="quotation-view-container">
            <h1>Quotation Details</h1>
            <p><strong>Client Name:</strong> {quote.client_name}</p>
            <p><strong>Expiry Date:</strong> {quote.expiry_date}</p>
            <p><strong>Currency:</strong> {quote.currency.toUpperCase()}</p>

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
                            const unitPrice = priceObj?.unit_price || 0;
                            return (
                                <td key={qty}>
                                    {unitPrice > 0 ? `₹ ${unitPrice}` : '-'}
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
                            <button>
                                Add Part
                            </button>
                        </Dialog.Trigger>

                        <Dialog.Portal>
                            <Dialog.Overlay className="DialogOverlay"/>
                            <Dialog.Content className="DialogContent" aria-describedby={undefined}>
                                <Dialog.Title>Add Part</Dialog.Title>
                                <PartForm quote={quote} onQuoteUpdate={refreshQuote}/>
                                <Dialog.Close asChild>
                                    <button aria-label="Close">
                                        ×
                                    </button>
                                </Dialog.Close>
                            </Dialog.Content>
                        </Dialog.Portal>
                    </Dialog.Root>
                </div>
                <button className="pdf-button">Download PDF</button>
            </div>
        </div>
    );
};

export default QuotationView;
