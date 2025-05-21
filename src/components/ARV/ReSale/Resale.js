import React, { useState } from 'react';
import { CiCirclePlus } from "react-icons/ci";
import '../../Calculations/SowRight';
import './ReSale.css';
import { MdExpandMore, MdExpandLess } from "react-icons/md";

const Resale = ({ grandTotal }) => {
    const [items, setItems] = useState([]);
    const [name, setName] = useState('');
    const [value, setValue] = useState('');

    const handleAddItem = () => {
        const numericValue = parseFloat(value);
        if (!name.trim() || isNaN(numericValue)) return;

        setItems([...items, { name, value: numericValue }]);
        setName('');
        setValue('');
    };

    const formatCurrency = (value) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        }).format(value);
    };


    const total = items.reduce((sum, item) => sum + item.value, 0);
    const cleanedGrandTotal = Number(String(grandTotal).replace(/[^0-9.-]+/g, ''));
    const cleanedTotal = Number(total);

    const result = (cleanedGrandTotal - cleanedTotal).toFixed(2);

    return (
        <div className="p-4 max-w-md mx-auto">

            {/* <h1 className="text-xl font-bold mb-4">Add Items with Values</h1> */}
            <div className="flex flex-col gap-8 mb-4">
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Item name"
                    className="border border-gray-300 p-2 rounded"
                />
                <input
                    type="number"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="Item value"
                    className="border border-gray-300 p-2 rounded"
                />
                <button
                    className="button-reset"
                    onClick={handleAddItem}>
                    <CiCirclePlus size={25} className="addCircle" />
                </button>
            </div>
            {items.map((item, index) => (
                <div className="tooltip-container" key={index}>
                    <div className="amount-title">{item.name}</div>
                    <div className="amount-container">{formatCurrency(item.value)}</div>
                </div>
            ))}

            <div className="tooltip-container ">
                <div className="amount-title">Remaining</div>
                <div className="amount-container">{formatCurrency(result)}</div>
            </div>

        </div>
    );
};

export default Resale;
