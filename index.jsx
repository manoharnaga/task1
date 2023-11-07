import React, { useState, useEffect } from 'react';
import Web3 from 'web3';

function App() {
    const [contract, setContract] = useState(null);
    const [tokenId, setTokenId] = useState('');
    const [account, setAccount] = useState('');
    const [networkId, setNetworkId] = useState(0);

    useEffect(() => {
        async function loadWeb3() {
            if (window.ethereum) {
                window.web3 = new Web3(window.ethereum);
                await window.ethereum.enable();
            } else if (window.web3) {
                window.web3 = new Web3(window.web3.currentProvider);
            } else {
                console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
            }
        }

        loadWeb3();
    }, []);

    useEffect(() => {
        async function loadBlockchainData() {
            if (window.web3) {
                const web3 = window.web3;
                const accounts = await web3.eth.getAccounts();
                setAccount(accounts[0]);

                const networkId = await web3.eth.net.getId();
                setNetworkId(networkId);

                // Replace with your contract address
                const contractAddress = 'YOUR_CONTRACT_ADDRESS';

                const contract = new web3.eth.Contract(YourContractAbi, contractAddress);
                setContract(contract);
            }
        }

        loadBlockchainData();
    }, []);

    const mintNFT = async () => {
        if (!contract || !tokenId) {
            console.error('Contract or tokenId not initialized.');
            return;
        }

        try {
            await contract.methods.mintNFT(account, tokenId).send({ from: account });
            console.log(`Token with ID ${tokenId} minted successfully.`);
        } catch (error) {
            console.error('Error minting token:', error);
        }
    };

    return (
        <div>
            <h1>NFT Minting</h1>
            <p>Connected Account: {account}</p>
            <p>Network ID: {networkId}</p>
            <input
                type="number"
                placeholder="Token ID"
                value={tokenId}
                onChange={(e) => setTokenId(e.target.value)}
            />
            <button onClick={mintNFT}>Mint Token</button>
        </div>
    );
}

export default App;
