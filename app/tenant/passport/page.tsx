"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScoreDisplay } from "@/components/scoring/ScoreDisplay";
import { Switch } from "@/components/ui/switch";
import { getPrimaryTenant } from "@/mock/tenants";

export default function TenantPassportPage() {
  const tenant = getPrimaryTenant();
  const displayScore = tenant.strengthScore;

  return (
    <div className="space-y-8">
      <h2 className="text-xl font-semibold text-slate-100">Your Universal Tenant Passport</h2>

      <Card>
        <CardHeader>
          <span className="text-sm font-medium text-slate-100">Your FairRent Strength</span>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
          <ScoreDisplay value={displayScore} max={5} label="Strength" size="lg" />
          <div className="space-y-3 text-sm">
            <p className="flex items-center justify-between gap-4">
              Increase your strength to 4.5 by setting up Auto-Pay
              <Button size="sm">View Options</Button>
            </p>
            <p className="flex items-center justify-between gap-4">
              Complete your &apos;Previous Landlord&apos; reference check
              <Button size="sm">Send Reminder</Button>
            </p>
          </div>
        </CardContent>
      </Card>

      <div>
        <h3 className="mb-4 text-sm font-medium text-slate-100">Verified Credentials</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardContent className="pt-6">
              <span className="text-emerald-500">✓</span>
              <p className="mt-2 font-medium text-slate-100">Identity & Right to Rent</p>
              <p className="text-sm text-slate-400">Passport/ID Uploaded — Verified by FairRent AI.</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="font-medium text-slate-100">Financial Strength</p>
              <Button size="sm" className="mt-2">Link Open Banking</Button>
              <p className="mt-2 text-sm text-slate-400">Rent-to-Income Ratio: 30% (Healthy)</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="font-medium text-slate-100">Target Postcode Insight</p>
              <div className="mt-2 flex gap-2">
                <div className="h-12 flex-1 rounded bg-red-500/30" />
                <div className="h-8 flex-1 rounded bg-amber-500/30" />
                <div className="h-6 flex-1 rounded bg-emerald-500/30" />
              </div>
              <p className="mt-2 text-xs text-slate-500">Pricing Trends (Heat Map)</p>
              <p className="mt-1 text-sm text-slate-400">Your profile is in the top 5% for your area.</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="font-medium text-slate-100">Payment History</p>
              <p className="mt-1 text-sm text-slate-100">Streak: 12 months on-time payments</p>
              <p className="text-sm text-emerald-500">Your score improved by +0.2 this month.</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="font-medium text-slate-100">References</p>
              <p className="mt-1 text-sm text-slate-400">Employer: Verified</p>
              <p className="text-sm text-slate-400">Previous Landlord: 1 Pending, 1 Verified</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="font-medium text-slate-100">Passport Visibility</p>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-sm text-slate-400">Allow Verified Landlords to find me</span>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="font-medium text-slate-100">Passport Statistics</p>
              <p className="mt-1 text-sm text-slate-400">Passport Views: 24</p>
              <p className="text-sm text-slate-400">Viewing Invites: 3</p>
              <p className="mt-1 font-medium text-slate-100">Trust Score Rank: Elite</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card>
        <CardContent className="pt-6">
          <p className="font-medium text-slate-100">Data Protection & Security</p>
          <p className="mt-2 text-sm text-slate-400">
            <a href="#" className="text-blue-500 hover:underline">Privacy Policy</a>
            {" · "}
            <a href="#" className="text-blue-500 hover:underline">Terms of Service</a>
          </p>
          <p className="mt-2 text-xs text-slate-500">All sensitive financial data is encrypted and only shared with the tenant&apos;s explicit consent.</p>
        </CardContent>
      </Card>
    </div>
  );
}
