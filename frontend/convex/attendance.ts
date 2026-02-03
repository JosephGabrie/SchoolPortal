import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const mark = mutation({
  args: {
    studentId: v.id("students"),
    classId: v.id("classes"),
    date: v.number(),
    status: v.string(),
    notes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Check if record exists for this day
    const existing = await ctx.db
      .query("attendance")
      .withIndex("by_student_class_date", (q) => 
        q.eq("studentId", args.studentId)
         .eq("classId", args.classId)
         .eq("date", args.date)
      )
      .first();

    if (existing) {
      await ctx.db.patch(existing._id, {
        status: args.status,
        notes: args.notes,
      });
      return existing._id;
    }

    return await ctx.db.insert("attendance", args);
  },
});

export const getByStudent = query({
  args: { studentId: v.id("students") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("attendance")
      .withIndex("by_student_class_date", (q) => q.eq("studentId", args.studentId))
      .collect();
  },
});
