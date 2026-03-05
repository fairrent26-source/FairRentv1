import { create } from "zustand";

export interface DevState {
  highScore: boolean;
  expiredCompliance: boolean;
  overduePayment: boolean;
  emptyMatches: boolean;
  emergencyMaintenance: boolean;
  emptyPortfolio: boolean;
  noActiveTenancy: boolean;
  complianceRiskCascade: boolean;
  panelOpen: boolean;
  setHighScore: (v: boolean) => void;
  setExpiredCompliance: (v: boolean) => void;
  setOverduePayment: (v: boolean) => void;
  setEmptyMatches: (v: boolean) => void;
  setEmergencyMaintenance: (v: boolean) => void;
  setEmptyPortfolio: (v: boolean) => void;
  setNoActiveTenancy: (v: boolean) => void;
  setComplianceRiskCascade: (v: boolean) => void;
  setPanelOpen: (v: boolean) => void;
  togglePanel: () => void;
}

export const useDevStore = create<DevState>((set) => ({
  highScore: true,
  expiredCompliance: false,
  overduePayment: false,
  emptyMatches: false,
  emergencyMaintenance: true,
  emptyPortfolio: false,
  noActiveTenancy: false,
  complianceRiskCascade: false,
  panelOpen: false,
  setHighScore: (v) => set({ highScore: v }),
  setExpiredCompliance: (v) => set({ expiredCompliance: v }),
  setOverduePayment: (v) => set({ overduePayment: v }),
  setEmptyMatches: (v) => set({ emptyMatches: v }),
  setEmergencyMaintenance: (v) => set({ emergencyMaintenance: v }),
  setEmptyPortfolio: (v) => set({ emptyPortfolio: v }),
  setNoActiveTenancy: (v) => set({ noActiveTenancy: v }),
  setComplianceRiskCascade: (v) => set({ complianceRiskCascade: v }),
  setPanelOpen: (v) => set({ panelOpen: v }),
  togglePanel: () => set((s) => ({ panelOpen: !s.panelOpen })),
}));
