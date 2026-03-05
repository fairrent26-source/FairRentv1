"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScoreDisplay } from "@/components/scoring/ScoreDisplay";
import { upcomingPayouts, revenueVsExpenses, investmentHealthScore, bankAccountMasked } from "@/mock/financials";

export default function LandlordFinancialsPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-slate-100">Financial Fortification Hub</h2>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <span className="text-sm font-medium text-slate-100">Upcoming Payouts</span>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-slate-100">£{upcomingPayouts[0]?.amount ?? 0} clearing on {upcomingPayouts[0]?.clearingDate}</p>
            <ul className="mt-2 space-y-1 text-sm text-slate-400">
              {upcomingPayouts[0]?.properties.map((p) => (
                <li key={p.address} className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  {p.address} (Direct Debit Verified)
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <span className="text-sm font-medium text-slate-100">Investment Health Score</span>
          </CardHeader>
          <CardContent>
            <ScoreDisplay value={investmentHealthScore} max={5} label="Health" size="sm" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <span className="text-sm font-medium text-slate-100">Revenue vs Expenses</span>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <div className="h-24 flex-1 rounded-xl bg-emerald-500/20" style={{ height: `${(revenueVsExpenses.revenue / 6000) * 96}px` }} />
              <div className="h-24 flex-1 rounded-xl bg-slate-600" style={{ height: `${(revenueVsExpenses.expenses / 6000) * 96}px` }} />
            </div>
            <p className="mt-2 text-xs text-slate-400">Revenue £{revenueVsExpenses.revenue} · Expenses £{revenueVsExpenses.expenses}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <span className="text-sm font-medium text-slate-100">Banking & Rent Collection</span>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-slate-400">Rent Collection Account: Linked to Business Account ending in {bankAccountMasked}</p>
          <Button size="sm">Verify New Account</Button>
        </CardContent>
      </Card>
    </div>
  );
}
