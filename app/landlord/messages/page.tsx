"use client";

import { useState } from "react";
import { ThreadList } from "@/components/messaging/ThreadList";
import { ChatWindow } from "@/components/messaging/ChatWindow";
import { DashboardWidget } from "@/components/layout/DashboardWidget";
import { landlordThreads } from "@/mock/messages";

export default function LandlordMessagesPage() {
  const [activeThreadId, setActiveThreadId] = useState<string | null>(landlordThreads[0]?.id ?? null);
  const activeThread = landlordThreads.find((t) => t.id === activeThreadId) ?? null;

  return (
    <div className="flex min-h-[60vh] flex-col overflow-hidden sm:min-h-[70vh] lg:min-h-[calc(100vh-8rem)]">
      <DashboardWidget className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-[2rem] p-0">
        <div className="flex min-h-0 flex-1 flex-col md:flex-row">
          <div className="w-full shrink-0 border-b border-white/10 md:max-h-none md:w-64 md:border-b-0 md:border-r md:border-white/10 lg:w-80">
            <ThreadList
              threads={landlordThreads}
              activeId={activeThreadId}
              onSelect={setActiveThreadId}
              className="h-full min-h-[180px] md:min-h-0"
            />
          </div>
          <div className="min-h-0 min-w-0 flex-1">
            <ChatWindow thread={activeThread} className="h-full min-h-[240px]" />
          </div>
        </div>
      </DashboardWidget>
    </div>
  );
}
