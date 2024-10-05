import React, { useState, useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import "chartjs-adapter-date-fns";
import Web3 from 'web3';
import { ChainlinkPlugin, MainnetPriceFeeds } from "@chainsafe/web3-plugin-chainlink";

function Graph() {
  const chartRef = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);
  const [coinPrices, setCoinPrices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPrices = async () => {
    console.log("Fetching prices...");
    setLoading(true);
    setError(null);
    try {
      const web3 = new Web3(window.ethereum);
      web3.registerPlugin(new ChainlinkPlugin());

      const priceFeeds = [
        { name: "Bitcoin", feed: MainnetPriceFeeds.BtcUsd },
        { name: "Ethereum", feed: MainnetPriceFeeds.EthUsd },
        { name: "Chainlink", feed: MainnetPriceFeeds.LinkUsd },
        { name: "Aave", feed: MainnetPriceFeeds.AaveUsd },
        { name: "Uniswap", feed: MainnetPriceFeeds.UniUsd },
        { name: "Dai", feed: MainnetPriceFeeds.DaiUsd },
        { name: "USD Coin", feed: MainnetPriceFeeds.UsdcUsd },
        { name: "Compound", feed: MainnetPriceFeeds.CompUsd },
        { name: "Maker", feed: MainnetPriceFeeds.MkrUsd },
        { name: "Yearn Finance", feed: MainnetPriceFeeds.YfiUsd },
      ];

      const prices = await Promise.all(
        priceFeeds.map(feed => web3.chainlink.getPrice(feed.feed))
      );

      const formattedPrices = prices.map((priceData, index) => ({
        name: priceFeeds[index].name,
        price: parseFloat(priceData.answer) / 1e8,
      }));

      setCoinPrices(formattedPrices);
      console.log("Prices fetched successfully:", formattedPrices);
    } catch (error) {
      console.error("Error fetching prices:", error);
      setError("Failed to fetch cryptocurrency prices. Please try again later.");
    } finally {
      setLoading(false);
      console.log("Fetching prices completed.");
    }
  };

  const updateChart = (prices) => {
    if (chartInstance) {
      chartInstance.destroy();
    }

    if (chartRef.current) {
      console.log("Updating chart...");
      const ctx = chartRef.current.getContext("2d");
      const newChartInstance = new Chart(ctx, {
        type: "line",
        data: {
          labels: prices.map((coin) => coin.name),
          datasets: [
            {
              label: "Coin Prices",
              data: prices.map((coin) => coin.price),
              borderColor: "rgba(75, 192, 192, 1)",
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              fill: true,
              tension: 0.4,
              pointRadius: 5,
              pointBackgroundColor: "rgba(75, 192, 192, 1)",
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Price (USD)',
              },
            },
            x: {
              title: {
                display: true,
                text: 'Coin Name',
              },
            },
          },
          plugins: {
            legend: {
              display: true,
              position: 'top',
            },
            tooltip: {
              enabled: true,
              mode: 'index',
              intersect: false,
            },
          },
        },
      });

      setChartInstance(newChartInstance);
      console.log("Chart updated successfully.");
    } else {
      console.log("Chart reference is null.");
    }
  };

  useEffect(() => {
    fetchPrices();
  }, []);

  useEffect(() => {
    if (chartRef.current) {
      console.log("Canvas element is rendered.");
      if (coinPrices.length > 0) {
        updateChart(coinPrices);
      }
    } else {
      console.log("Canvas element is not rendered yet.");
    }
  }, [chartRef.current, coinPrices]);

  return (
    <>
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-1 flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Graph of Coins
          </h1>
          <button
            onClick={() => {
              console.log("Update button clicked.");
              fetchPrices();
            }}
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Update Graph
          </button>
        </div>
      </header>
      <div className="flex-1 m-5 pb-5" style={{ height: '60vh' }}>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
            <strong className="font-bold">Error:</strong>
            <span className="block sm:inline"> {error}</span>
          </div>
        )}
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-blue-500"></div>
          </div>
        ) : (
          <canvas ref={chartRef} />
        )}
      </div>
    </>
  );
}

export default Graph;