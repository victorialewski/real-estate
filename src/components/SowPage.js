import React, { useRef, useState, useEffect } from "react";
import { data } from "./Calculations/SowItems";
import SowLeft from "./Calculations/SowLeft";
import SowRight from "./Calculations/SowRight";
import Arv from "./ARV/Arv";
import "./Calculations/SowItems";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Form.css"
import "./SowPage.css"

import axios from './Services/axios';
// import { useNavigate, useLocation, Link } from 'react-router-dom';
// import useAxiosPrivate from "../../hooks/useAxiosPrivate";


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
    const [sqrFt, setSqrFt] = useState("");
    const [arvInput, setArvInput] = useState("");
    const [purchasePriceInput, setPurchasePriceInput] = useState("");
    const [downPaymentInput, setDownPaymentInput] = useState("");
    const [total, setTotal] = useState(0);
    const [avgPrice, setAvgPrice] = useState(null);
    const [avgSalePrice, setAvgSalePrice] = useState(null);
    const [houseSalePrice, setHouseSalePrice] = useState(0);
    const [flooringTotal, setFlooringTotal] = useState(0);




    // 👇 Single state to control visible section
    const [visibleSection, setVisibleSection] = useState("SowRight");

    useEffect(() => {
        let flooring = 0;
      
        const newTotal = items.reduce((acc, item) => {
          const value = item.useSetValue ? item.value : item.inputValue;
          const prop = item.property.toLowerCase();
      
          if (item.checked) {
            if (prop === "bathroom") {
              acc += (parseFloat(value) || 0) * (parseFloat(bathroomCount) || 0);
            } else if (prop === "flooring") {
              flooring = (parseFloat(value) || 0) * (parseFloat(sqrFt) || 0);
              acc += flooring;
            } else {
              acc += parseFloat(value) || 0;
            }
          }
      
          return acc;
        }, 0);
      
        setFlooringTotal(parseFloat(flooring));  // <- Set flooring cost separately
        setTotal(newTotal);
      }, [items, bathroomCount, sqrFt]);
      
      
      

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

    const userRef = useRef();
    const errRef = useRef();
    // const axiosPrivate = useAxiosPrivate();

    const [fullName, setFullName] = useState('Fouch');
    const [toEmail, setToEmail] = useState('victoriachmi@gmail.com');
    // const [phone, setPhone] = useState('');
    // const [instagram, setInstagram] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);
    const handleSqurFtArv = (value) => {
        console.log("handle sqrt ft event " + value);
        setSqrFt(value || 0);
    };


    // useEffect(() => {
    //     userRef.current.focus();
    // }, [])

    useEffect(() => {
        setErrMsg('');
    }, [fullName])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const body = data
            .map(section => {
                const selectedItems = items
                    .filter(item =>
                        item.checked &&
                        item.id.toLowerCase().startsWith(section.category.toLowerCase())
                    )
                    .map(item => ({
                        property: item.property,
                        value: item.useSetValue ? item.value : Number(item.inputValue) || 0
                    }));

                return selectedItems.length > 0
                    ? {
                        category: section.category,
                        items: selectedItems
                    }
                    : null;
            })
            .filter(Boolean);

        const REGISTER_URL = '/export';
        console.log("register" + REGISTER_URL);
        try {


            const response = await axios.post(REGISTER_URL, body,
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: false
                }
            );
            // TODO: remove console.logs before deployment
            console.log("test" + JSON.stringify(response?.data));
            //console.log(JSON.stringify(response))
            // setSuccess(true);
            //clear state and controlled inputs
            setFullName('victoria');
            setToEmail('victoriachmi@gmail.com');

        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg('Username Taken');
            } else {
                setErrMsg('Registration Failed')
            }
        }
    }


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
                        handleSqurFtArv={handleSqurFtArv}
                        handleBathroomCountChange={handleBathroomCountChange}
                        bathroomCount={bathroomCount}
                        total={total}
                        avgPrice={avgPrice}
                        setAvgPrice={setAvgPrice}
                        avgSalePrice={avgSalePrice}
                        setAvgSalePrice={setAvgSalePrice}
                        setSelectedItems={setSelectedItems}
                        selectedItems={selectedItems}
                        setSqrFt={setSqrFt}
                        sqrFt = {sqrFt}
                        flooringTotal={flooringTotal}


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
                        avgPrice={avgPrice}
                        handleSqurFtArv={handleSqurFtArv}
                        setAvgPrice={setAvgPrice}
                        avgSalePrice={avgSalePrice}
                        setAvgSalePrice={setAvgSalePrice}
                        houseSalePrice={houseSalePrice} 
                    />
                );
            case "Arv":
                return <Arv
                    setSqrFt={setSqrFt}
                    sqrFt = {sqrFt}
                    setSalePriceFromARV={setHouseSalePrice}
                    avgPrice={avgPrice}
                    setAvgPrice={setAvgPrice}
                    handleSqurFtArv={handleSqurFtArv}
                    avgSalePrice={avgSalePrice}
                    setAvgSalePrice={setAvgSalePrice} />;
            default:
                return <div>Select a section to view</div>;
        }
    };

    return (
        <div className="bg-white shadow-lg rounded-lg navBar-button">
            <div className="navBar-button-container">
                <div className="navBar-button-wrapper">
                <div className="navBar-button-content">
            
                <button
                    onClick={() => setVisibleSection("SowLeft")}
                    className={`btn-btn btn card ${visibleSection === "SowLeft" ? "btn-primary" : "btn-outline-primary"}`}
                >
                    Rehab Calculator
                    {total || "0.00"}
                </button>
                <button
                    onClick={() => setVisibleSection("SowRight")}
                    className={` btn-btn btn card ${visibleSection === "SowRight" ? "btn-success" : "btn-outline-success"}`}
                >
                    Investment Calculator

                </button>
                <button
                    onClick={() => setVisibleSection("Arv")}
                    className={`btn-btn btn card ${visibleSection === "Arv" ? "btn-info" : "btn-outline-info"}`}
                >
                    ARV Calculator
                    {houseSalePrice}
                </button>
            </div>
            </div>
            </div>

            <div className="mt-4">
                {renderSection()}
            </div>
            <form onSubmit={handleSubmit}>
                <button>Send in email</button>
            </form>
        </div>
    );
}
