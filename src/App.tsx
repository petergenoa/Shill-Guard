import "./App.css";
import { TonConnectButton } from "@tonconnect/ui-react";
import { Counter } from "./components/Counter";
import { Jetton } from "./components/Jetton";
import { TransferTon } from "./components/TransferTon";
import styled from "styled-components";
import { Button, FlexBoxCol, FlexBoxRow } from "./components/styled/styled";
import { useTonConnect } from "./hooks/useTonConnect";
import { CHAIN } from "@tonconnect/protocol";
import "@twa-dev/sdk";
import { BrowserRouter as Router, Routes, Route, NavLink, Navigate } from 'react-router-dom';
import Home from "./pages/Home";
import Statistics from "./pages/Statistics";
import Tasks from "./pages/Tasks";
import More from "./pages/More";
import NavBar from "./pages/NavBar";
import { UserProvider } from "./contexts/UserContext";

function App() {
  const { network } = useTonConnect();

  return (
    <UserProvider>
      {/* <AppWrapper /> */}
      <div id="#root">
        <Router>
          <div className="App">
            <div className="Content">
              {/* <TonConnectButton />
              <button>
                {network ? (network === CHAIN.MAINNET ? 'mainnet' : 'testnet') : 'N/A'}
              </button> */}
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/statistics" element={<Statistics />} />
                <Route path="/tasks" element={<Tasks />} />
                <Route path="/more" element={<More />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </div>
            <NavBar />
          </div>
        </Router>
      </div>
    </UserProvider>
  );
}

export default App;
