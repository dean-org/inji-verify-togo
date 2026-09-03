import React from "react";
import { useVerificationFlowSelector } from "../../../redux/features/verification/verification.selector";
import { useAppDispatch } from "../../../redux/hooks";
import { goToHomeScreen, qrReadInit } from "../../redux/features/verification/verification.slice";
import { useTranslation } from "react-i18next";
import { Button } from "../commons/Button";
import { AnyVc } from "../../../types/data-types";

interface ResultModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ResultModal = ({
  isOpen,
  onClose
}: ResultModalProps) => {
  const { vc, vcStatus } = useVerificationFlowSelector((state) => state.verificationResult ?? { vc: null, vcStatus: null });
  const { method } = useVerificationFlowSelector((state) => ({ method: state.method }));
  const [claims, setClaims] = React.useState<AnyVc | null>(null);
  const [credentialType, setCredentialType] = React.useState<string>("");
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  
  // Decode claims when vc changes
  React.useEffect(() => {
    if (vc) {
      const decodeClaims = async () => {
        try {
          // Handle different VC types (simplified version of what's in Result component)
          if (typeof vc === "string") {
            // Try to decode as SD JWT
            try {
              // In a real implementation, we'd use the actual decode function
              // For now, we'll just parse as JSON if possible
              const parsed = JSON.parse(vc);
              setClaims(parsed);
              setCredentialType(parsed.regularClaims?.vct || "Unknown");
            } catch (e) {
              // If not JSON, treat as raw string
              setClaims({ raw: vc });
              setCredentialType("Unknown");
            }
          } else if (vc instanceof Object) {
            setClaims(vc);
            // Try to extract type
            if (vc.type && Array.isArray(vc.type) && vc.type[1]) {
              const typeEntry = vc.type[1];
              if (typeof typeEntry === "string") {
                setCredentialType(typeEntry);
              } else if (typeof typeEntry === "object" && "_value" in typeEntry) {
                setCredentialType(typeEntry._value);
              }
            }
          } else {
            setClaims(vc);
            setCredentialType("Unknown");
          }
        } catch (err) {
          console.error("Error decoding VC:", err);
          setClaims({ raw: String(vc) });
          setCredentialType("Unknown");
        }
      };
      
      decodeClaims();
    }
  }, [vc]);
  
  const handleClose = () => {
    onClose();
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

  if (!isOpen || !vc) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-[#0A2540]">
            Verification Result
          </h2>
          <button 
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
        </div>
        
        <div className="mb-6">
          <div className="flex items-center">
            <div className={`
              ${vcStatus === "SUCCESS" ? "bg-green-100 text-green-600"
              : vcStatus === "EXPIRED" ? "bg-yellow-100 text-yellow-600"
              : "bg-red-100 text-red-600"}
            `}>
            `}>
                ? "✓" 
                : vcStatus === "EXPIRED" 
                  ? "⚠" 
                  : "✗"}
            </div>
            <div className="ml-4">
              <p className="font-semibold text-[#0A2540]">
                {vcStatus === "SUCCESS" 
                  ? "Credential Verified" 
                  : vcStatus === "EXPIRED" 
                    ? "Credential Expired" 
                    : "Verification Failed"}
              </p>
              <p className="text-sm text-gray-500">
                Status: {vcStatus}
              </p>
            </div>
          </div>
        </div>
        
        {claims && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#0A2540] mb-4">
              Credential Details
            </div>
            <div className="space-y-2 text-sm">
              {/* Display key credential information */}
              {claims && typeof claims === 'object' && !(claims as any).raw && Object.keys(claims).length > 0 ? (
                <>
                  {Object.entries(claims as Record<string, any>).map(([key, value], index) => (
                    <div key={index} className="flex justify-between">
                      <span className="font-medium text-gray-600 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                      <span className="text-gray-800 break-words max-w-[200px]">
                        {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                      </span>
                    </div>
                  ))}
                </>
              ) : (
                <div className="text-gray-500">
                  Raw credential data: {String(claims)}
                </div>
              )}
            </div>
          </div>
        )}
        
        <div className="mt-6">
          <Button
            title={t("Common:Button.verifyAnotherQrCode")}
            onClick={handleClose}
            className="w-full"
          >
            Verify Another Credential
          </button>
        </div>
      </div>
    </div>
  );
};

export { ResultModal };
