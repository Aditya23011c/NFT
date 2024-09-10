
window.addEventListener('load', async () => {
    // Check if Web3 is injected by MetaMask
    if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        
        document.getElementById('connectWallet').addEventListener('click', async () => {
            const accounts = await web3.eth.getAccounts();
            document.getElementById('walletAddress').textContent = 'Connected Account: ${account[0]}';
        });

        document.getElementById('buyButton').addEventListener('click', async () => {
            const tokenId = document.getElementById('buyTokenId').value;
            const accounts = await web3.eth.getAccounts();
            const contract = new web3.eth.Contract(abi, contractAddress); // Replace with your contract ABI and address
            
            // Assuming the contract has a buyNFT method
            await contract.methods.buyNFT(tokenId).send({ from: accounts[0] });
        });

        document.getElementById('sellButton').addEventListener('click', async () => {
            const tokenId = document.getElementById('sellTokenId').value;
            const price = web3.utils.toWei(document.getElementById('sellPrice').value, 'ether');
            const accounts = await web3.eth.getAccounts();
            const contract = new web3.eth.Contract(abi, contractAddress); // Replace with your contract ABI and address
            
            // Assuming the contract has a sellNFT method
            await contract.methods.sellNFT(tokenId, price).send({ from: accounts[0] });
        });
    } else {
        alert('Please install MetaMask!');
    }
});
document.addEventListener('DOMContentLoaded', () => {
    const nftGallery = document.getElementById('nftGallery');

    // Example NFT data
    const nftData = [
        {
            tokenId: '1',
            price: '0.5',
            imageUrl: "https://th.bing.com/th?id=OIP.xgNmzxMwSrboSTa7nMVgHwHaEo&w=316&h=197&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2" // Replace with actual NFT image URLs
        },
        {
            tokenId: '2',
            price: '1.0',
            imageUrl: "https://ts3.mm.bing.net/th?id=OIP.UxLGKLewv1iaiiMpU0cbuQHaK-&pid=15.1"// Replace with actual NFT image URLs
        },
        {
            tokenId: '3',
            price: '100',
            imageUrl: "https://th.bing.com/th/id/OIP.mXIf6uz7TZKwlt6SYSA4kgAAAA?w=282&h=183&c=7&r=0&o=5&dpr=1.3&pid=1.7"// Replace with actual NFT image URLs
        }   
        
        // Add more NFT data as needed
    ];

    // Function to display NFTs
    function displayNFTs(nfts) {
        nftGallery.innerHTML = ''; // Clear previous NFTs
        nfts.forEach(nft => {
            const nftItem = document.createElement('div');
            nftItem.className = 'nft-item';
            nftItem.innerHTML = `
                <img src="${nft.imageUrl}" alt="NFT Image">
                <div class="info">
                    <p>Token ID: ${nft.tokenId}</p>
                    <p>Price: ${nft.price} ETH</p>
                </div>
            `;
            nftGallery.appendChild(nftItem);
        });
    }

    // Display NFTs
    displayNFTs(nftData);
});
