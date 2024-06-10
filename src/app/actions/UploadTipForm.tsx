import React, { useState } from 'react';
import { ethers } from 'ethers';

interface UploadTipFormProps {
  contract: ethers.Contract | null;
}

const UploadTipForm: React.FC<UploadTipFormProps> = ({ contract }) => {
  const [content, setContent] = useState('');

  const handleUploadTip = async () => {
    if (contract) {
      const tx = await contract.uploadTip(content, { value: ethers.parseEther('0.69') });
      await tx.wait();
      setContent('');
    }
  };

  return (
    <div>
      <textarea value={content} onChange={(e) => setContent(e.target.value)} />
      <button onClick={handleUploadTip}>Upload Tip</button>
    </div>
  );
};

export default UploadTipForm;
