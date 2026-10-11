"use client";

import { cn } from "@/lib/utils";
import type { MessageThread } from "@/mock/types";

interface ThreadListProps {
  threads: MessageThread[];
  activeId: string | null;
  onSelect: (id: string) => void;
  className?: string;
}

export function ThreadList({ threads, activeId, onSelect, className }: ThreadListProps) {
  return (
    <div
      className={cn(
        "flex min-h-0 flex-col border-r border-ui-tags bg-bg-card",
        className
      )}
    >
      <div className="shrink-0 border-b border-ui-tags p-2">
        <input
          type="search"
          placeholder="Search messages..."
          className="w-full min-w-0 rounded-[2rem] border border-ui-tags bg-bg-card px-3 py-2 text-text-primary placeholder:text-text-muted focus:border-brand-teal focus:outline-none focus:ring-1 focus:ring-brand-teal/30 text-sm sm:text-base"
        />
      </div>
      <ul className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden">
        {threads.map((t) => {
          const isActive = activeId === t.id;
          const isUnread = false;
          return (
            <li key={t.id} className="border-b border-ui-tags last:border-b-0">
              <button
                type="button"
                onClick={() => onSelect(t.id)}
                className={cn(
                  "flex w-full min-w-0 gap-2 sm:gap-3 p-2 sm:p-3 text-left transition-colors duration-200",
                  isActive
                    ? "bg-brand-teal/10 text-brand-teal"
                    : "hover:bg-bg-card text-text-muted hover:text-text-primary"
                )}
              >
                <div className="relative h-8 w-8 shrink-0 rounded-full bg-white/10 sm:h-9 sm:w-9">
                  {isUnread && (
                    <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-brand-teal ring-2 ring-bg-card" />
                  )}
                </div>
                <div className="min-w-0 flex-1 overflow-hidden">
                  <div className="flex items-center justify-between gap-1">
                    <span
                      className={cn(
                        "truncate text-sm sm:text-base",
                        isUnread ? "font-semibold text-text-primary" : "font-medium text-text-primary"
                      )}
                    >
                      {t.participantName}
                    </span>
                    <span className="shrink-0 text-[10px] text-text-muted sm:text-xs">{t.lastAt}</span>
                  </div>
                  {t.participantScore !== undefined && (
                    <p className="truncate text-[10px] text-text-muted sm:text-xs">FairRent {t.participantScore}</p>
                  )}
                  {t.propertyContext && (
                    <p className="truncate text-[10px] text-text-muted sm:text-xs">{t.propertyContext}</p>
                  )}
                  <p className="line-clamp-2 min-w-0 text-xs text-text-muted sm:text-sm">{t.lastSnippet}</p>
                </div>
                <div
                  className={cn(
                    "mt-1.5 h-2 w-2 shrink-0 rounded-full",
                    t.isOnline ? "bg-brand-teal" : "bg-ui-tags"
                  )}
                />
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
