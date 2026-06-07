"use client";

import { cn } from "@/lib/utils";
import type { MessageThread, ChatMessage } from "@/mock/types";
import { Phone, Info, Paperclip, Send } from "lucide-react";

interface ChatWindowProps {
  thread: MessageThread | null;
  className?: string;
}

function MessageBubble({ msg }: { msg: ChatMessage }) {
  return (
    <div className={cn("flex", msg.fromSelf ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[85%] min-w-0 rounded-[1.25rem] px-3 py-2 shadow-sm sm:max-w-[80%] sm:px-3.5",
          msg.fromSelf
            ? "bg-champagne/90 text-obsidian shadow-black/20"
            : "border border-white/10 bg-white/[0.06] text-ivory shadow-black/10"
        )}
      >
        <p className="break-words text-sm leading-snug sm:text-base">{msg.body}</p>
        {msg.hasAttachment && (
          <div className="mt-2 flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2 py-1.5 text-[10px] text-ivory/60 sm:text-xs">
            <Paperclip className="h-3 w-3 shrink-0" />
            Image Attached
          </div>
        )}
        <p
          className={cn(
            "mt-1 text-[10px] sm:text-xs",
            msg.fromSelf ? "text-obsidian/70" : "text-ivory/50"
          )}
        >
          {msg.at}
        </p>
      </div>
    </div>
  );
}

export function ChatWindow({ thread, className }: ChatWindowProps) {
  if (!thread) {
    return (
      <div
        className={cn(
          "flex flex-1 flex-col items-center justify-center text-ivory/50",
          className
        )}
      >
        <p className="text-sm sm:text-base">Select a conversation</p>
      </div>
    );
  }

  return (
    <div className={cn("flex min-h-0 min-w-0 flex-1 flex-col", className)}>
      <div className="flex min-w-0 shrink-0 items-center justify-between gap-2 border-b border-white/10 px-3 py-2 sm:px-4 sm:py-3">
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium tracking-tight text-ivory sm:text-base">
            {thread.participantName}
            {thread.participantScore !== undefined && (
              <span className="ml-1.5 text-xs font-normal text-ivory/60 sm:ml-2 sm:text-sm">
                Pedigree {thread.participantScore}/5.0
              </span>
            )}
          </p>
          {thread.propertyContext && (
            <p className="truncate text-[10px] text-ivory/50 sm:text-xs">— {thread.propertyContext}</p>
          )}
        </div>
        <div className="flex shrink-0 gap-0.5 sm:gap-1">
          <button
            type="button"
            className="rounded-xl p-2 text-ivory/50 transition-colors hover:bg-white/10 hover:text-ivory"
            title="Call"
          >
            <Phone className="h-4 w-4" />
          </button>
          <button
            type="button"
            className="rounded-xl p-2 text-ivory/50 transition-colors hover:bg-white/10 hover:text-ivory"
            title="Info"
          >
            <Info className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div className="min-h-0 flex-1 space-y-3 overflow-y-auto overflow-x-hidden p-3 sm:p-4">
        {thread.messages.length === 0 ? (
          <p className="text-center text-sm text-ivory/50">No messages yet</p>
        ) : (
          thread.messages.map((msg) => <MessageBubble key={msg.id} msg={msg} />)
        )}
      </div>
      <div className="flex shrink-0 items-center gap-2 border-t border-white/10 p-2 sm:p-3">
        <button
          type="button"
          className="shrink-0 rounded-xl p-2 text-ivory/50 transition-colors hover:bg-white/10 hover:text-ivory"
          title="Attach"
        >
          <Paperclip className="h-4 w-4" />
        </button>
        <input
          type="text"
          placeholder="Type a message..."
          readOnly
          className="min-w-0 flex-1 rounded-[2rem] border border-white/10 bg-white/5 px-3 py-2 text-sm text-ivory placeholder:text-ivory/50 focus:border-champagne focus:outline-none focus:ring-1 focus:ring-champagne/30 sm:text-base"
        />
        <button
          type="button"
          className="flex shrink-0 items-center gap-2 rounded-[2rem] bg-champagne px-4 py-2 text-sm font-medium text-obsidian transition-colors duration-200 hover:bg-champagne/90 active:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne/60 focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian"
        >
          <span className="hidden sm:inline">Send</span>
          <Send className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
