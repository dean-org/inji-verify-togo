import React from "react";
import { Logo } from "../utils/theme-utils";
import { Pages } from "../utils/config";

function Offline(props: any) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="text-center">
        {/* Bank Logo for Offline Page */}
        <div className="mb-6">
          <div className="w-20 h-20 bg-gradient-to-r from-[#0A2540] to-[#C9A227] rounded-xl flex items-center justify-center">
            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
              <div className="w-6 h-6 bg-gradient-to-r from-[#0A2540] to-[#C9A227] rounded-full"></div>
            </div>
          </div>
        </div>
        
        <h1 className="text-2xl font-bold text-[#0A2540] mb-4">
          Apex Bank
        </h1>
        <p className="text-sm font-medium text-[#6B7280] mb-6">
          Credential Verification
        </p>
        
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
          <Logo className="mb-6" />
          <h2 className="text-xl font-bold text-[#0A2540] mb-4">
            Offline
          </h2>
          <p className="text-[#6B7280] mb-6">
            You appear to be offline. Please check your internet connection and try again.
          </p>
          <button
            onClick={() => {
              window.location.href = Pages.Home;
            }}
            className="bg-[#0A2540] text-white px-6 py-3 rounded-lg hover:bg-[#081d33] transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default Offline;
