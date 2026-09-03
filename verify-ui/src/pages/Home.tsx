import React from "react";
import VerificationSection from "../components/Home/VerificationSection";
import { Header } from "../components/Home/Header";

function Home() {
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
        
        {/* Action Buttons - Scan and Upload */}
        <div className="space-y-6">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="w-full max-w-md">
              <button 
                onClick={() => {
                  document.getElementById("trigger-scan")?.click();
                }}
                className="w-full bg-white rounded-xl shadow-lg border border-gray-200 hover:border-[#C9A227] hover:shadow-xl transition-all duration-300 p-6 flex flex-col items-center"
              >
                <div className="w-8 h-8 mb-3" style={{ background: "rgba(10, 37, 64, 0.1)", padding: "0.5rem", borderRadius: "0.75rem" }}>
                  <svg className="w-6 h-6 text-[#0A2540]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                          d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                          d="M9 12h.01M12 9h.01M12 15h.01" />
                  </svg>
                </div>
                <h3 className="mb-2 text-center font-semibold text-[#0A2540]">Scan QR Code</h3>
                <p className="text-center text-xs text-[#6B7280] leading-relaxed">
                  Use your camera to scan a QR code
                </p>
              </button>
            </div>
            
            <div className="w-full max-w-md">
              <button 
                onClick={() => {
                  document.getElementById("upload-qr")?.click();
                }}
                className="w-full bg-white rounded-xl shadow-lg border border-gray-200 hover:border-[#C9A227] hover:shadow-xl transition-all duration-300 p-6 flex flex-col items-center"
              >
                <div className="w-8 h-8 mb-3" style={{ background: "rgba(201, 162, 39, 0.1)", padding: "0.5rem", borderRadius: "0.75rem" }}>
                  <svg className="w-6 h-6 text-[#C9A227]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                          d="M7 16V4a2 2 0 012-2h2" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                          d="M11 4h4a2 2 0 012 2v12a2 2 0 01-2 2h-2" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                          d="M7 20h10a2 2 0 002-2V8a2 2 0 00-2-2H9" />
                  </svg>
                </div>
                <h3 className="mb-2 text-center font-semibold text-[#0A2540]">Upload QR Code</h3>
                <p className="text-center text-xs text-[#6B7280] leading-relaxed">
                  Upload a QR code image or PDF
                </p>
              </button>
            </div>
          </div>
        </div>
        
        {/* Verification Section - will show scan/upload UI based on method */}
        <VerificationSection />
        
        {/* Result Modal will be handled inside VerificationSection */}
      </div>
      
      {/* Footer */}
      <div className="text-center text-xs text-gray-500 py-6">
        2024 © Apex Bank - All rights reserved.
      </div>
    </div>
  );
}

export default Home;
