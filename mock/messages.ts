import type { MessageThread, ChatMessage } from "./types";

export const landlordThreads: MessageThread[] = [
  {
    id: "thread-1",
    participantName: "John Doe",
    participantScore: 4.8,
    propertyContext: "123 Main St",
    lastSnippet: "Last message snippet...",
    lastAt: "10:10 AM",
    isOnline: true,
    messages: [
      { id: "msg-1", threadId: "thread-1", fromSelf: false, body: "Hi, the faucet in the bathroom is leaking again.", at: "10:00 AM" },
      { id: "msg-2", threadId: "thread-1", fromSelf: true, body: "Okay, I'll send someone to take a look tomorrow morning.", at: "10:05 AM" },
      { id: "msg-3", threadId: "thread-1", fromSelf: false, body: "Great, thanks!", at: "10:07 AM" },
    ],
  },
  {
    id: "thread-2",
    participantName: "Jane Smith",
    propertyContext: "456 Oak Ave",
    lastSnippet: "Okay, I'll check on that.",
    lastAt: "9:45 AM",
    isOnline: false,
    messages: [],
  },
  {
    id: "thread-3",
    participantName: "Robert Johnson",
    propertyContext: "101 Elm Rd",
    lastSnippet: "Thanks for the update!",
    lastAt: "Yesterday",
    isOnline: true,
    messages: [],
  },
];

export const tenantThreads: MessageThread[] = [
  {
    id: "t-thread-1",
    participantName: "Alex Smith",
    participantScore: 4.8,
    propertyContext: "Luxury 2-Bed, Battersea",
    lastSnippet: "Great, thanks!",
    lastAt: "10:10 AM",
    isOnline: true,
    messages: [
      { id: "t-msg-1", threadId: "t-thread-1", fromSelf: false, body: "Hi, the faucet in the bathroom is leaking again.", at: "10:00 AM" },
      { id: "t-msg-2", threadId: "t-thread-1", fromSelf: true, body: "Okay, I'll send someone to take a look tomorrow morning.", at: "10:05 AM", hasAttachment: true },
      { id: "t-msg-3", threadId: "t-thread-1", fromSelf: false, body: "Great, thanks!", at: "10:07 AM" },
    ],
  },
  {
    id: "t-thread-2",
    participantName: "Jane Doe",
    participantScore: 4.5,
    propertyContext: "123 Main St, Anytown",
    lastSnippet: "Last message snippet...",
    lastAt: "9:30 AM",
    isOnline: false,
    messages: [],
  },
  {
    id: "t-thread-3",
    participantName: "Robert Johnson",
    participantScore: 4.2,
    propertyContext: "789 Pine Ln, Somewhere",
    lastSnippet: "Last message snippet...",
    lastAt: "Yesterday",
    isOnline: true,
    messages: [],
  },
];

export function getThreadById(threads: MessageThread[], id: string): MessageThread | undefined {
  return threads.find((t) => t.id === id);
}
