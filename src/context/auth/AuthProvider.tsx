import React, { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { AuthContext } from "./authContext";
import { auth } from "../../firebase";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [isAuthorizing, setIsAuthorizing] = useState<boolean>(true);
  
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            const handleAuthChange = () => {
                if (user) {
                    setCurrentUser(user);
                } else {
                    setCurrentUser(null);
                }
        
                setIsAuthorizing(false);
            };
        
            handleAuthChange();
        });
      
        return () => unsubscribe();
    }, []);
    
    return (
        <AuthContext.Provider value={{ currentUser, isAuthorizing }}>
            {children}
        </AuthContext.Provider>
    );
  };
  

export default AuthProvider;