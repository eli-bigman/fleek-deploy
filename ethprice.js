
import Web3 from 'web3';
import { ChainlinkPlugin, MainnetPriceFeeds } from "@chainsafe/web3-plugin-chainlink";


function App() {

  const web3 = new Web3(window.ethereum);
  web3.registerPlugin(new ChainlinkPlugin());

  const fetchCryptoPrice = async () => {
  const EthPrice = await web3.chainlink.getPrice(MainnetPriceFeeds.EthUsd); 
  console.log(EthPrice)
  }

fetchCryptoPrice()