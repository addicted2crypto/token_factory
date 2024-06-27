import React, { useState } from 'react';
import { ethers } from 'ethers';
import { Button } from '@/components/ui/button';

interface UploadTipFormProps {
  contract: ethers.Contract | null;
}

const UploadTipForm: React.FC<UploadTipFormProps> = ({ contract }) => {
  const [content, setContent] = useState('');

  const handleUploadTip = async () => {
    if (contract) {
      try {
      const tx = await contract.uploadTip(content, { value: ethers.parseEther('0.69') });
      await tx.wait();
      setContent('');
    } catch (error){
      console.error("Error uploading tip:", error)
    }
  } else {
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
