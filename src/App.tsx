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
import { UserProvider, useUserContext } from "./contexts/UserContext";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { useEffect } from "react";
// @ts-ignore
import { db } from "./firebase";

declare global {
  interface Window {
      Telegram:any;
  }
}

const AppWrapper: React.FC = () => {
  const { registerUser, user } = useUserContext();
  useEffect(() => {
    const params = new URLSearchParams(window.Telegram.WebApp.initData);
    const userData = Object.fromEntries(params);
    if (userData.user) {
      const userInformation = JSON.parse(userData.user);
      if (userInformation.id && !user) {
        const usernameFirstName = userInformation.username ? userInformation.username : userInformation.first_name;
        registerUser(userInformation.id, usernameFirstName);

        const searchParams = new URLSearchParams(window.location.search);
        const queryString = searchParams.toString();
        if(queryString) {
          const refId = searchParams.get("tgWebAppStartParam");
          if (refId) {
            const refIdString = extractRefIdNumber(refId);
            if (refIdString !== null) {
              saveInvitation(refIdString, userInformation.id, usernameFirstName);
            }
          }
        }
      }
    }
  }, []);

  const saveInvitation = async (refId: string, invitedUserId: number, invitedUsername: string) => {
    try {
      const refUserDoc = doc(db, "users", refId);
      await updateDoc(refUserDoc, {
        invitedUsers: arrayUnion({ userId: invitedUserId, username: invitedUsername })
      });
      console.log("Invitation saved successfully!");
    } catch (error) {
      console.error("Error saving invitation: ", error);
    }
  };

  function extractRefIdNumber(refIdString: string) {
    const refIdPattern = /^refId(\d+)$/;
    const match = refIdString.match(refIdPattern);
    
    if (match) {
      return match[1];
    } else {
      return null;
    }
  }

  return null;
};

function App() {
  const { network } = useTonConnect();

  if(window.Telegram) {
    const tg = window.Telegram.WebApp;
    if (tg) {
      tg.enableClosingConfirmation();
      tg.expand();
    }
  }

  return (
    <UserProvider>
      <AppWrapper />
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
