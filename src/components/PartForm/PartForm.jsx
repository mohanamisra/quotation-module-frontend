import React, {useEffect, useState} from 'react';

const PartForm = ({quote}) => {
    const [allQuantities, setAllQuantities] = useState([]);
    const [quoteVersion, setQuoteVersion] = useState(0);

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

    const updateQuote = async (newQuoteObj) => {
        const url = `http://localhost:3000/quotations/${quote._id}`;
        await fetch(url, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newQuoteObj),
        });
        alert("Part Added");
        const newQuoteVersion = quoteVersion + 1;
        setQuoteVersion(newQuoteVersion);
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

        const {_id, currQuote} = quote;

        const updatedQuote = {
            ...currQuote,
            parts: [...quote.parts, newPartObj]
        }
        await updateQuote(updatedQuote);
    }

    useEffect(() => {
        const fetchQuote = async () => {
            const res = await fetch(`http://localhost:3000/quotations/${quote._id}`);
            quote = await res.json();
        };
        fetchQuote();
    }, [quoteVersion])

    return (
        <form className="space-y-4">
            <div>
                <label>Part Name</label>
                <input type="text" value={inputPartName} onChange={e => setInputPartName(e.target.value)}/>
            </div>
            <div>
                <label>MOQ</label>
                <input type="number" value={inputMoq} onChange={e => setInputMoq(e.target.value)}/>
            </div>
            <div>
                <label>Quantity</label>
                <input type="number" value={inputQty} onChange={e => setInputQty(e.target.value)}/>
                <label>Price</label>
                <input type="number" value={inputPrice} onChange={e => setInputPrice(e.target.value)}/>
                <button onClick={e => {handleAddPrice(e)}}>Add Price</button>
            </div>
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
                            return(
                                <tr key = {index}>
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
            <button onClick={e=> handleAddPart(e)}>Save</button>
        </form>
    );
};

export default PartForm;
