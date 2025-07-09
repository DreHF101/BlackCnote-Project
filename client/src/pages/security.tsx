/**
 * Security Settings Page
 * Advanced security features including 2FA management
 */

import TwoFactorAuth from "@/components/security/two-factor-auth";

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-[var(--background)] py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-2">
            Security Settings
          </h1>
          <p className="text-[var(--text-secondary)]">
            Manage your account security and enable advanced protection features
          </p>
        </div>
        
        <TwoFactorAuth />
      </div>
    </div>
  );
}