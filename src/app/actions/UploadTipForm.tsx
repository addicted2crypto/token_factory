import React, { useState } from 'react';
import { ethers } from 'ethers';
import { Button } from '@/components/ui/button';

interface UploadTipFormProps {
  contract: ethers.Contract | null;
}

const contract = "0xa8be1390d62b3e659ad060518d54c6b019a3cf0f";
const UploadTipForm: React.FC<UploadTipFormProps> = ({ contract }) => {
  const [content, setContent] = useState('');

  const handleUploadTip = async () => {
    if(!contract){
      console.log("Contract is broke, do better");
      return;
    }

    try {
      try {
        console.log("Starting upload tip process.");
        console.log("Content:", content);
        console.log("Contract address:", contract.address);

        
      const tx = await contract.uploadTip(content, { value: ethers.parseEther('0.69') });
        console.log("Transaction initiated. Waiting on wallet signature..");

      await tx.wait();
        console.log("Transaction confirmed LFG.")

      setContent('');
    } catch (error){
      console.error("Error uploading tip:", error)
    }
  } catch {
      console.error("Contract is approved.");
    }
  };

  return (
    <div className='p-3 space-x-1'>
      <textarea value={content} className="rounded-md w-2/3 mt-3 bg-[#9e9d9d] text-[#000]"onChange={(e) => setContent(e.target.value)} />
      <Button variant="ghost" onClick={handleUploadTip}>Upload Tip</Button>
    </div>
  );
};

export default UploadTipForm;
