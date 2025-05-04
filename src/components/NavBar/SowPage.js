import React, { useState, useEffect } from "react";
import { data } from "./Calculations/SowItems";
import SowLeft from "./Calculations/SowLeft";
import SowRight from "./Calculations/SowRight";
import Arv from "./ARV/Arv";
import "./Calculations/SowItems";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function SowPage() {
    const [items, setItems] = useState(
        data.flatMap((section, index) =>
            section.items.map((item, i) => ({
                id: `${section.category}-${i}`,
                ...item,
                checked: false,
                useSetValue: true,
                inputValue: 0,
            }))
        )
    );

    const [collapsed, setCollapsed] = useState(
        Object.fromEntries(data.map((section) => [section.category, true]))
    );

    const [rehab, setRehab] = useState("");
    const [bathroomCount, setBathroomCount] = useState(0);
    const [arvInput, setArvInput] = useState("");
    const [purchasePriceInput, setPurchasePriceInput] = useState("");
    const [downPaymentInput, setDownPaymentInput] = useState("");
    const [total, setTotal] = useState(0);

    // 👇 Single state to control visible section
    const [visibleSection, setVisibleSection] = useState("SowRight");

    useEffect(() => {
        const newTotal = items.reduce((acc, item) => {
            if (item.checked && item.property.toLowerCase() !== "bathroom") {
                const value = item.useSetValue ? item.value : item.inputValue;
                acc += parseFloat(value) || 0;
            } else if (item.checked && item.property.toLowerCase() === "bathroom") {
                const value = item.useSetValue ? item.value : item.inputValue;
                const multiplier = parseFloat(bathroomCount) || 0;
                acc += (parseFloat(value) || 0) * multiplier;
            }
            return acc;
        }, 0);
        setTotal(newTotal);
    }, [items, bathroomCount]);

    const handleInputChange = (id, newValue) => {
        const cleanedValue = newValue === "" ? "" : newValue.replace(/^0+(?!$)/, "");

        setItems(prev =>
            prev.map(item =>
                item.id === id
                    ? {
                        ...item,
                        inputValue: cleanedValue === "" ? "" : Number(cleanedValue),
                        useSetValue: false,
                        checked: true,
                    }
                    : item
            )
        );
    };

    const handleBathroomCountChange = (value) => {
        setBathroomCount(value || 0);
    };

    const toggleCollapse = (category) => {
        setCollapsed(prev => ({ ...prev, [category]: !prev[category] }));
    };

    const handleSelectAll = (category) => {
        setItems(prev => prev.map(item =>
            item.id.startsWith(category) ? { ...item, checked: true } : item
        ));
    };

    const handleDeselectAll = (category) => {
        setItems(prev => prev.map(item =>
            item.id.startsWith(category) ? { ...item, checked: false } : item
        ));
    };

    const handleCheckboxChange = (id) => {
        setItems(prev => prev.map(item =>
            item.id === id ? { ...item, checked: !item.checked } : item
        ));
    };

    const handleRadioChange = (id, useSetValue) => {
        setItems(prev => prev.map(item =>
            item.id === id ? { ...item, useSetValue } : item
        ));
    };

    const formatCurrency = (value) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        }).format(value);
    };

    const renderSection = () => {
        switch (visibleSection) {
            case "SowLeft":
                return (
                    <SowLeft
                        data={data}
                        items={items}
                        collapsed={collapsed}
                        toggleCollapse={toggleCollapse}
                        handleSelectAll={handleSelectAll}
                        handleDeselectAll={handleDeselectAll}
                        handleCheckboxChange={handleCheckboxChange}
                        handleInputChange={handleInputChange}
                        handleRadioChange={handleRadioChange}
                        handleBathroomCountChange={handleBathroomCountChange}
                        bathroomCount={bathroomCount}
                        total={total}
                    />
                );
            case "SowRight":
                return (
                    <SowRight
                        total={total}
                        arvInput={arvInput}
                        setArvInput={setArvInput}
                        purchasePriceInput={purchasePriceInput}
                        setPurchasePriceInput={setPurchasePriceInput}
                        downPaymentInput={downPaymentInput}
                        setDownPaymentInput={setDownPaymentInput}
                        formatCurrency={formatCurrency}
                        rehab={rehab}
                        setRehab={setRehab}
                    />
                );
            case "Arv":
                return <Arv />;
            default:
                return <div>Select a section to view</div>;
        }
    };

    return (
        <div className="p-6 max-w-6xl mx-auto bg-white shadow-lg rounded-lg navBar-button">
            <div className="mb-4 gap-4 navBar-button-container">
                <button
                    onClick={() => setVisibleSection("SowLeft")}
                    className={`btn card ${visibleSection === "SowLeft" ? "btn-primary" : "btn-outline-primary"}`}
                >
                    Investment Calculator
                </button>
                <button
                    onClick={() => setVisibleSection("SowRight")}
                    className={`btn card ${visibleSection === "SowRight" ? "btn-success" : "btn-outline-success"}`}
                >
                    ARV Calculator
                </button>
                <button
                    onClick={() => setVisibleSection("Arv")}
                    className={`btn card ${visibleSection === "Arv" ? "btn-info" : "btn-outline-info"}`}
                >
                    Show ARV
                </button>
            </div>

            <div className="mt-4">
                {renderSection()}
            </div>
        </div>
    );
}
