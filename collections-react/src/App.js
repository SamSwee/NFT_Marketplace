import "./App.css";
import { Contract, ethers } from "ethers";
import { useEffect, useState } from "react";
import contractABI from "./contractABI.json";
 
const contractAddress = "0x2cdEf3A39F14DDB9Bf2ec148680DEa67D88338bC";
 
function App() {
 
  const [account, setAccount] = useState(null);
  const [isWalletInstalled, setIsWalletInstalled] = useState(false);
  const [NFTContract, setNFTContract] = useState(null);
  // state for whether app is minting or not.
  const [isMinting, setIsMinting] = useState(false);
 
  useEffect(() => {
    if (window.ethereum) {
      setIsWalletInstalled(true);
    }
  }, []);
 
  useEffect(() => {
      function initNFTContract() {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        setNFTContract(new Contract(contractAddress,contractABI.abi,signer));
      }
      initNFTContract();
  }, [account]);
 
 
  async function connectWallet() {
    window.ethereum
      .request({
        method: "eth_requestAccounts",
      })
      .then((accounts) => {
        setAccount(accounts[0]);
      })
      .catch((error) => {
        alert("Something went wrong");
      });
  }

  const data = [
    {
      url: "./assets/images/1.jpg",
      param: "handleMint('https://gateway.pinata.cloud/ipfs/QmSuoKpxUENVVYZZNPR6wB5rKStFVCXmF4SyibVXsc8nMT?_gl=1*1batr0q*_ga*MTIwMzI0MDcwMC4xNjc3NzQ5NDQ1*_ga_5RMPXG14TE*MTY3Nzc0OTQ0NC4xLjEuMTY3Nzc0OTg3Ny42MC4wLjA.')",
    },
    {
      url: "./assets/images/2.jpg",
      param: "handleMint('https://gateway.pinata.cloud/ipfs/QmPyjh2Fq9TQ2R4K759nAXe3PGJCzKJRAsJaRCEQeqKynZ?_gl=1*1batr0q*_ga*MTIwMzI0MDcwMC4xNjc3NzQ5NDQ1*_ga_5RMPXG14TE*MTY3Nzc0OTQ0NC4xLjEuMTY3Nzc0OTg3Ny42MC4wLjA.')",
    },
    {
      url: "./assets/images/3.jpg",
      param: "handleMint('https://gateway.pinata.cloud/ipfs/QmPyjh2Fq9TQ2R4K759nAXe3PGJCzKJRAsJaRCEQeqKynZ?_gl=1*1batr0q*_ga*MTIwMzI0MDcwMC4xNjc3NzQ5NDQ1*_ga_5RMPXG14TE*MTY3Nzc0OTQ0NC4xLjEuMTY3Nzc0OTg3Ny42MC4wLjA.')",
    },
    {
      url: "./assets/images/4.jpg",
      param: "handleMint('https://gateway.pinata.cloud/ipfs/Qmdq23YLg2CeoAW8ULRmXngDX4sRGQJBapzqpFBdafhZt1?_gl=1*1l8bsuo*_ga*MTIwMzI0MDcwMC4xNjc3NzQ5NDQ1*_ga_5RMPXG14TE*MTY3Nzc0OTQ0NC4xLjEuMTY3Nzc0OTg3Ny42MC4wLjA.')",
    },
    {
      url: "./assets/images/5.jpg",
      param: "handleMint('https://gateway.pinata.cloud/ipfs/QmNp9jECH9MfA7NcMZ6aYKkSoA8BjL96cwFrKbizU7fJMg?_gl=1*1l8bsuo*_ga*MTIwMzI0MDcwMC4xNjc3NzQ5NDQ1*_ga_5RMPXG14TE*MTY3Nzc0OTQ0NC4xLjEuMTY3Nzc0OTg3Ny42MC4wLjA.')",
    },
  ];
 
  async function withdrawMoney(){
    try {
      const response = await NFTContract.withdrawMoney();
      console.log("Received: ", response);
    } catch (err) {
      alert(err);
    }
  }
 
  async function handleMint(tokenURI) {
    setIsMinting(true);
      try {
        const options = {value: ethers.utils.parseEther("0.01")};
        const response = await NFTContract.mintNFT(tokenURI, options);
        console.log("Received: ", response);
      } catch (err) {
        alert(err);
      }
      finally {
        setIsMinting(false);
      }
  }
 
  if (account === null) {
    return (
      <>
        <div className="container">
          <br/>
          <h1>🔮 Suzaku's</h1>
          <h2>NFT Marketplace</h2>
          <p>Buy an NFT from our marketplace.</p>

          {isWalletInstalled ? (
            <button onClick={connectWallet}>Connect Wallet</button>
          ) : (
            <p>Install Metamask wallet</p>
          )}
        </div>
      </>
    );
  }
 
  return (
    <>
      <div className="container">
        <br/>
        <h1>🔮 Suzaku's</h1>
      
        <h2>NFT Marketplace</h2>
          {data.map((item, index) => (
            <div className="imgDiv">
              <img
                src={item.url}
                key={index}
                alt="images"
                width={250}
                height={250}
              />
              <button isLoading={isMinting}
                onClick={() => {
                  eval(item.param);
                }}
              >
                Mint - 0.01 gETH
              </button>
            </div>
          ))}
          <br/>
            <button 
              onClick={() => {
                withdrawMoney();
              }}
            >
              Withdraw Money from Contract
            </button>
      </div>
    </>
  );
}
 
export default App;