"use client"
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { ethers } from 'ethers';
import TipsContractABI from "../../abis/TipsContractABI.json";


const tipsContractAddress = "0xd65aD82b628B0ec053AE83C89cEb6cD5D9420321";


const ContractContext = createContext<ethers.Contract | null>(null);

export const useContract = () => useContext(ContractContext);

interface ContractProviderProps {
  children: ReactNode;
}

export const ContractProvider: React.FC<ContractProviderProps> = ({ children }) => {
  const [contract, setContract] = useState<ethers.Contract | null>(null);

  useEffect(() => {
    const initContract = async () => {
      try {
        if (typeof window !== "undefined" && window.ethereum) {
          const provider = new ethers.BrowserProvider(window.ethereum);
          const signer = await provider.getSigner();
          const contractInstance = new ethers.Contract(tipsContractAddress, TipsContractABI, signer);
          setContract(contractInstance);
          console.log("Contract initialized:", contractInstance);
        }
      } catch (error) {
        console.error("Error initializing contract:", error);
      }
    };

    initContract();
  }, []);

  return (
    <ContractContext.Provider value={contract}>
      {children}
    </ContractContext.Provider>
  );
};
