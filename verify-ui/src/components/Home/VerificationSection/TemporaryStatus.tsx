import React, { useEffect } from "react";
import { useAppDispatch } from "../../../redux/hooks";
import { useNavigate } from "react-router-dom";
import { goToHomeScreen } from "../../../redux/features/verification/verification.slice";
import { VerificationSuccessIcon, VerificationFailedIcon } from "../../../utils/theme-utils";

interface TemporaryStatusProps {
  vcStatus: string | null;
  onVerifyAnother: () => void;
}

const TemporaryStatus = ({ vcStatus, onVerifyAnother }: TemporaryStatusProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/result");
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigate]);

  const getStatusMessage = () => {
    if (vcStatus === "SUCCESS") return "Verified";
    if (vcStatus === "EXPIRED") return "Credential Expired";
    if (vcStatus === "INVALID") return "Invalid Credential";
    if (vcStatus === "REVOKED") return "Revoked Credential";
    return "Verification Failed";
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-xl w-full max-w-[800px] p-6">
        <div className="mb-6">
          {vcStatus === "SUCCESS" ? (
            <div className="flex items-center space-x-4">
              <VerificationSuccessIcon className="h-[60px] w-[60px]" />
              <div>
                <p className="text-2xl font-bold text-[#0A2540]">Verified</p>
              </div>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <VerificationFailedIcon className="h-[60px] w-[60px]" />
              <div>
                <p className="text-2xl font-bold text-[#0A2540]">
                  {getStatusMessage()}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TemporaryStatus;