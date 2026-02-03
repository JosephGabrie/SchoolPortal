import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const create = mutation({
  args: {
    name: v.string(),
    teacherId: v.id("teachers"),
    description: v.optional(v.string()),
    schedule: v.optional(v.string()),
    semester: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("classes", args);
  },
});

export const listByTeacher = query({
  args: { teacherId: v.id("teachers") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("classes")
      .withIndex("by_teacher_id", (q) => q.eq("teacherId", args.teacherId))
      .collect();
  },
});

export const get = query({
  args: { classId: v.id("classes") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.classId);
  },
});

export const enrollStudent = mutation({
  args: {
    studentId: v.id("students"),
    classId: v.id("classes"),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("enrollments")
      .withIndex("by_student_class", (q) => 
        q.eq("studentId", args.studentId).eq("classId", args.classId)
      )
      .first();

    if (existing) return existing._id;

    return await ctx.db.insert("enrollments", {
      studentId: args.studentId,
      classId: args.classId,
      enrolledAt: Date.now(),
    });
  },
});
