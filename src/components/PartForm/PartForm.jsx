import React, {useState} from 'react';

// BACKEND URL EXPOSED
// MODIFY IF REQUIRED

const PartForm = ({quote, onQuoteUpdate}) => {
    const [allQuantities, setAllQuantities] = useState([]);

    const [inputPartName, setInputPartName] = useState('');
    const [inputMoq, setInputMoq] = useState('');
    const [inputQty, setInputQty] = useState('');
    const [inputPrice, setInputPrice] = useState('');



    const handleAddPrice = (e) => {
        e.preventDefault();
        const newQuantityObj = {
            "qty": Number(inputQty),
            "unit_price": Number(inputPrice),
        }
        console.log(newQuantityObj);

        setAllQuantities([
            ...allQuantities,
            newQuantityObj,
        ])

        setInputQty('');
        setInputPrice('');
    }

    // RE-RENDERS QUOTE IN THE PARENT COMPONENT (QuotationView COMPONENT)
    const updateQuote = async (newQuoteObj) => {
        const url = `https://quotation-module-backend.onrender.com/quotations/${quote._id}`;
        await fetch(url, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newQuoteObj),
        });
        alert("New Part Added");
        if (onQuoteUpdate) {
            onQuoteUpdate();
        }
        setInputPartName('');
        setInputMoq('');
        setAllQuantities([]);
    }

    const handleAddPart = async (e) => {
        e.preventDefault();
        const newPartObj = {
            "part_name": inputPartName,
            "moq": Number(inputMoq),
            "prices": allQuantities
        }

        // REMOVING _id FIELD FROM CURRENT QUOTE BEFORE CREATING UPDATED QUOTE OBJECT
        // ELSE ERROR WHEN PATCHING IN MONGODB. _id FIELD SHOULD NOT BE PASSED IN PATCH REQUESTS TO MONGODB AS IT IS UNIQUELY SYSTEM-GENERATED.
        const {_id, currQuote} = quote;

        const updatedQuote = {
            ...currQuote,
            parts: [...quote.parts, newPartObj]
        }
        await updateQuote(updatedQuote);
    }

    return (
        <form className="part-form">
            <div className="left">
                <div>
                    <label>Part Name</label>
                    <input type="text" value={inputPartName} onChange={e => setInputPartName(e.target.value)}/>
                </div>
                <div>
                    <label>MOQ</label>
                    <input type="number" value={inputMoq} onChange={e => setInputMoq(e.target.value)}/>
                </div>
                <div className="price-row">
                    <label>Quantity</label>
                    <input type="number" value={inputQty} onChange={e => setInputQty(e.target.value)}/>
                    <label>Price</label>
                    <input type="number" value={inputPrice} onChange={e => setInputPrice(e.target.value)}/>
                    <button onClick={e => {
                        handleAddPrice(e)
                    }}>Add Price
                    </button>
                </div>
                <button onClick={e => handleAddPart(e)}>Save Part</button>
            </div>
            <div className="right">
                <table>
                <thead>
                    <tr>
                        <th>Quantity</th>
                        <th>Price</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        allQuantities.length > 0 ? (
                            allQuantities.map((qty, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{qty.qty}</td>
                                        <td>{qty.unit_price}</td>
                                    </tr>
                                )
                            })
                        ) : (
                            <tr>
                                <td>No prices added...</td>
                            </tr>
                        )
                    }
                    </tbody>
                </table>
            </div>
        </form>
    );
};

export default PartForm;
