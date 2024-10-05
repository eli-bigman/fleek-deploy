import React, { useEffect, useState } from 'react';
import 'chartjs-adapter-date-fns';
import Table from './dashboardTable'

function App() {

  return (
   <>
   
   {/* <button onClick={fetchCryptoPrice} className='p-10 flex-auto'>Get Eth Price</button> */}
   <Table/>
   </>
  );
}

export default App;




// import "./App.css";
// import { Web3 } from "web3";
// import { ChainlinkPlugin, MainnetPriceFeeds } from "@chainsafe/web3-plugin-chainlink";
// import { useState } from "react";

// function App() {
//   // const [btcPrice, setBtcPrice] = useState("000");
//   // const [ethPrice, setEthPrice] = useState("000");
//   // const [USDTPrice, setUSDTPrice] = useState("000");
//   // // Initialize RPC/injected provider
//   // const web3 = new Web3(window.ethereum);

//   // async function requestAccount() {
//   //   const accounts = await web3.eth.requestAccounts();
//   //   console.log(accounts);
//   // }

//   // // Register the plugin
//   // web3.registerPlugin(new ChainlinkPlugin());

//   // async function getBTCPrice() {
//   //   // use plugin
//   //   //calling the plugin
//   //   const btcprice = await web3.chainlink.getPrice(MainnetPriceFeeds.BtcUsd);
//   //   //formating the variable
//   //   const formattedPrice = btcprice.answer.toString().substring(0, 5);
//   //   //updating front end
//   //   setBtcPrice(formattedPrice);
//   // }

//   // async function getETHPrice() {
//   //   // use plugin
//   //   //calling the plugin
//   //   const ethPrice = await web3.chainlink.getPrice(MainnetPriceFeeds.EthUsd);
//   //   //formating the variable
//   //   const formattedPrice = ethPrice.answer.toString().substring(0, 4);
//   //   //updating front end
//   //   setEthPrice(formattedPrice);
//   // }

//   // async function getUSDTPrice() {
//   //   // use plugin
//   //   //calling the plugin
//   //   const ethPrice = await web3.chainlink.getPrice(MainnetPriceFeeds.UsdtEth);
//   //   //formating the variable
//   //   const formattedPrice = ethPrice.answer.toString().substring(0, 4);
//   //   //updating front end
//   //   setUSDTPrice(formattedPrice);
//   // }

//   return (
//     <div className="App flex justify-center items-center h-screen">
//       <header className="App-header">
//       <div>
//         <input
        
//         placeholder="Enter amount"
//         className="rounded-lg p-2 m-3"
//         />
//         <select className="border border-yello-300 rounded-md px-2 py-1 m-5">
//         <option value="BTC">BTC</option>
//         <option value="ETH">ETH</option>
//         <option value="USDT">USDT</option>
//         </select>
//         <button className="bg-blue-500 hover:bg-blue-700 m-5 text-white font-bold py-2 px-4 rounded">
//         Convert
//         </button>

//         <p className="font-bold text-4xl mt-4">
//         Converted Amount: 0.00
//         </p>
//       </div>
//       </header>
//     </div>
//     );
// }

// export default App;
