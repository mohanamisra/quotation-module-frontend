import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

const QuotationCard = ({quotation}) => {
    const {_id, client_name, expiry_date} = quotation;
    const [expired, setExpired] = useState(false);

    useEffect(() => {
        const expiryParts = expiry_date.split('/');
        const expiry = new Date(`${expiryParts[2]}-${expiryParts[1]}-${expiryParts[0]}`);
        const today = new Date();

        setExpired(expiry < today);
    }, [expiry_date]);

    return (
        <div className="quotation-card-container">
            <p>Client Name: {client_name}</p>
            <p>Status: {expired ? "Expired" : "Valid"}</p>
            <div className = "quotation-buttons">
                <Link to={`/quote/${_id}`}>
                    <button type = "button">View Quotation</button>
                </Link>
                <button className = "delete-quotation">
                    Delete Quotation
                </button>
            </div>
        </div>
    );
};

export default QuotationCard;