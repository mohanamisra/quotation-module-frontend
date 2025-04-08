import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import './AddQuote.css'

// BACKEND URL EXPOSED
// MODIFY IF REQUIRED

const AddQuote = () => {
    const navigate = useNavigate();
    const [client, setClient] = useState('');
    const [expiry, setExpiry] = useState('');
    const [currency, setCurrency] = useState('INR');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const [yyyy, mm, dd] = expiry.split('-');
        const formattedExpiry = `${dd}/${mm}/${yyyy}`;
        const data = {
            client_name: client,
            expiry_date: formattedExpiry,
            currency: currency.toLowerCase(),
            parts:[]
        }

        try {
            await fetch('https://quotation-module-backend.onrender.com/quotations', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data),
            })
                .then(res => res.json())
                .then((newId) => {
                    navigate(`/quote/${newId}`);
                })
        }
        catch(e) {
            console.log(e);
        }
        setClient('');
        setExpiry('');
        alert("Quote Added!");
        // setTimeout(()=> {
        //     navigate(-1);
        // }, 3000);
    }

    return (
        <div>
            <h1>Add Quote</h1>
            <form className="add-quote-form">
                <label>
                    Who is your client? <input required placeholder="John Doe" type="text" value={client} onChange={e => setClient(e.target.value)}/>
                </label>
                <label>
                    When does the quote expire? <input required type="date" value={expiry} onChange = {e => setExpiry(e.target.value)}/>
                </label>
                <label>
                    What system of currency does client follow?
                </label>
                <DropdownMenu.Root>
                    <DropdownMenu.Trigger asChild onFocusCapture={(event) => { event.stopPropagation(); }}>
                        <div
                            role="button"
                            tabIndex={0}
                            className="radix-dropdown-trigger"
                            onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") e.preventDefault();
                            }}
                        >
                            {currency} ⌄
                        </div>
                    </DropdownMenu.Trigger>

                    <DropdownMenu.Content sideOffset={5} className="radix-dropdown-content">
                        <DropdownMenu.Item onSelect={() => setCurrency("INR")}>INR ₹</DropdownMenu.Item>
                        <DropdownMenu.Item onSelect={() => setCurrency("USD")}>USD $</DropdownMenu.Item>
                    </DropdownMenu.Content>
                </DropdownMenu.Root>
                <button onClick={handleSubmit}>Add Quote</button>
            </form>
        </div>
    );
};

export default AddQuote;