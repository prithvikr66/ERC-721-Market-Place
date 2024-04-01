# NFT Marketplace

This project is a decentralized marketplace for trading non-fungible tokens (NFTs), built using Solidity for smart contracts, Hardhat for development, React with TypeScript for the frontend, Tailwind CSS for styling, and Ethers.js for integrating with Ethereum.

## Installation

### Traditional Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/prithvikr66/ERC-721-Market-Place.git
   ```

2. Navigate to the project directory:
   ```bash
   cd ERC-721-Market-Place
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Rename `.env.example` to `.env` and fill in the required environment variables.

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Open your browser and navigate to `http://localhost:5173` to view the application.

### Docker Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/prithvikr66/ERC-721-Market-Place.git
   ```

2. Navigate to the project directory:
   ```bash
   cd ERC-721-Market-Place
   ```

3. Build the Docker image:
   ```bash
   docker build -t nft-marketplace .
   ```

4. Run the Docker container:
   ```bash
   docker run -p 5173:5173 --network host nft-marketplace
   ```

5. Open your browser and navigate to `http://localhost:5173` to view the application.

## Environment Variables

This project uses environment variables for configuration. Copy the `.example.env` file to `.env` and fill in the required variables.

```
VITE_API_PINATA_JWT_KEY ="Your_Pinata_API_Key_Here"
```

Replace `Your_Pinata_API_Key_Here` with your actual Pinata API key in the clone URLs provided. Additionally, customize the environment variables according to your project's requirements.
