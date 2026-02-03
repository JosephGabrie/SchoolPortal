import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const sync = mutation({
  args: {
    workosId: v.string(),
    email: v.string(),
    name: v.string(),
    firstName: v.optional(v.string()),
    lastName: v.optional(v.string()),
    profileImage: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_workos_id", (q) => q.eq("workosId", args.workosId))
      .first();

    if (existingUser) {
      // Update fields if changed
      await ctx.db.patch(existingUser._id, {
        name: args.name,
        email: args.email,
        firstName: args.firstName,
        lastName: args.lastName,
        profileImage: args.profileImage,
      });
      return existingUser._id;
    }

    const newUserId = await ctx.db.insert("users", {
      workosId: args.workosId,
      email: args.email,
      name: args.name,
      firstName: args.firstName,
      lastName: args.lastName,
      profileImage: args.profileImage,
      role: "student", // Default role. In a real app, this might come from WorkOS metadata or a pre-approved list.
    });

    return newUserId;
  },
});

export const get = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.userId);
  },
});

export const getByWorkosId = query({
  args: { workosId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("users")
      .withIndex("by_workos_id", (q) => q.eq("workosId", args.workosId))
      .first();
  },
});