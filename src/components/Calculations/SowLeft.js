import React from "react";
import { MdExpandMore, MdExpandLess } from "react-icons/md";
import "./SowLeft.css";

export default function SowLeft({
    data,
    items,
    total,
    collapsed,
    toggleCollapse,
    handleSelectAll,
    handleDeselectAll,
    handleCheckboxChange,
    handleInputChange,
    handleSqurFtArv,
    handleRadioChange,
    handleBathroomCountChange,
    bathroomCount,
    setSelectedItems,
    selectedItems,
    setSqrFt,
    sqrFt,
    flooringTotal
}) {
    return (
        <div className="Left">
            <div className="Left-Container">
                <div className="Left-Wrapper" id="accordion">
                    <h2>Rehab Calculations</h2>
                    <p>Total: {parseFloat(total)}</p>

                    <div className="extra-input mt-4 input-rehab-group">
                        <div className="input-group">
                            <label><span>Square Footage</span></label>
                            <input
                                type="number"
                                value={sqrFt || ""}
                                placeholder="#"
                                onChange={(e) => handleSqurFtArv(parseFloat(e.target.value))}
                                className="w-full p-2 border rounded profitForm"
                            />
                        </div>

                        <div className="input-group input-rehab-group">
                            <label><span>Enter Number of Bedroom</span></label>
                            <input
                                type="number"
                                placeholder="Bedroom #"
                                className="w-full p-2 border rounded profitForm"
                            />
                        </div>

                        <div className="input-group">
                            <label>Enter Number of Bathrooms</label>
                            <input
                                type="number"
                                value={bathroomCount || ""}
                                onChange={(e) => handleBathroomCountChange(parseFloat(e.target.value))}
                                className="w-full p-2 mb-2 border rounded bg-gray-100 text-gray-700 profitForm"
                                placeholder="bathroom #"
                            />
                        </div>
                    </div>

                    {Array.isArray(data) && data.length > 0 ? (
                        data.map((section) => (
                            <div key={section.category} className="border-t category">
                                <div className="category-container">
                                    <div className="category-wrapper">
                                        <div className="icon-wrapper category-header">
                                            {collapsed[section.category] ? (
                                                <MdExpandMore onClick={() => toggleCollapse(section.category)} className="category-dropdown cursor-pointer" />
                                            ) : (
                                                <MdExpandLess onClick={() => toggleCollapse(section.category)} className="category-dropdown cursor-pointer" />
                                            )}
                                        </div>
                                        <div className="category-title category-header" onClick={() => toggleCollapse(section.category)}>
                                            {section.category}
                                        </div>
                                        <div className="category-selectAll category-header">
                                            <input type="checkbox" onChange={(e) => e.target.checked && handleSelectAll(section.category)} />
                                            <label>Select All</label>
                                        </div>
                                        <div className="category-deselectAll category-header">
                                            <input type="checkbox" onChange={(e) => e.target.checked && handleDeselectAll(section.category)} />
                                            <label>Deselect All</label>
                                        </div>
                                    </div>
                                </div>

                                {!collapsed[section.category] && (
                                    <div className="space-y-4">
                                        {items
                                            .filter((item) =>
                                                item.id.toLowerCase().startsWith(section.category.toLowerCase())
                                            )
                                            .map((item) => {
                                                let extraInfo;

                                                if (item.property.toLowerCase() === "flooring") {
                                                    extraInfo = (
                                                            <label><span>{flooringTotal}</span></label>
                                                    );
                                                } else {
                                                    extraInfo = <span>{parseFloat(item.value)}</span>;
                                                }

                                                return (
                                                    <div key={item.id} className="category-breakdown">
                                                        <div className="category-name">
                                                            <input
                                                                type="checkbox"
                                                                checked={item.checked}
                                                                onChange={() => handleCheckboxChange(item.id)}
                                                                className="border p-2 rounded-md rehab-input"
                                                            />
                                                            <span>{item.property}</span>
                                                        </div>

                                                        <div className="pricing">
                                                            <div className="set-pricing">
                                                                <label>
                                                                    <input
                                                                        type="radio"
                                                                        name={`useSetValue-${item.id}`}
                                                                        checked={item.useSetValue}
                                                                        onChange={() => handleRadioChange(item.id, true)}
                                                                        className="border p-2 rounded-md rehab-input"
                                                                    />
                                                                    {extraInfo}
                                                                </label>
                                                            </div>
                                                            <div className="custom-pricing">
                                                                <label>
                                                                    <input
                                                                        type="radio"
                                                                        name={`useSetValue-${item.id}`}
                                                                        checked={!item.useSetValue}
                                                                        onChange={() => handleRadioChange(item.id, false)}
                                                                        className="border p-2 rounded-md rehab-input"
                                                                    />
                                                                    <input
                                                                        type="number"
                                                                        value={item.useSetValue ? "" : item.inputValue || ""}
                                                                        onFocus={() => handleRadioChange(item.id, false)}
                                                                        onChange={(e) => handleInputChange(item.id, e.target.value)}
                                                                        placeholder="Custom Value"
                                                                        className="border p-2 rounded-md rehab-input"
                                                                    />
                                                                </label>
                                                            </div>
                                                        </div>

                                                        {item.property.toLowerCase() === "bathroom" && (
                                                            <div className="extra-input mt-4 input-group">
                                                                <label><span>Bathroom #</span></label>
                                                                <input
                                                                    type="number"
                                                                    value={bathroomCount || ""}
                                                                    onChange={(e) => handleBathroomCountChange(parseFloat(e.target.value))}
                                                                    placeholder="Enter number of bathrooms"
                                                                    className="border p-2 rounded-md rehab-input"
                                                                />
                                                            </div>
                                                        )}
                                                    </div>
                                                );
                                            })}
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <div>No categories available.</div>
                    )}

                    {selectedItems.length > 0 && (
                        <div className="selected-items mt-4 p-4 border-t">
                            <h4 className="font-bold mb-2">Selected Items:</h4>
                            <ul className="list-disc pl-5">
                                {selectedItems.map(item => (
                                    <li key={item.id}>
                                        {item.property} – ${item.useSetValue ? item.value : item.inputValue || 0}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
