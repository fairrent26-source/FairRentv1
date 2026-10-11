"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { ScoreDisplay } from "@/components/scoring/ScoreDisplay";
import { VerifiedBadge } from "@/components/ui/VerifiedBadge";
import { getPrimaryLandlord } from "@/mock/landlords";

export default function LandlordSettingsPage() {
  const landlord = getPrimaryLandlord();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-display font-bold uppercase tracking-display text-text-primary">Professional Settings</h2>
        <p className="text-text-muted">Manage your landlord entity, verified credentials, and portfolio-wide permissions.</p>
        <VerifiedBadge status="verified" label="Verified Professional Landlord" className="mt-2" />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <span className="text-sm font-display font-bold uppercase tracking-display text-text-primary">Landlord Profile & Branding</span>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="h-20 w-20 rounded-full bg-slate-700" />
              <Button variant="secondary" size="sm">Change Logo</Button>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs text-text-muted">Legal Entity Name</label>
                <Input defaultValue={landlord.entityName} readOnly className="bg-slate-800" />
              </div>
              <div>
                <label className="mb-1 block text-xs text-text-muted">Company Registration No.</label>
                <Input defaultValue={landlord.companyRegNo} readOnly className="bg-slate-800" />
              </div>
              <div>
                <label className="mb-1 block text-xs text-text-muted">Contact Email</label>
                <Input defaultValue={landlord.contactEmail} readOnly className="bg-slate-800" />
              </div>
              <div>
                <label className="mb-1 block text-xs text-text-muted">Tax ID / UTR</label>
                <Input defaultValue={landlord.taxId} readOnly className="bg-slate-800" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <span className="text-sm font-display font-bold uppercase tracking-display text-text-primary">Pedigree & Security</span>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <p className="mb-2 text-xs text-text-muted">Portfolio Pedigree</p>
              <ScoreDisplay value={landlord.pedigreeScore} max={5} label="" size="sm" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-200">Two-Factor Authentication (2FA)</span>
              <Switch defaultChecked />
            </div>
            <Button variant="secondary" size="sm">Manage Team/Agent Access</Button>
            <div className="space-y-2">
              <p className="text-xs text-text-muted">Notification Preferences</p>
              <label className="flex items-center gap-2 text-sm text-slate-200">
                <input type="checkbox" defaultChecked readOnly className="rounded" />
                Urgent Maintenance Alerts (SMS)
              </label>
              <label className="flex items-center gap-2 text-sm text-slate-200">
                <input type="checkbox" defaultChecked readOnly className="rounded" />
                Compliance Expiry Warnings (14-day lead time)
              </label>
              <label className="flex items-center gap-2 text-sm text-slate-200">
                <input type="checkbox" defaultChecked readOnly className="rounded" />
                Rent Payout Confirmations
              </label>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <span className="text-sm font-display font-bold uppercase tracking-display text-text-primary">Banking & Financial Routing</span>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-text-muted">Linked to Business Account ending in ****5678</p>
            <Button size="sm">Verify New Account</Button>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-200">Automated Rent Collection via FairRent Pay</span>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <span className="text-sm font-display font-bold uppercase tracking-display text-text-primary">Compliance & Automated Notices</span>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="mb-1 block text-xs text-text-muted">Default Notice Periods</label>
              <select className="w-full rounded-2xl border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-text-primary">
                <option>2 Months - Statutory Minimum</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-200">Auto-share EPC/Gas Safety with Tenants</span>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-wrap gap-4 text-sm text-blue-500">
        <a href="#">Privacy Policy</a>
        <a href="#">Terms of Service</a>
        <a href="#">Cookie Policy</a>
      </div>
      <Button variant="destructive">Account Deactivation & Portfolio Data Export</Button>
    </div>
  );
}
