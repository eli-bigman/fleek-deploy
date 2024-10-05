import React, { useState, useEffect } from "react";
import Web3 from 'web3';
import { ChainlinkPlugin, MainnetPriceFeeds } from "@chainsafe/web3-plugin-chainlink";
import Select from 'react-select';

export default function Compare() {

  const [coinOptions, setCoinOptions] = useState([]);
  const [error, setError] = useState(null);
  const [selectedCoin1, setSelectedCoin1] = useState(null);
  const [selectedCoin2, setSelectedCoin2] = useState(null);
  const [comparisonResult, setComparisonResult] = useState(null);

  useEffect(() => {
    const extractCoinOptions = () => {
      const options = Object.keys(MainnetPriceFeeds).map(key => ({
        value: key,
        label: key.replace(/([A-Z])/g, ' $1').trim()
      }));
      setCoinOptions(options);
    };

    extractCoinOptions();
  }, []);

  const handleCompare = async () => {
    console.log("Handle compare clicked");
    console.log("Selected Coin 1:", selectedCoin1);
    console.log("Selected Coin 2:", selectedCoin2);
  
    if (selectedCoin1 && selectedCoin2) {
      try {
        const web3 = new Web3(window.ethereum);
        web3.registerPlugin(new ChainlinkPlugin());

        const [price1, price2] = await Promise.all([
          web3.chainlink.getPrice(MainnetPriceFeeds[selectedCoin1.value]),
          web3.chainlink.getPrice(MainnetPriceFeeds[selectedCoin2.value])
        ]);

        const coin1 = {
          name: selectedCoin1.label,
          value: parseFloat(price1.answer) / 1e8
        };

        const coin2 = {
          name: selectedCoin2.label,
          value: parseFloat(price2.answer) / 1e8
        };

        const result = { coin1, coin2 };
        setComparisonResult(result);
        console.log("Comparison result:", result);
      } catch (error) {
        console.error("Error fetching prices for selected coins:", error);
        setError("Failed to fetch prices for selected coins. Please try again later.");
      }
    } else {
      console.log("One or both selected coins are null");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
      <h1 className="text-3xl font-bold">Compare Coin Prices</h1>
      </div>
      {error && (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
        <strong className="font-bold">Error:</strong>
        <span className="block sm:inline"> {error}</span>
      </div>
      )}
      <div className="mt-8 p-4 bg-white rounded-lg shadow-lg text-center">
      <h2 className="text-2xl font-bold mb-4">Select Coins</h2>
      <div className="flex items-center justify-center mb-4">
        <Select
        value={selectedCoin1}
        onChange={(option) => setSelectedCoin1(option)}
        options={coinOptions}
        className="w-32 mr-4"
        menuPortalTarget={document.body}
        styles={{
          control: (base) => ({
          ...base,
          borderRadius: "0.375rem",
          borderColor: "#d1d5db",
          boxShadow: "none",
          "&:hover": {
            borderColor: "#9ca3af",
          },
          }),
          menu: (base) => ({
          ...base,
          borderRadius: "0.375rem",
          overflow: "hidden",
          }),
          option: (base, state) => ({
          ...base,
          backgroundColor: state.isSelected ? "#4b5563" : "#ffffff",
          color: state.isSelected ? "#ffffff" : "#000000",
          "&:hover": {
            backgroundColor: "#e5e7eb",
          },
          }),
          menuPortal: base => ({ ...base, zIndex: 9999 })
        }}
        />
        <Select
        value={selectedCoin2}
        onChange={(option) => setSelectedCoin2(option)}
        options={coinOptions}
        className="w-32 mr-4"
        menuPortalTarget={document.body}
        styles={{
          control: (base) => ({
          ...base,
          borderRadius: "0.375rem",
          borderColor: "#d1d5db",
          boxShadow: "none",
          "&:hover": {
            borderColor: "#9ca3af",
          },
          }),
          menu: (base) => ({
          ...base,
          borderRadius: "0.375rem",
          overflow: "hidden",
          }),
          option: (base, state) => ({
          ...base,
          backgroundColor: state.isSelected ? "#4b5563" : "#ffffff",
          color: state.isSelected ? "#ffffff" : "#000000",
          "&:hover": {
            backgroundColor: "#e5e7eb",
          },
          }),
          menuPortal: base => ({ ...base, zIndex: 9999 })
        }}
        />
        <button onClick={handleCompare} className="px-4 py-2 bg-blue-500 text-white rounded-md">
        Compare
        </button>
      </div>
      
      </div>
      {comparisonResult && (
        <div className="mt-4">
        <h3 className="text-xl font-bold flex justify-center ">Comparison Result:</h3>
        <div className="flex justify-center m-5 p-5">
          <div className="w-64 p-4 bg-white rounded-lg shadow-lg">
          <p className="text-2xl font-bold">{comparisonResult.coin1.name}: <span className="text-blue-500">${comparisonResult.coin1.value.toFixed(2)}</span></p>
          </div>
          <div className="w-64 p-4 bg-white rounded-lg shadow-lg">
          <p className="text-2xl font-bold">{comparisonResult.coin2.name}: <span className="text-blue-500">${comparisonResult.coin2.value.toFixed(2)}</span></p>
          </div>
        </div>
        </div>
      )}
    </div>
    );
}