// import React, { useState, useEffect } from "react";
// import "../Calculations/SowRight.css";
// import "../Form.css";


// export default function Investment({
//     rehabTotal 

// }) {

//     const [arvInput, setArvInput] = useState("");
//     const [rehab, setRehab]= useState("");
//     const [purchasePriceInput, setPurchasePriceInput] = useState("");
//     const [downPaymentInput, setDownPaymentInput] = useState("");
//     const [total, setTotal] = useState(0);
//     const [bathroomCount, setBathroomCount] = useState(0);

//     const formatCurrency = (value) => {
//         return new Intl.NumberFormat("en-US", {
//             style: "currency",
//             currency: "USD",
//         }).format(value);
//     };

//     const realtorTotal = arvInput ? formatCurrency(Number(arvInput) * 0.02) : formatCurrency(0);
//     const saleInvestment = arvInput ? formatCurrency(Number(arvInput) + Number(realtorTotal.replace(/[^0-9.-]+/g, ''))) : formatCurrency(0);
//     const investment = formatCurrency(Number(rehab) +Number(purchasePriceInput) + Number(downPaymentInput) + Number(total));
//     const grandTotal = formatCurrency(Number(saleInvestment.replace(/[^0-9.-]+/g, '')) - Number(investment.replace(/[^0-9.-]+/g, '')));




//     const handleDownPaymentChange = (e) => {
//         const raw = e.target.value.replace(/[^0-9.]/g, ""); // Remove non-numeric except dot
//         setDownPaymentInput(raw);
//     };



//     return (
//         <div className="Right calculations sticky top-6">
//             <div className="Right-calculations">
//                 <div className="flex flex-col gap-4 TotalLeft">

//                     {/* Inputs */}
//                     <div className="input-group">
//                         <label className="block mb-1 text-sm font-medium text-gray-700">
//                             Enter Down Payment:
//                         </label>
//                         <input
//                             type="number"
//                             className="w-full p-2 border rounded arvForm"
//                             value={downPaymentInput}
//                             onChange={(e) => setDownPaymentInput(e.target.value)}
//                             placeholder="Down Payment..."
//                         />
//                     </div>

//                     <div className="input-group">
//                         <label className="block mb-1 text-sm font-medium text-gray-700">
//                             Rehab:
//                         </label>
//                         <input
//                             type="number"
//                             className="w-full p-2 border rounded arvForm"
//                             value={rehab}
//                             onChange={(e) => setRehab(e.target.value)}
//                             placeholder="Rehab..."
//                         />
//                     </div>

//                     <div className="input-group">
//                         <label className="block mb-1 text-sm font-medium text-gray-700">
//                             Enter Purchase Price:
//                         </label>
//                         <input
//                             type="number"
//                             className="w-full p-2 border rounded profitForm"
//                             value={purchasePriceInput}
//                             onChange={(e) => setPurchasePriceInput(e.target.value)}
//                             placeholder="Purchase Price..."
//                         />
//                     </div>

//                     <div className="input-group">
//                         <label htmlFor="arv">Enter ARV:</label>
//                         <input
//                             type="number"
//                             id="arv"
//                             className="input-box profitForm"
//                             value={arvInput}
//                             onChange={(e) => setArvInput(e.target.value)}
//                             placeholder="ARV..."
//                         />
//                     </div>
//                 </div>

//                 {/* Totals */}
//                 <div className="Total-Right mt-6">
//                     <div className = "calculation-container">
//                     <div className="tooltip-container">
//                         <div class = "amount-title">
//                         Purchase Price:
//                         </div>
//                          <div class = "amount-container">{formatCurrency(purchasePriceInput || 0)}</div>
//                         <span className="tooltip-box">The agreed property purchase price</span>
//                     </div>

//                     <div className="tooltip-container">
//                     <div class = "amount-title">
//                         Down Payment:
//                         </div>
//                         <div class = "amount-container">{formatCurrency(downPaymentInput || 0)}</div>
//                         <span className="tooltip-box">The amount you plan to put down initially</span>
//                     </div>

//                     <div className="tooltip-container">
//                     <div class = "amount-title">
//                         Rehab Total: 
//                         </div>
//                         <div class = "amount-container">{formatCurrency(total) || setRehab}</div>
//                         <span className="tooltip-box">Sum of all estimated repair and renovation costs</span>
//                     </div>

//                     <div className="tooltip-container">
//                     <div class = "amount-title">
//                         ARV: 
//                         </div>
//                         <div class = "amount-container">{formatCurrency(arvInput)}</div>
//                         <span className="tooltip-box">After Repair Value—expected resale price</span>
//                     </div>

//                     <div className="tooltip-container">
//                     <div class = "amount-title">
//                         Realtor Fees:
//                         </div>
//                         <div class = "amount-container"> {realtorTotal}</div>
//                         <span className="tooltip-box">Estimated 2% of ARV paid to real estate agents</span>
//                     </div>

//                     <div className="tooltip-container">
//                     <div class = "amount-title">
//                         ARV + Realtor: 
//                         </div>
//                         <div class = "amount-container">{saleInvestment}</div>
//                         <span className="tooltip-box">Expected sale value including realtor fees</span>
//                     </div>

//                     <div className="tooltip-container">
//                     <div class = "amount-title">
//                         Investment:
//                         </div>
//                         <div class = "amount-container"> {investment}</div>
//                         <span className="tooltip-box">Total money spent (purchase, rehab, down payment)</span>
//                     </div>

//                     <div className="tooltip-container">
//                     <div class = "amount-title">
//                         Grand Total:
//                         </div>
//                         <div class = "amount-container"> {grandTotal}</div>
//                         <span className="tooltip-box">Profit or loss after selling and subtracting investment</span>
//                     </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

