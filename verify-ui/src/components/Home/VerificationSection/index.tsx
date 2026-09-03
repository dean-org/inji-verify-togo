import React, { useEffect } from "react";
import { ScanQrCode } from "./ScanQrCode";
import { Upload } from "../../../pages/Upload";
import { ResultModal } from "../ResultModal";
import { useVerificationFlowSelector } from "../../../redux/features/verification/verification.selector";
import { useAppDispatch } from "../../../redux/hooks";
import { goToHomeScreen, qrReadInit } from "../../../redux/features/verification/verification.slice";

const VerificationSection = () => {
  const { method, verificationResult } = useVerificationFlowSelector(state => ({
    method: state.method,
    verificationResult: state.verificationResult
  }));
  const [isResultModalOpen, setIsResultModalOpen] = React.useState(false);
  const dispatch = useAppDispatch();

  // Open modal when verification result is available
  useEffect(() => {
    if (verificationResult?.vc) {
      setIsResultModalOpen(true);
    } else {
      setIsResultModalOpen(false);
    }
  }, [verificationResult]);

  // Handle closing the modal
  const handleModalClose = () => {
    setIsResultModalOpen(false);
    // Reset state to allow another verification
    if (method === "SCAN") {
      dispatch(qrReadInit({ method: "SCAN" }));
    } else {
      dispatch(goToHomeScreen({}));
      // Trigger file input reset after a short delay
      setTimeout(() => {
        document.getElementById("upload-qr")?.click();
      }, 50);
    }
  };

  // Always show the scan/upload options based on method
  const actionComponent = method === "SCAN" ? <ScanQrCode /> : <Upload />;

  return (
    <>
      <div className="space-y-6">
        {actionComponent}
      </div>
      <ResultModal 
        isOpen={isResultModalOpen} 
        onClose={handleModalClose}
      />
    </>
  );
};

export default VerificationSection;
