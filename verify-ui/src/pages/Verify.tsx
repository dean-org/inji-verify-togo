import React from "react";
import VerificationSection from "../components/Home/VerificationSection";
import Header from "../components/Home/Header";

export const Verify = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header 
        className="bg-white"
      />
      
      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Bank Logo and Title */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-[#0A2540] to-[#C9A227] rounded-2xl flex items-center justify-center">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 bg-gradient-to-r from-[#0A2540] to-[#C9A227] rounded-full"></div>
              </div>
            </div>
            <div className="text-left">
              <h1 className="text-2xl font-bold text-[#0A2540]">Apex Bank</h1>
              <p className="text-sm font-medium text-[#6B7280]">Credential Verification</p>
            </div>
          </div>
          <p className="max-w-xl text-center text-[#6B7280] leading-relaxed">
            Securely verify digital credentials in seconds
          </p>
        </div>
        
        {/* Verification Section - will show upload/scan UI based on method set by loader */}
        <VerificationSection />
      </div>
      
      {/* Footer */}
      <div className="text-center text-xs text-gray-500 py-6">
        2024 © Apex Bank - All rights reserved.
      </div>
    </div>
  );
};
