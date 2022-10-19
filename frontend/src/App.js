import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import WalletInputs from './components/WalletInputs';
import NativeTokens from './components/NativeTokens';
import Tokens from './components/Tokens';
import PortfolioValue from './components/PortfolioValue';
import TransferHistory from './components/TransferHistory';
import Nfts from './components/Nfts';
import { Avatar, Tab, TabList } from '@web3uikit/core';

function App() {

  const [wallet, setWallet] = useState("");
  const [chain, setChain] = useState("0x1");
  const [nativeBalance, setNativeBalance] = useState(0);
  const [nativeValue, setNativeValue] = useState(0);
  const [tokens, setTokens] = useState([]);
  const [transfers, setTransfers] = useState([]);
  const [nfts, setNfts] = useState([]);
  const [filteredNfts, setFilteredNfts] = useState([]);

  return (
    <div className="App">
      <WalletInputs
        chain={chain}
        setChain={setChain}
        wallet={wallet}
        setWallet={setWallet}
      />
      <div className='content'>
        <div className='walletInfo'>
          {wallet.length === 42 &&
            <>
              <div>
                <Avatar isRounded size={130} theme="image"></Avatar>
                <h2>{wallet.slice(0, 6)}...{wallet.slice(36)}</h2>
              </div>
              <PortfolioValue
                nativeValue={nativeValue}
                tokens={tokens}
              />
            </>
          }
        </div>
        <TabList>
          <Tab tabName={"Tokens"} tabKey={1}>
            <NativeTokens
              wallet={wallet}
              chain={chain}
              nativeBalance={nativeBalance}
              setNativeBalance={setNativeBalance}
              nativeValue={nativeValue}
              setNativeValue={setNativeValue}
            />
            <Tokens
              wallet={wallet}
              chain={chain}
              tokens={tokens}
              setTokens={setTokens}
            />
          </Tab>
          <Tab tabName={"Transfers"} tabKey={2}>
            <TransferHistory
              wallet={wallet}
              chain={chain}
              transfers={transfers}
              setTransfers={setTransfers}
            />
          </Tab>
          <Tab tabName={"NFTs"} tabKey={3}>
            <Nfts
              wallet={wallet}
              chain={chain}
              nfts={nfts}
              setNfts={setNfts}
              filteredNfts={filteredNfts}
              setFilteredNfts={setFilteredNfts}
            />
          </Tab>
        </TabList>
      </div>
    </div>
  );
}

export default App;
