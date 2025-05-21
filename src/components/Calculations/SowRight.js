import React, { useState } from "react";
import "./SowRight.css";
import "../Form.css";
import Resale from "../ARV/ReSale/Resale";
import { MdExpandMore, MdExpandLess } from "react-icons/md";

export default function SowRight({
    total,
    arvInput,
    setArvInput,
    rehab,
    purchasePriceInput,
    setPurchasePriceInput,
    downPaymentInput,
    setDownPaymentInput,
    formatCurrency,
    setRehab,
    handleSqurFtArv,
    avgPrice,
    setAvgPrice,
    salePriceFromARV,
    setSalePriceFromARV,
    houseSalePrice,
    avgSalePrice,
}) {

    const [inputPercentage, setInputPercentage] = useState(""); 
    const [remainingDecimal, setRemainingDecimal] = useState(""); 
    const [percentage, setPercentage] = useState(0.7); 
    const [realtorCommissionInput, setRealtorCommission] = useState(""); 
    const [realtorCommissionDecimal, setRealtorCommissionDecimal] = useState(0.02); // default to 2%
    const [showResale, setShowResale] = useState(false);

    const [holdingCostInput, setHoldingCostInput] = useState(""); // ✅ NEW

    const convertRealtorCommisionDecimal = (value) => { 
        setRealtorCommission(value);
    
        const cleaned = value.replace(/[^0-9.]/g, ""); // remove non-numeric
        const percent = Number(cleaned);
        const decimal = isNaN(percent) ? 0.02 : percent / 100;
    
        setRealtorCommissionDecimal(decimal); // ✅ set the state with the new decimal
    
        console.info("realtorCommissionDecimal (calculated): " + decimal);
        console.info("realtorCommissionDecimal (state): " + realtorCommissionDecimal);
    };
    
    
    const realtorTotal = (arvInput || houseSalePrice)
    ? formatCurrency(Number(arvInput || houseSalePrice) * realtorCommissionDecimal)
    : formatCurrency(0);

    const investment = formatCurrency(
        Number(rehab) +
        Number(purchasePriceInput) +
        Number(downPaymentInput) +
        Number(holdingCostInput) + // ✅ INCLUDE HOLDING COST
        Number(total) +  Number(realtorTotal.replace(/[^0-9.-]+/g, ''))
    );
    const pocketInvestment = formatCurrency(
        Number(rehab) +
        Number(downPaymentInput) +
        Number(holdingCostInput) + // ✅ INCLUDE HOLDING COST
        Number(total)+ + Number(realtorTotal.replace(/[^0-9.-]+/g, ''))
    );

    const saleInvestment = arvInput || houseSalePrice
        ? formatCurrency(Number(arvInput || houseSalePrice) )
        : formatCurrency(0);

    const grandTotal = formatCurrency(
        Number(saleInvestment.replace(/[^0-9.-]+/g, '')) -
        Number(investment.replace(/[^0-9.-]+/g, ''))
    );

    const convertDecimal = (value) => {
        setInputPercentage(value);
        const percentageValue = value ? Number(value) / 100 : 0.02;
        const remainingPercentage = 1 - percentageValue;
        setPercentage(percentageValue);
        setRemainingDecimal(remainingPercentage);
    };


    const calculateMaxARV = (arv, inputPercentage) => {
        const percentageValue = inputPercentage ? Number(inputPercentage) / 100 : 0.7;
        const maxARVValue = arv ? Number(arv) * percentageValue : 0;
        return formatCurrency(maxARVValue);
    };

    const calculateRemainingPercentage = (inputPercentage) => {
        const remaining = 100 - (inputPercentage || 70); 
        return remaining;
    };

    const maxARV = calculateMaxARV(arvInput || houseSalePrice, inputPercentage);
    const remainingPercentage = calculateRemainingPercentage(inputPercentage);

    const rawARV = Number(arvInput || houseSalePrice);
    const rawMaxARV = Number(String(maxARV).replace(/[^0-9.-]+/g, ""));
    const adjustmentPrice = arvInput || houseSalePrice
        ? formatCurrency(rawARV - rawMaxARV)
        : formatCurrency(0);

    const handleDownPaymentChange = (e) => {
        const raw = e.target.value.replace(/[^0-9.]/g, "");
        setDownPaymentInput(raw);
    };

    const remainingvalue = formatCurrency(
        Number(adjustmentPrice.replace(/[^0-9.-]+/g, '')) -
        Number(pocketInvestment.replace(/[^0-9.-]+/g, ''))
       
    );

    const contingency = formatCurrency(
        Number(remainingvalue.replace(/[^0-9.-]+/g, '')) -  Number(grandTotal.replace(/[^0-9.-]+/g, ''))
       
    );
    const getAmountClass = (value) => {
        const number = Number(String(value).replace(/[^0-9.-]+/g, ""));
        if (isNaN(number)) return "";
        return number < 0 ? "text-red-500" : "text-green-600";
    };
    
    // const grandTotalRaw = 
    // Number(saleInvestment.replace(/[^0-9.-]+/g, '')) - 
    // Number(investment.replace(/[^0-9.-]+/g, ''));

    return (
        <div className="Right calculations top-6">
            <div className="Right-calculations">
                <div className="TotalLeft">
                    <div className="input-calculations">
                        <div className="TotalLeft-container">

                            {/* Purchase Price */}
                            <div className="input-group-container">
                                <div className="input-group">
                                    <label className="block mb-1 text-sm font-medium text-gray-700">Enter Purchase Price:</label>
                                    <input
                                        type="number"
                                        inputMode="decimal"
                                        pattern="[0-9]*[.,]?[0-9]*"
                                        className="w-full p-2 border rounded profitForm"
                                        value={purchasePriceInput}
                                        onChange={(e) => setPurchasePriceInput(e.target.value)}
                                        placeholder="Purchase Price..."
                                    />
                                </div>
                            </div>

                            {/* Down Payment */}
                            <div className="input-group-container">
                                <div className="input-group">
                                    <label className="block mb-1 text-sm font-medium text-gray-700">Enter Down Payment:</label>
                                    <input
                                        type="number"
                                        inputMode="decimal"
                                        pattern="[0-9]*[.,]?[0-9]*"
                                        className="w-full p-2 border rounded profitForm"
                                        value={downPaymentInput}
                                        onChange={handleDownPaymentChange}
                                        placeholder="Down Payment..."
                                    />
                                </div>
                            </div>

                            {/* Rehab */}
                            <div className="input-group-container">
                                <div className="input-group">
                                    <label className="block mb-1 text-sm font-medium text-gray-700">Rehab:</label>
                                    <input
                                        type="number"
                                        inputMode="decimal"
                                        pattern="[0-9]*[.,]?[0-9]*"
                                        className="w-full p-2 border rounded profitForm"
                                        value={rehab}
                                        onChange={(e) => setRehab(e.target.value)}
                                        placeholder="Rehab..."
                                    />
                                </div>
                            </div>
                            
                            {/* ARV */}
                            <div className="input-group-container">
                                <div className="input-group">
                                    <label htmlFor="arv">Realtor Commission:</label>
                                    <input
                                        type="number"
                                        id="arv"
                                        inputMode="decimal"
                                        pattern="[0-9]*[.,]?[0-9]*"
                                        className="w-full p-2 border rounded profitForm"
                                        value={realtorCommissionInput}
                                        onChange={(e) => convertRealtorCommisionDecimal(e.target.value)}
                                        placeholder="%"
                                    />
                                </div>
                            </div>

                            {/* ✅ Holding Cost */}
                            <div className="input-group-container">
                                <div className="input-group">
                                    <label className="block mb-1 text-sm font-medium text-gray-700">Holding Cost:</label>
                                    <input
                                        type="number"
                                        inputMode="decimal"
                                        pattern="[0-9]*[.,]?[0-9]*"
                                        className="w-full p-2 border rounded profitForm"
                                        value={holdingCostInput}
                                        onChange={(e) => setHoldingCostInput(e.target.value)}
                                        placeholder="Enter holding costs..."
                                    />
                                </div>
                            </div>

                            {/* ARV */}
                            <div className="input-group-container">
                                <div className="input-group">
                                    <label htmlFor="arv">Enter ARV:</label>
                                    <input
                                        type="number"
                                        id="arv"
                                        inputMode="decimal"
                                        pattern="[0-9]*"
                                        className="w-full p-2 border rounded profitForm"
                                        value={arvInput}
                                        onChange={(e) => setArvInput(e.target.value)}
                                        placeholder="ARV..."
                                    />
                                </div>
                            </div>

                            {/* ARV % */}
                            <div className="calculator-container">
                                <div className="input-group">
                                    <label htmlFor="inputPercentage">Enter a percentage:</label>
                                    <input
                                        type="number"
                                        id="inputPercentage"
                                        
                                        className="w-full p-2 border rounded profitForm"
                                        value={inputPercentage}
                                        onChange={(e) => convertDecimal(e.target.value)}
                                        placeholder="Enter a percentage"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Totals */}
                <div className="Total-Right mt-6">
                    <div className="calculation-container">
                        <div className="calculation-card">

                            <div className="tooltip-container">
                                <div className="amount-title">Purchase Price:</div>
                                <div className="amount-container">{formatCurrency(purchasePriceInput || 0)}</div>
                            </div>

                            <div className="tooltip-container">
                                <div className="amount-title">Down Payment:</div>
                                <div className="amount-container">{formatCurrency(downPaymentInput || 0)}</div>
                            </div>

                            <div className="tooltip-container">
                                <div className="amount-title">Rehab Total:</div>
                                <div className="amount-container">{formatCurrency(total || rehab)}</div>
                            </div>

                            <div className="tooltip-container">
                                <div className="amount-title">Holding Cost:</div>
                                <div className="amount-container">{formatCurrency(holdingCostInput || 0)}</div>
                            </div>

                            <div className="tooltip-container">
                                <div className="amount-title">Realtor Fees: {realtorCommissionInput || 2 }%</div>
                                <div className="amount-container">{realtorTotal}</div>
                            </div>

                            <div className="tooltip-container">
                                <div className="amount-title">ARV:</div>
                                <div className="amount-container">{formatCurrency(arvInput || houseSalePrice)}</div>
                            </div>
{/* 
                            <div className="tooltip-container">
                                <div className="amount-title">ARV + Realtor:</div>
                                <div className="amount-container">{saleInvestment}</div>
                            </div> */}

                            <div className="tooltip-container">
                                <div className="amount-title">Investment:</div>
                                <span className="tooltip-box">Rehab, DownPayment, Holding Cost, Realtor Fee</span>
                                <div className="amount-container">{pocketInvestment}</div>
                            </div>
                            
                            <div className="tooltip-container">
                                <div className="amount-title">Investment + PP:</div>
                                <div className="amount-container">{investment}</div>
                            </div>

                            <div className={`tooltip-container  profit-amt ${getAmountClass(grandTotal)}`}>

                                <div className="amount-title">Grand Total:</div>
                                <div className={`amount-container ${getAmountClass(grandTotal)}`}>{grandTotal}</div>
                            </div>
                        </div>
                        <div className="calculation-card">
                            <button
                                onClick={() => setShowResale(!showResale)}
                                className="w-full text-left font-medium text-blue-600 underline mb-2 button-reset "
                            >
                                
                                <div className = "amount-title">
                                {showResale ? <MdExpandMore /> : <MdExpandLess/>}
                                Re-Sale additional
                                </div>
                            </button>
                            {showResale && <Resale  grandTotal={grandTotal} />}
                        </div>
                        <div className="calculation-card">
                            <div className="tooltip-container">
                                <div className="amount-title">Calculated ARV:</div>
                                <div className="amount-container">{formatCurrency(arvInput || houseSalePrice)}</div>
                            </div>

                            <div className="tooltip-container">
                                <div className="amount-title">MAX Offer: {inputPercentage || 70}%</div>
                                <div className="amount-container">{maxARV}</div>
                            </div>

                            <div className="tooltip-container">
                                <div className="amount-title">Remaining {remainingPercentage}%</div>
                                <div className="amount-container">{adjustmentPrice}</div>
                                <span className="tooltip-box">Everything from your investment, Additional Seller fee, + profit needs to come from this value</span>

                            </div>
                            <div className="tooltip-container">
                                <div className="amount-title">Pocket Value</div>
                                <div className="amount-container">{remainingvalue}</div>
                                <span className="tooltip-box">Remaining - investment</span>
                            </div>
                            <div className={`tooltip-container ${getAmountClass(contingency)}`}>
                                <div className="amount-title">Contingency</div>
                                <div className="amount-container">{contingency}</div>
                                <span className="tooltip-box">Pocket Value - grandTotal</span>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
