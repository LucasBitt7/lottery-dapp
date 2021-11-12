import "./App.css";
import Lottery from "./artifacts/contracts/Lottery.sol/Lottery.json";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3Modal from "web3modal";
import Web3 from "web3";
import { ethers } from "ethers";
import { useState, useEffect } from "react";

function App() {
  const [account, setAccount] = useState("");
  const [LOTTERY, setGetLotteryPrize] = useState();
  const [provider, setProvider] = useState();
  const [lottery, setLottery] = useState();
  const [amount, setAmount] = useState();

  const loadContracts = async () => {
    const lotteryContract = new ethers.Contract(
      "0x908394aE820f2Ec7BC2F3e737934ef3773b30D1C",
      Lottery.abi,
      provider
    );
    setLottery(lotteryContract);
  };

  const connectWallet = async () => {
    const providerOptions = {
      walletconnect: {
        package: WalletConnectProvider, // required
        options: {
          infuraId: "346478d1cdee43b6acc5548ada3fcb98", // required
        },
      },
    };
    const web3Modal = new Web3Modal({
      providerOptions, // required
      theme: {
        background: "rgb(39, 49, 56)",
        main: "rgb(199, 199, 199)",
        secondary: "rgb(136, 136, 136)",
        border: "rgba(195, 195, 195, 0.14)",
        hover: "rgb(16, 26, 32)",
      },
    });
    const ethereum = await web3Modal.connect();
    const web3 = new Web3(ethereum);

    setProvider(new ethers.providers.Web3Provider(window.ethereum));
    setAccount(await window.ethereum.selectedAddress);
  };

  const loadWeb3 = async () => {
    connectWallet().then(() => {
      loadContracts();
      console.log("thats fine bro");
    });
  };

  const Enter = async (amount) => {
    const providert = new ethers.providers.Web3Provider(window.ethereum);
    const signer = providert.getSigner();
    const lotteryContract = new ethers.Contract(
      "0x908394aE820f2Ec7BC2F3e737934ef3773b30D1C",
      Lottery.abi,
      signer
    );
    const enterTransaction = lotteryContract.enter({ value: amount });
    await enterTransaction.wait;
  };
  const GetLotteryPrize = async () => {
    const providert = new ethers.providers.Web3Provider(window.ethereum);
    const signer = providert.getSigner();
    const lotteryContract = new ethers.Contract(
      "0x908394aE820f2Ec7BC2F3e737934ef3773b30D1C",
      Lottery.abi,
      signer
    );
    const getLotteryPrize = await lotteryContract.getContractBalance();
    await getLotteryPrize.wait;
    setGetLotteryPrize(await getLotteryPrize);
  };

  return (
    <div className="App">
      <header className="App-header">
        {!provider ? (
          <button
            type="button"
            className="connectWallet"
            onClick={() => {
              loadWeb3();
            }}
          >
            Connect
          </button>
        ) : (
          <div className="connectWallet">Account: {account}</div>
        )}
        <h3>Lottery</h3>
        <h10>0x908394aE820f2Ec7BC2F3e737934ef3773b30D1C at rinkeby</h10>
        <div className="for">
          <h1>Enter on lottery</h1>
          <input
            onChange={(event) => {
              setAmount(event.target.value);
            }}
            type="text"
            className="form-control"
            id="symbol"
            placeholder=""
          />
          <button
            type="button"
            className="send"
            onClick={() => {
              Enter();
            }}
          >
            Enter w Ether
          </button>
        </div>
        <input
          readOnly
          value={LOTTERY}
          type="text"
          className="form-control"
          id="symbol"
          placeholder=""
        />
        <button
          type="button"
          className="send"
          onClick={() => {
            GetLotteryPrize();
          }}
        >
          LotteryPRixe
        </button>
      </header>
    </div>
  );
}

export default App;
