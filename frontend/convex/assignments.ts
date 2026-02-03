import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getRecent = query({
  args: {},
  handler: async (ctx) => {
    // Return 5 most recent assignments based on creation or due date? 
    // Go implementation used "due_date desc"
    const assignments = await ctx.db
      .query("assignments")
      .order("desc") // default order by creation time usually, but we want due date
      // Wait, Convex orders by creation time by default (_creationTime). 
      // To order by dueDate, I need an index or just sort in memory if small.
      // I didn't add an index on dueDate in schema. 
      // Let's rely on default creation order or filter. 
      // The Go code: s.DB.Order("due_date desc")
      // I should probably add an index on dueDate if I want to scale.
      // For now, I'll fetch all (assuming < 1000s) and sort, or just take the last created ones.
      // Let's assume "Recent" means "Recently Created" or "Upcoming Due Date"?
      // Go code said: Order("due_date desc")
      
      // Let's try to get them. If no index, efficient sorting is hard.
      // I will assume for now we want the ones with the latest due dates.
      .collect();
    
    // Sort in memory for now
    assignments.sort((a, b) => b.dueDate - a.dueDate);
    
    return assignments.slice(0, 5);
  },
});

export const getByClass = query({
  args: { classId: v.id("classes") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("assignments")
      .withIndex("by_class_id", (q) => q.eq("classId", args.classId))
      .collect();
  },
});

export const create = mutation({
  args: {
    classId: v.id("classes"),
    title: v.string(),
    description: v.optional(v.string()),
    dueDate: v.number(),
    totalPoints: v.number(),
    category: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("assignments", args);
  },
});
