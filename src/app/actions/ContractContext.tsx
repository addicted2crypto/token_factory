"use client"
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { ethers } from 'ethers';
import TipsContractABI from "../../abis/TipsContractABI.json";


const tipsContractAddress = "0x0730081d970DaB266f4265eC0D6f90d6cD67E2Fd";


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
