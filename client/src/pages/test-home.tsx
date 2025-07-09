import React from 'react';

export default function TestHome() {
  return (
    <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
      <div className="text-center space-y-6 p-8">
        <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-600 rounded-xl flex items-center justify-center mx-auto shadow-lg">
          <span className="text-white font-bold text-2xl">BC</span>
        </div>
        
        <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-400 to-orange-600 bg-clip-text text-transparent">
          BlackCnote Investment Platform
        </h1>
        
        <p className="text-slate-300 text-lg max-w-md mx-auto">
          ✅ Backend Infrastructure Complete<br/>
          ✅ Authentication System Operational<br/>
          ✅ All HYIP Features Implemented
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          <div className="bg-slate-800 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-green-400">$12,450</div>
            <div className="text-sm text-slate-400">Total Invested</div>
          </div>
          <div className="bg-slate-800 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-blue-400">$2,180</div>
            <div className="text-sm text-slate-400">Total Profit</div>
          </div>
          <div className="bg-slate-800 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-amber-400">5</div>
            <div className="text-sm text-slate-400">Active Plans</div>
          </div>
          <div className="bg-slate-800 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-purple-400">17.5%</div>
            <div className="text-sm text-slate-400">Avg. ROI</div>
          </div>
        </div>

        <div className="space-y-2 text-sm text-slate-400">
          <p>🌐 Preview URL: <span className="text-amber-400">Active</span></p>
          <p>⚡ Server: <span className="text-green-400">Running on Port 5000</span></p>
          <p>🔗 API Endpoints: <span className="text-blue-400">Operational</span></p>
        </div>
      </div>
    </div>
  );
}