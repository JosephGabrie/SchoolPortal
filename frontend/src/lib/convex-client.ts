import { ConvexClient } from "convex/browser";

const convexUrl = import.meta.env.VITE_CONVEX_URL || import.meta.env.PUBLIC_CONVEX_URL;

if (!convexUrl) {
  console.error("VITE_CONVEX_URL or PUBLIC_CONVEX_URL is not defined");
}

export const convex = new ConvexClient(convexUrl || "");
