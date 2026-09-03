import React from "react";
import { ScanQrCode } from "./ScanQrCode";
import { Upload } from "../../../pages/Upload";
import { useVerificationFlowSelector } from "../../../redux/features/verification/verification.selector";
import { useAppDispatch } from "../../../redux/hooks";
import { useNavigate } from "react-router-dom";
import { goToHomeScreen, qrReadInit } from "../../../redux/features/verification/verification.slice";
import TemporaryStatus from "./TemporaryStatus";

const VerificationSection = () => {
  const { method, verificationResult } = useVerificationFlowSelector(state => ({
    method: state.method,
    verificationResult: state.verificationResult
  }));
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleVerifyAnother = () => {
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

  // If we have a verification result, show temporary status for 2.5 seconds then navigate to result page
  if (verificationResult?.vc) {
    return (
      <TemporaryStatus
        vcStatus={verificationResult.vcStatus}
        onVerifyAnother={handleVerifyAnother}
      />
    );
  }

  // Otherwise, show the scan/upload component
  const actionComponent = method === "SCAN" ? <ScanQrCode /> : <Upload />;

  return (
    <div className="space-y-6">
      {actionComponent}
    </div>
  );
};

export default VerificationSection;
