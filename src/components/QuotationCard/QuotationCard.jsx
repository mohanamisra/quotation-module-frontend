import React, {useState, useEffect} from 'react';

const QuotationCard = ({client_name, expiry_date}) => {
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
            <p>Expired: {expired ? "Expired" : "Valid"}</p>
            <button>View Quotation</button>
        </div>
    );
};

export default QuotationCard;