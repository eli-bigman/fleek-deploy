import React, { useState, useEffect, useCallback } from "react";
import Web3 from 'web3';
import { ChainlinkPlugin, MainnetPriceFeeds } from "@chainsafe/web3-plugin-chainlink";
import Select from 'react-select';

export default function Dashboard() {
  const [cryptoPrices, setCryptoPrices] = useState([
    {
      name: "Bitcoin",
      symbol: "BTC",
      price: 0,
      selectedCoin: "BTC",
      amount: 1,
    },
    {
      name: "Ethereum",
      symbol: "ETH",
      price: 0,
      selectedCoin: "ETH",
      amount: 1,
    },
    {
      name: "Aave",
      symbol: "AAVE",
      price: 0,
      selectedCoin: "AAVE",
      amount: 1,
    },
    {
      name: "Uniswap",
      symbol: "UNI",
      price: 0,
      selectedCoin: "UNI",
      amount: 1,
    },
    {
      name: "Dai",
      symbol: "DAI",
      price: 0,
      selectedCoin: "DAI",
      amount: 1,
    },
    {
      name: "USD Coin",
      symbol: "USDC",
      price: 0,
      selectedCoin: "USDC",
      amount: 1,
    },
    {
      name: "Compound",
      symbol: "COMP",
      price: 0,
      selectedCoin: "COMP",
      amount: 1,
    },
    {
      name: "Maker",
      symbol: "MKR",
      price: 0,
      selectedCoin: "MKR",
      amount: 1,
    },
    {
      name: "Yearn Finance",
      symbol: "YFI",
      price: 0,
      selectedCoin: "YFI",
      amount: 1,
    },
  ]);
  const [coinOptions, setCoinOptions] = useState([]);
  const [error, setError] = useState(null);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [selectedCoin1, setSelectedCoin1] = useState(null);
  const [selectedCoin2, setSelectedCoin2] = useState(null);
  const [comparisonResult, setComparisonResult] = useState(null);

  const fetchCryptoPrices = async () => {
    try {
      console.log("Fetching crypto prices...");
      const web3 = new Web3(window.ethereum);
      web3.registerPlugin(new ChainlinkPlugin());

      const prices = await Promise.all([
        web3.chainlink.getPrice(MainnetPriceFeeds.BtcUsd),
        web3.chainlink.getPrice(MainnetPriceFeeds.EthUsd),
        web3.chainlink.getPrice(MainnetPriceFeeds.AaveUsd),
        web3.chainlink.getPrice(MainnetPriceFeeds.UniUsd),
        web3.chainlink.getPrice(MainnetPriceFeeds.DaiUsd),
        web3.chainlink.getPrice(MainnetPriceFeeds.UsdcUsd),
        web3.chainlink.getPrice(MainnetPriceFeeds.CompUsd),
        web3.chainlink.getPrice(MainnetPriceFeeds.MkrUsd),
        web3.chainlink.getPrice(MainnetPriceFeeds.YfiUsd),
      ]);

      console.log("Prices fetched:", prices);

      setCryptoPrices(prevPrices => prevPrices.map((coin, index) => {
        const priceData = prices[index];
        const price = priceData ? parseFloat(priceData.answer) / 1e8 : coin.price;
        return {
          ...coin,
          price: price,
        };
      }));
      setError(null); 
    } catch (error) {
      console.error("Error fetching crypto prices:", error);
      setError("Failed to fetch cryptocurrency prices. Please try again later.");
    } finally {
      setButtonClicked(false);
    }
  };

  useEffect(() => {
    fetchCryptoPrices();
  }, []);

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

  const handleCompare = () => {
    if (selectedCoin1 && selectedCoin2) {
      const coin1 = cryptoPrices.find(coin => coin.symbol === selectedCoin1.value);
      const coin2 = cryptoPrices.find(coin => coin.symbol === selectedCoin2.value);
      console.log("Comparing coins:", coin1, coin2);
      if (coin1 && coin2) {
        const result = {
          coin1: {
            name: coin1.name,
            value: coin1.price,
            amount: coin1.amount,
            total: coin1.price * coin1.amount
          },
          coin2: {
            name: coin2.name,
            value: coin2.price,
            amount: coin2.amount,
            total: coin2.price * coin2.amount
          }
        };
        setComparisonResult(result);
      }
    }
  };

  const handleUpdatePrices = () => {
    fetchCryptoPrices();
  };

  const handleAmountChange = (e, index) => {
    const newAmount = parseFloat(e.target.value);
    setCryptoPrices(prevPrices => prevPrices.map((coin, i) => (
      i === index ? { ...coin, amount: newAmount } : coin
    )));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Cryptocurrency Dashboard</h1>
        <button onClick={handleUpdatePrices} className="px-4 py-2 bg-blue-500 text-white rounded-md">
          Update Prices
        </button>
      </div>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
          <strong className="font-bold">Error:</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse rounded-lg overflow-hidden shadow-lg">
          <thead>
            <tr className="bg-black text-white">
              <th className="px-4 py-3 text-left">Coin Name</th>
              <th className="px-4 py-3 text-right">Price (USD)</th>
              <th className="px-4 py-3 text-right">Amount</th>
              <th className="px-4 py-3 text-right">Amount Price</th>
            </tr>
          </thead>
          <tbody>
            {cryptoPrices.map((coin, index) => (
              <tr
                key={index}
                className={`border-b ${index % 2 === 0 ? "bg-white" : "bg-gray-100"} text-black`}>
                <td className="px-4 py-3 text-left font-medium">
                  {coin.name} ({coin.symbol})
                </td>
                <td className="px-4 py-3 text-right">${coin.price.toFixed(2)}</td>
                <td className="px-4 py-3 text-right">
                  <input
                    type="number"
                    value={coin.amount}
                    onChange={(e) => handleAmountChange(e, index)}
                    className="w-24 text-right border rounded-md px-2 py-1" />
                </td>
                <td className="px-4 py-3 text-right">
                  ${(coin.price * coin.amount).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
    </div>
  );
}