import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "../../../../redux/hooks";
import { Button } from "../commons/Button";
import { VerificationSuccessIcon, VerificationFailedIcon } from "../../../../utils/theme-utils";
import { getDetailsOrder } from "../../../../utils/commonUtils";
import { AnyVc, LdpVc, SdJwtVc } from "../../../../types/data-types";
import VcDetailsGrid from "./VcDetailsGrid";
import { useVerificationFlowSelector } from "../../../../redux/features/verification/verification.selector";
import {
  goToHomeScreen,
  qrReadInit,
} from "../../../../redux/features/verification/verification.slice";
import { raiseAlert } from "../../../../redux/features/alerts/alerts.slice";
import { DisplayTimeout } from "../../../../utils/config";
import { decodeSdJwtToken } from "../../../../utils/decodeSdJwt";
import { extractMappedClaim, isCWT, uint8ArrayToHex } from "../../../../utils/cborUtils";

const Result = () => {
  const { vc, vcStatus } = useVerificationFlowSelector((state) => state.verificationResult ?? { vc: null, vcStatus: null });
  const { method } = useVerificationFlowSelector((state) => ({ method: state.method }));
  const [claims, setClaims] = useState<AnyVc | null>(null);
  const [credentialType, setCredentialType] = useState<string>("");
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  const handleVerifyAnotherQrCode = () => {
    if (method === "SCAN") {
      dispatch(qrReadInit({ method: "SCAN" }));
    } else {
      dispatch(goToHomeScreen({}));
      setTimeout(() => {
        document.getElementById("upload-qr")?.click();
      }, 50);
    }
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
          const cwtHex =
            vc instanceof Uint8Array
              ? uint8ArrayToHex(vc)
              : vc instanceof ArrayBuffer
                ? uint8ArrayToHex(new Uint8Array(vc))
                : (vc as string);
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
        setClaims(vc as LdpVc);
        const typeEntry = vc.type[1];
        if (typeof typeEntry === "string") {
          setCredentialType(typeEntry);
        } else if (typeof typeEntry === "object" && "_value" in typeEntry) {
          setCredentialType(typeEntry._value);
        }
      }
    };
    fetchDecodedClaims();
  }, [dispatch, vc]);

  const clearTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  useEffect(() => {
    clearTimer();
    timerRef.current = setTimeout(() => {
       dispatch(goToHomeScreen({}));
    }, DisplayTimeout);

    return () => clearTimer();
  }, [dispatch]);

  if (!vc) {
    return null;
  }

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
                  {vcStatus === "EXPIRED" ? "Credential Expired" : "Verification Failed"}
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
