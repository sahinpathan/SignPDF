import React, { ReactNode, createContext, useState } from 'react';


interface SignatureContextType {
    signature: string;
    setSignature: React.Dispatch<React.SetStateAction<string>>;
  }
export const MyContext = createContext<SignatureContextType | undefined>(undefined);

export const SignatureProvider: React.FC<{children:ReactNode}> = ({ children }) => {
    const [signature, setSignature] = useState<string>("");
    console.log("signaturesignaturesignature",signature)
    return (
      <MyContext.Provider value={{ signature, setSignature }}>
        {children}
      </MyContext.Provider>
    );
};
