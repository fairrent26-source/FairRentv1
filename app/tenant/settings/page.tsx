"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

export default function TenantSettingsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-slate-100">Settings</h2>
        <p className="text-slate-400">Manage your account and preferences.</p>
      </div>

      <Card>
        <CardHeader>
          <span className="text-sm font-medium text-slate-100">Profile</span>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="mb-1 block text-xs text-slate-400">Display name</label>
            <Input defaultValue="Name" readOnly className="bg-slate-800" />
          </div>
          <div>
            <label className="mb-1 block text-xs text-slate-400">Email</label>
            <Input defaultValue="tenant@example.com" readOnly className="bg-slate-800" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <span className="text-sm font-medium text-slate-100">Notifications</span>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-200">Message notifications</span>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-200">Match alerts</span>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-wrap gap-4 text-sm text-blue-500">
        <a href="#">Privacy Policy</a>
        <a href="#">Terms of Service</a>
      </div>
    </div>
  );
}
