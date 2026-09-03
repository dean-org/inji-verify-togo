import React, { useEffect } from "react";
import { useAppDispatch } from "../../../redux/hooks";
import { useVerificationFlowSelector } from "../../../redux/features/verification/verification.selector";
import { goToHomeScreen } from "../../../redux/features/verification/verification.slice";
import Home from "./Home";
import { VcDetailsGrid } from "../components/Home/VerificationSection/Result/VcDetailsGrid";
import { getDetailsOrder } from "../../../utils/commonUtils";
import { AnyVc, LdpVc, SdJwtVc, VcStatus } from "../../../types/data-types";
import { decodeSdJwtToken } from "../../../utils/decodeSdJwt";
import { extractMappedClaim, isCWT, uint8ArrayToHex } from "../../../utils/cborUtils";

interface ResultsProps {}

const Results = () => {
  const { method, verificationResult } = useVerificationFlowSelector(state => ({
    method: state.method,
    verificationResult: state.verificationResult
  }));
  const dispatch = useAppDispatch();

  const [claims, setClaims] = React.useState<AnyVc | null>(null);
  const [credentialType, setCredentialType] = useState<string>("");
  const [vcStatus, setVcStatus] = useState<VcStatus | null>(null);

  useEffect(() => {
    if (!verificationResult?.vc) {
      // If no verification result, go back to home
      dispatch(goToHomeScreen({}));
      return;
    }

    const vc = verificationResult.vc;
    const status = verificationResult.vcStatus;
    setVcStatus(status);

    const fetchDecodedClaims = async () => {
      if (isCWT(vc)) {
        try {
          let cwtHex: string;
          if (vc instanceof Uint8Array) {
            cwtHex = uint8ArrayToHex(vc);
          } else if (vc instanceof ArrayBuffer) {
            cwtHex = uint8ArrayToHex(new Uint8Array(vc));
          } else {
            // This should not happen with isCWT, but just in case
            cwtHex = String(vc);
          }
          const claims = extractMappedClaim(cwtHex, 169);
          setClaims(claims as LdpVc);

        } catch (err) {
          console.error("Error decoding CWT:", err);
        }
      } else if (typeof vc === "string") {
        try {
          const claims = await decodeSdJwtToken(vc);
          setClaims(claims as SdJwtVc);
          setCredentialType(claims.regularClaims.vct);
        } catch (err) {
          console.error("Error decoding SD-JWT:", err);
        }
      } else {
        // Handle as LdpVc (only LdpVc has type property)
        setClaims(vc as LdpVc);
        if (vc && (vc as LdpVc).type && Array.isArray((vc as LdpVc).type) && (vc as LdpVc).type[1]) {
          const typeEntry = (vc as LdpVc).type[1];
          if (typeof typeEntry === "string") {
            setCredentialType(typeEntry);
          } else if (typeof typeEntry === "object" && typeEntry !== null && '_value' in typeEntry) {
            setCredentialType((typeEntry as { _value: string })._value);
          }
        }
      }
    };

    fetchDecodedClaims();
  }, [verificationResult?.vc, verificationResult?.vcStatus]);

  const handleClose = () => {
    dispatch(goToHomeScreen({}));
  };

  if (!verificationResult?.vc) {
    // Redirect to home if no verification result
    return <Home />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Only show the verification result with appropriate border, no extra UI */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <div
          className={`w-full max-w-[800px] p-6 rounded-xl border-2
          ${vcStatus === "SUCCESS" ? "border-[var(--iv-successBorder)]" : "border-[var(--iv-invalidBorder)]"}
          bg-white`}
        >
          <div className="space-y-6">
            {/* Header with status icon and text */}
            <div className="flex items-center space-x-4 mb-6">
              {vcStatus === "SUCCESS" ? (
                <>
                  <span className="w-10 h-10 flex items-center justify-center bg-[var(--iv-successText)]/10 rounded-full text-[var(--iv-successText)]">
                    ✓
                  </span>
                </>
              ) : (
                <>
                  <span className="w-10 h-10 flex items-center justify-center bg-[var(--iv-invalidText)]/10 rounded-full text-[var(--iv-invalidText)]">
                    ✕
                  </span>
                </>
              )}
              <div>
                <p className="text-2xl font-bold text-[#0A2540]">
                  {vcStatus === "SUCCESS" ? "Verified Successfully" :
                    vcStatus === "EXPIRED" ? "Credential Expired" :
                    vcStatus === "INVALID" ? "Invalid Credential" :
                    vcStatus === "REVOKED" ? "Revoked Credential" : "Verification Failed"}
                </p>
                {credentialType && <p className="text-lg text-gray-600">{credentialType}</p>}
              </div>
            </div>

            {/* Details grid */}
            {claims && (
              <div className="border-t border-gray-200 pt-6">
                <VcDetailsGrid
                  orderedDetails={getDetailsOrder(claims, "en")} // Using English as fallback, could use i18n
                  vc={claims}
                />
              </div>
            )}
          </div>

          {/* Close button */}
          <div className="mt-6 flex justify-center">
            <button
              onClick={handleClose}
              className="w-[200px] px-4 py-2 bg-[#0A2540] text-white rounded-lg font-medium hover:bg-[#0A2540]/90 transition-colors duration-200"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;