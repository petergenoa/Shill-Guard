import React, { createContext, useState, useContext, ReactNode } from 'react';
import { db } from '../firebase';
import { doc, setDoc, getDoc, updateDoc, arrayUnion, Timestamp, collection } from "firebase/firestore";

interface InvitedUsers {
  username: string;
  userId: number;
  claimed: boolean;
}

interface EarnInfo {
  tonWalletConnected: boolean;
  tonWallet: string;
  followOnX: boolean;
  followOnTelegram: boolean;
  followOnYoutube: boolean;
  followXDetectBot: boolean;
  followInstagram: boolean;
  followDiscord: boolean;
  followShillDetectBot: boolean;
  followNewsDetectBot: boolean;
  visitWebsite: boolean;
  visitCMC: boolean;
  visitCoingGecko: boolean;
  visitToken: boolean;
}

interface User {
    userId: string;
    username: string;
    createdAt: Date;
    coins: number;
    invitedUsers: InvitedUsers[];
    earnInfo: EarnInfo;
}

interface UserContextProps {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    registerUser: (user_Id: number, username: string, reference?: string) => void;
    updateUser: (user: User) => Promise<void>;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    const registerUser = async (user_Id: number, username: string, reference?: string) => {
      const userId = user_Id.toString();
      const userDoc = doc(db, "users", userId);
      const userSnapshot = await getDoc(userDoc);
      
      if (!userSnapshot.exists()) {
        const newUser: User = {
          userId,
          username,
          createdAt: new Date(),
          coins: 0,
          invitedUsers: [],
          earnInfo: {
            tonWalletConnected: false,
            tonWallet: '',
            followOnX: false,
            followOnTelegram: false,
            followOnYoutube: false,
            followXDetectBot: false,
            followInstagram: false,
            followDiscord: false,
            followShillDetectBot: false,
            followNewsDetectBot: false,
            visitWebsite: false,
            visitCMC: false,
            visitCoingGecko: false,
            visitToken: false
          }
        };
        await setDoc(userDoc, newUser);
        setUser(newUser);
        console.log("User registered successfully!");
      } else {
        const userData = userSnapshot.data() as User;
        setUser(userData);
        console.log("User already registered.");
      }
    };

    const updateUser = async (user: User) => {
      const userDoc = doc(db, 'users', user.userId);
      await setDoc(userDoc, user, { merge: true });
      setUser(user);
    };

    return (
      <UserContext.Provider value={{ user, setUser, registerUser, updateUser }}>
        {children}
      </UserContext.Provider>
    );
  };

export const useUserContext = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
      throw new Error('useUserContext must be used within a UserProvider');
    }
    return context;
};