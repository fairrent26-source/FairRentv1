"use client";

import { useDevStore } from "@/store/dev-store";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Settings2, X } from "lucide-react";

export function DevPanelButton() {
  const togglePanel = useDevStore((s) => s.togglePanel);
  return (
    <button
      type="button"
      onClick={togglePanel}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 text-sm font-medium tracking-tight text-slate-200 shadow-card transition-all duration-200 hover:border-slate-600 hover:bg-slate-800 active:scale-[0.98]"
      aria-label="Open Dev Panel"
    >
      <Settings2 className="h-4 w-4" />
      Dev Panel
    </button>
  );
}

export function DevPanelModal() {
  const {
    panelOpen,
    setPanelOpen,
    highScore,
    setHighScore,
    expiredCompliance,
    setExpiredCompliance,
    overduePayment,
    setOverduePayment,
    emptyMatches,
    setEmptyMatches,
    emergencyMaintenance,
    setEmergencyMaintenance,
    emptyPortfolio,
    setEmptyPortfolio,
    noActiveTenancy,
    setNoActiveTenancy,
    complianceRiskCascade,
    setComplianceRiskCascade,
  } = useDevStore();

  if (!panelOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm">
      <Card className="modal-enter w-full max-w-md border-slate-700/80 bg-slate-900 shadow-card-hover">
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <h2 className="text-lg font-semibold tracking-tight text-slate-100">
            Dev Control Panel
          </h2>
          <Button variant="ghost" size="icon" onClick={() => setPanelOpen(false)}>
            <X className="h-5 w-5" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-sm text-slate-500">
            Toggle mock states to test edge cases. No backend; UI only.
          </p>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="high-score" className="text-slate-300">High / low score</Label>
              <Switch id="high-score" checked={highScore} onCheckedChange={setHighScore} />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="expired-compliance" className="text-slate-300">Expired compliance</Label>
              <Switch id="expired-compliance" checked={expiredCompliance} onCheckedChange={setExpiredCompliance} />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="overdue-payment" className="text-slate-300">Overdue payment</Label>
              <Switch id="overdue-payment" checked={overduePayment} onCheckedChange={setOverduePayment} />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="empty-matches" className="text-slate-300">Empty matches</Label>
              <Switch id="empty-matches" checked={emptyMatches} onCheckedChange={setEmptyMatches} />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="emergency-maintenance" className="text-slate-300">Emergency maintenance</Label>
              <Switch id="emergency-maintenance" checked={emergencyMaintenance} onCheckedChange={setEmergencyMaintenance} />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="empty-portfolio" className="text-slate-300">Empty portfolio</Label>
              <Switch id="empty-portfolio" checked={emptyPortfolio} onCheckedChange={setEmptyPortfolio} />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="no-active-tenancy" className="text-slate-300">No active tenancy</Label>
              <Switch id="no-active-tenancy" checked={noActiveTenancy} onCheckedChange={setNoActiveTenancy} />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="compliance-risk-cascade" className="text-slate-300">Compliance risk cascade</Label>
              <Switch id="compliance-risk-cascade" checked={complianceRiskCascade} onCheckedChange={setComplianceRiskCascade} />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
