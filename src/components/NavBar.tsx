import React from 'react';
import { Link } from 'react-router-dom';
interface NavbarProps {
    web3Handler:()=>void;
    account:string;
    
    // Specify the type of walletAddress
  }

const Navbar:React.FC<NavbarProps> = ({ web3Handler, account }) => {
  return (<>
    <nav className="bg-gray-900 text-white py-4 flex items-center justify-between px-6">
      <div>
        <h1 className="text-purple-600 text-xl font-bold">NFT Marketplace</h1>
      </div>
      <div className="flex items-center space-x-4">
        <Link to={'/'}><button className="hover:text-gray-400">Home</button></Link>
        <Link to={'/create'}><button className="hover:text-gray-400">Create</button></Link>
        <Link to={'/collections'}><button className="hover:text-gray-400">My Collections</button></Link>
        <Link to={'/lists'}><button className="hover:text-gray-400">My Listings</button></Link>
      </div>
      <div>
        {
          account?
          (
          <p>{account.slice(0,5)}...{account.slice(35,-1)}</p>
          )
          :
          (
          <button onClick={web3Handler}>Connect Wallet</button>
          )
        }
      </div>
    </nav>
    </>
  );
};

export default Navbar;