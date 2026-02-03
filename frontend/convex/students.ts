import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getProfile = query({
  args: { studentId: v.id("students") },
  handler: async (ctx, args) => {
    const student = await ctx.db.get(args.studentId);
    if (!student) return null;

    const user = await ctx.db.get(student.userId);
    return {
      ...student,
      user, // Embed user details
    };
  },
});

export const getEnrollments = query({
  args: { studentId: v.id("students") },
  handler: async (ctx, args) => {
    const enrollments = await ctx.db
      .query("enrollments")
      .withIndex("by_student", (q) => q.eq("studentId", args.studentId))
      .collect();

    const classes = await Promise.all(
      enrollments.map(async (e) => {
        const classData = await ctx.db.get(e.classId);
        return {
          ...e,
          class: classData,
        };
      })
    );

    return classes;
  },
});

// Create/Update specific student profile (after initial user sync)
export const updateProfile = mutation({
  args: {
    userId: v.id("users"), // The base user ID
    studentIdNumber: v.string(),
    gradeLevel: v.number(),
    dateOfBirth: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    // Check if student record exists for this user
    const existing = await ctx.db
      .query("students")
      .withIndex("by_user_id", (q) => q.eq("userId", args.userId))
      .first();

    if (existing) {
      await ctx.db.patch(existing._id, {
        studentIdNumber: args.studentIdNumber,
        gradeLevel: args.gradeLevel,
        dateOfBirth: args.dateOfBirth,
      });
      return existing._id;
    }

    return await ctx.db.insert("students", {
      userId: args.userId,
      studentIdNumber: args.studentIdNumber,
      gradeLevel: args.gradeLevel,
      dateOfBirth: args.dateOfBirth,
    });
  },
});
