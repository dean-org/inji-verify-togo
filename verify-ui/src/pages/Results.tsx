import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../redux/hooks";
import { useVerificationFlowSelector } from "../redux/features/verification/verification.selector";
import { VcDetailsGrid } from "../components/Home/VerificationSection/Result/VcDetailsGrid";
import { getDetailsOrder } from "../utils/commonUtils";
import { AnyVc, LdpVc, SdJwtVc, VcStatus } from "../types/data-types";
import { decodeSdJwtToken } from "../utils/decodeSdJwt";
import { extractMappedClaim, isCWT, uint8ArrayToHex } from "../utils/cborUtils";

interface ResultsProps {}

const Results = () => {
  const { method, verificationResult } = useVerificationFlowSelector(state => ({
    method: state.method,
    verificationResult: state.verificationResult
  }));
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [claims, setClaims] = useState<AnyVc | null>(null);
  const [credentialType, setCredentialType] = useState<string>("");
  const [vcStatus, setVcStatus] = useState<VcStatus | null>(null);

  useEffect(() => {
    if (!verificationResult?.vc) {
      navigate("/");
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
  }, [verificationResult?.vc, verificationResult?.vcStatus, navigate]);

  const handleClose = () => {
    navigate("/");
  };

  if (!verificationResult?.vc) {
    return null;
  }

  const isSuccess = vcStatus === "SUCCESS";
  const borderColor = isSuccess ? "border-[var(--iv-successBorder)]" : "border-[var(--iv-invalidBorder)]";

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div
        className={`w-full max-w-[800px] p-6 rounded-xl border-2 ${borderColor} bg-white`}
      >
        <div className="space-y-6">
          <div className="flex items-center space-x-4 mb-6">
            {isSuccess ? (
              <span className="w-10 h-10 flex items-center justify-center bg-[var(--iv-successText)]/10 rounded-full text-[var(--iv-successText)]">
                ✓
              </span>
            ) : (
              <span className="w-10 h-10 flex items-center justify-center bg-[var(--iv-invalidText)]/10 rounded-full text-[var(--iv-invalidText)]">
                ✕
              </span>
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

          {claims && (
            <div className="border-t border-gray-200 pt-6">
              <VcDetailsGrid
                orderedDetails={getDetailsOrder(claims, "en")}
                vc={claims}
              />
            </div>
          )}
        </div>

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
  );
};

export default Results;