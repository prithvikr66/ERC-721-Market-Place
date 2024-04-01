import './App.css';
import { ethers } from 'ethers';
import { useState } from 'react';
import { nftAbi, marketPlaceAbi } from './abi';
import Navbar from './components/NavBar.tsx';
import {createBrowserRouter, RouterProvider , BrowserRouter, Routes, Route} from "react-router-dom";
import { Home } from './pages/Home';
import Create from './pages/Create.tsx';
import { Listing } from './pages/Listing.tsx';
import { ChakraProvider } from '@chakra-ui/react'
import Collections from './pages/Collections.tsx';
declare global {
  interface Window {
    ethereum?: any; 
  }
}

function App() {
  
  const [account, setAccount] = useState<string | null>(null);
  const [nft, setNft] = useState<any | null>(null);
  const [marketplace, setMarketPlace] = useState<any | null>(null);

  const web3Handler = async () => {
    try {
      if (window.ethereum) { 
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        loadContracts(signer);
      } else {
        console.error('Ethereum provider not found.');
      }
    } catch (error) {
      console.error('Error in web3Handler:', error);
    }
  };
  const loadContracts = async (signer: ethers.Signer) => {
    try {
      const nftContract = new ethers.Contract(
        '0x2f73e9e01f50f844e7618d2cb8fcbefe00fcec79',
        nftAbi,
        signer
      );
      const marketplaceContract = new ethers.Contract(
        '0x507dcbfdd9618f41f1b516a05a87cf3b28e5460f',
        marketPlaceAbi,
        signer
      );
      setNft(nftContract);
      setMarketPlace(marketplaceContract);
    } catch (error) {
      console.error('Error in loadContracts:', error);
    }
  };

  return <>
  <ChakraProvider>
  <div className=' bg-slate-200 min-h-screen'>
  <BrowserRouter>
  <Navbar account={account} web3Handler={web3Handler} />
  <Routes>
    <Route path='/' element={<Home marketplace={marketplace} nft={nft}/>}/>
     <Route path='/create' element={<Create marketplace={marketplace} nft={nft}/>}/>
     <Route path ='/lists' element={<Listing marketplace={marketplace} nft={nft} account={account}/>}/>
     <Route path='/collections' element={<Collections account={account} marketplace={marketplace} nft={nft}/>}></Route>
  </Routes>
  </BrowserRouter>
  </div>
  </ChakraProvider>
  </>;
}

export default App;
