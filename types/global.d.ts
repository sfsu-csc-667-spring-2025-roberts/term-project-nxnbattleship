// types/global.d.ts

console.log("✅ global.d.ts loaded");

export type ChatMessage = {
  message: string;
  sender: string;
  gravatar: string;
  timestamp: number;
};
