import React, { createContext, useState, useContext, ReactNode } from 'react';

interface User {
    userId: string;
    token: string;
    username: string;
    created_at: string;
}

interface UserContextProps {
    user: User | null;
    // setUser: React.Dispatch<React.SetStateAction<User | null>>;
    // registerUser: (user_Id: number, username: string, reference?: string) => void;
    // handleUpdateMetaFields: (updatedFields: Partial<User>) => void;
    // refLoginUser: (userID: string, invitedUserId: string, invitedUsername: string) => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    return (
        <UserContext.Provider value={{ user }}>
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