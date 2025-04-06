import React, {useState, useEffect} from 'react';

const PartForm = ({quote}) => {
    const [partName, setPartName] = useState('');
    const [inputVal, setInputVal] = useState('');
    const [allQuantities, setAllQuantities] = useState([]);

    const handleAddPrice = (e) => {
        e.preventDefault();
        setPartName(inputVal);
        setAllQuantities(Array.from(
            quote.parts.find(part => part.part_name === partName).prices
        ));
    }

    // useEffect(() => {
    //
    // }, [partName])

    return (
        <form className="space-y-4">
            <div>
                <label>Part Name</label>
                <input type="text" value={inputVal} onChange={e => setInputVal(e.target.value)}/>
            </div>
            <div>
                <label>MOQ</label>
                <input type="number"/>
            </div>
            <div>
                <label>Quantity</label>
                <input type="number"/>
                <label>Price</label>
                <input type="number"/>
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
            <button type="submit">Save</button>
        </form>
    );
};

export default PartForm;
