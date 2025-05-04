import React, { useState } from 'react';
import "./Arv.css";
import "../Form.css"

export default function ArvCalculator({
    avgPrice,
    setAvgPrice,
    avgSalePrice,
    setAvgSalePrice
}) {
    const [inputs, setInputs] = useState([
        { address: '', sqFt: '', salePrice: '' }
    ]);
    const [avgSqFt, setAvgSqFt] = useState(null);

    const handleChange = (index, field, value) => {
        const updatedInputs = [...inputs];
        updatedInputs[index][field] = value;
        setInputs(updatedInputs);
    };

    const handleAddInput = () => {
        setInputs([...inputs, { address: '', sqFt: '', salePrice: '' }]);
    };

    const calculateAverages = (e) => {
        e.preventDefault();

        const priceValues = inputs
            .map(i => {
                const sale = parseFloat(i.salePrice);
                const sqft = parseFloat(i.sqFt);
                return !isNaN(sale) && !isNaN(sqft) && sqft > 0 ? sale / sqft : null;
            })
            .filter(n => n !== null);

        const sqFtValues = inputs.map(i => parseFloat(i.sqFt)).filter(n => !isNaN(n));
        const salePriceValues = inputs.map(i => parseFloat(i.salePrice)).filter(n => !isNaN(n));

        const avgPriceCalc = priceValues.reduce((a, b) => a + b, 0) / priceValues.length || 0;
        const avgSqFtCalc = sqFtValues.reduce((a, b) => a + b, 0) / sqFtValues.length || 0;
        const avgSalePriceCalc = salePriceValues.reduce((a, b) => a + b, 0) / salePriceValues.length || 0;

        setAvgPrice(avgPriceCalc.toFixed(2));
        setAvgSqFt(avgSqFtCalc.toFixed(2));
        setAvgSalePrice(avgSalePriceCalc.toFixed(2));
    };

    const formatWithCommas = (value) => {
        const num = parseFloat(value);
        if (isNaN(num)) return "";
        return num.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
    };
    return (
        <div className="ARV-Container">
            <form onSubmit={calculateAverages} className="ARVForm">
                <h2 className="text-xl font-bold mb-4">Average Calculator</h2>
                {inputs.map((input, index) => (
                    <div key={index} className="mb-4 ARV-calculator">
                        <div className="ARV-wrapper">
                            <div className="input-group arv-input">
                                <label>Address</label>
                                <input
                                    type="text"
                                    value={input.address}
                                    onChange={(e) => handleChange(index, 'address', e.target.value)}
                                    className="w-full p-2 mb-2 border rounded arvForm"
                                    placeholder="Address"
                                />
                            </div>

                            <div className="input-group arv-input">
                                <label>Square Feet</label>
                                <input
                                    type="number"
                                    value={input.sqFt}
                                    onChange={(e) => handleChange(index, 'sqFt', e.target.value)}
                                    className="w-full p-2 mb-2 border rounded arvForm"
                                    placeholder="Square Footage"
                                />
                            </div>

                            <div className="input-group arv-input">
                                <label>Sale Price</label>
                                <input
                                    type="number"
                                    value={input.salePrice}
                                    onChange={(e) => handleChange(index, 'salePrice', e.target.value)}
                                    className="w-full p-2 mb-2 border rounded arvForm"
                                    placeholder="Sale Price"
                                />
                            </div>

                            <div className="input-group arv-input">
                                <label>Price per Square Foot</label>
                                <input
                                    type="number"
                                    value={
                                        input.salePrice && input.sqFt
                                            ? (parseFloat(input.salePrice) / parseFloat(input.sqFt)).toFixed(2)
                                            : ''
                                    }
                                    disabled
                                    className="w-full p-2 mb-2 border rounded bg-gray-100 text-gray-700 arvForm"
                                    placeholder="Auto-calculated"
                                />
                            </div>
                        </div>
                    </div>
                ))}

                <button
                    type="button"
                    onClick={handleAddInput}
                    className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                >
                    Add Another
                </button>
                <button
                    type="submit"
                    className="bg-green-500 text-white px-3 py-1 rounded"
                >
                    Calculate Averages
                </button>
            </form>

            {(avgPrice || avgSqFt || avgSalePrice) && (
                <div className="mt-4 text-lg">
                    <p><strong>Average Price/Sq Ft:</strong> ${formatWithCommas(avgPrice)}</p>
                    <p><strong>Average Sq Ft:</strong> {formatWithCommas(avgSqFt)} ft²</p>
                    <p><strong>Average Sale Price:</strong> ${formatWithCommas(avgSalePrice)}</p>
                </div>
            )}
        </div>
    );
}
