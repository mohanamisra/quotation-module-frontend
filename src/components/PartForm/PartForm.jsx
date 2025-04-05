import React from 'react';

const PartForm = () => {
    return (
        <form className="space-y-4">
            <div>
                <label>Part Name</label>
                <input type="text" className="border rounded px-2 py-1 w-full" />
            </div>
            <div>
                <label>MOQ</label>
                <input type="number" className="border rounded px-2 py-1 w-full" />
            </div>
            {/* Add inputs for price tiers if needed */}
            <button type="submit" className="bg-black text-white px-4 py-2 rounded">Save</button>
        </form>
    );
};

export default PartForm;
