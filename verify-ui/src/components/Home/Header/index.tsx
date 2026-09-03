import React from "react";
import { useTranslation } from "react-i18next";

function Header(props: any) {
  const { t } = useTranslation("Header");
  
  // Get custom className or use default
  const className = props.className || "";
  
  return (
    <div className={`w-full bg-white ${className}`}>
      <div className={`px-4 py-8 text-center`}>
        <p
          id="verify-credentials-heading"
          className="mx-auto my-4 font-bold text-2xl text-[#0A2540] max-w-[80vw]"
        >
          Apex Bank
        </p>
        <p
          id="verify-credentials-heading-highlight"
          className="mx-auto my-2 font-bold text-2xl text-[#C9A227]"
        >
          Credential Verification
        </p>
        <p
          id="verify-credentials-description"
          className="mx-auto my-4 text-[#6B7280] text-base font-normal px-[22px] lg:max-w-[624px]"
        >
          Securely verify digital credentials in seconds
        </p>
      </div>
    </div>
  );
}

export default Header;
