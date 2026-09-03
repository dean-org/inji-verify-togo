import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "../../../../redux/hooks";
import { raiseAlert } from "../../../../redux/features/alerts/alerts.slice";
import { Button } from "../commons/Button";
import { VerificationSuccessIcon, VerificationFailedIcon } from "../../../../utils/theme-utils";
import { getDetailsOrder } from "../../../../utils/commonUtils";
import { AnyVc, LdpVc, SdJwtVc, VcStatus } from "../../../../types/data-types";
import VcDetailsGrid from "./VcDetailsGrid";
import { decodeSdJwtToken } from "../../../../utils/decodeSdJwt";
import { extractMappedClaim, isCWT, uint8ArrayToHex } from "../../../../utils/cborUtils";

interface ResultProps {
  vc: AnyVc | null;
  vcStatus: VcStatus | null;
  onVerifyAnother: () => void;
}

const Result = ({ vc, vcStatus, onVerifyAnother }: ResultProps) => {
  const [claims, setClaims] = useState<AnyVc | null>(null);
  const [credentialType, setCredentialType] = useState<string>("");
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();

  const handleVerifyAnotherQrCode = () => {
    onVerifyAnother();
  };

  useEffect(() => {
    if (!vc) {
      setClaims(null);
      setCredentialType("");
      return;
    }

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
          const message = err instanceof Error ? err.message : String(err);
          dispatch(raiseAlert({ message, type: "error" }));
        }
      } else if (typeof vc === "string") {
        try {
          const claims = await decodeSdJwtToken(vc);
          setClaims(claims as SdJwtVc);
          setCredentialType(claims.regularClaims.vct);
        } catch (err) {
          const message = err instanceof Error ? err.message : String(err);
          dispatch(raiseAlert({ message, type: "error" }));
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
  }, [vc, dispatch]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-xl w-full max-w-[800px] p-6">
        <div className="mb-6">
          {vcStatus === "SUCCESS" ? (
            <div className="flex items-center space-x-4">
              <VerificationSuccessIcon className="h-[60px] w-[60px]" />
              <div>
                <p className="text-2xl font-bold text-[#0A2540]">Verified Successfully</p>
                {credentialType && <p className="text-lg text-gray-600">{credentialType}</p>}
              </div>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <VerificationFailedIcon className="h-[60px] w-[60px]" />
              <div>
                <p className="text-2xl font-bold text-[#0A2540]">
                  {!vcStatus ? "Verification Failed" : vcStatus === "EXPIRED" ? "Credential Expired" : "Verification Failed"}
                </p>
                {credentialType && <p className="text-lg text-gray-600">{credentialType}</p>}
              </div>
            </div>
          )}
        </div>

        <div className="border-t border-gray-200 pt-6">
          {claims && (
            <div className="space-y-6">
              <VcDetailsGrid
                orderedDetails={getDetailsOrder(claims, i18n.language)}
                vc={claims}
              />
            </div>
          )}
        </div>

        <div className="mt-6 flex justify-center">
          <Button
            title={t("Common:Button.verifyAnotherQrCode")}
            onClick={handleVerifyAnotherQrCode}
            className="w-[200px]"
          />
        </div>
      </div>
    </div>
  );
};

export default Result;
