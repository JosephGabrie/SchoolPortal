import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getByStudent = query({
  args: { studentId: v.id("students") },
  handler: async (ctx, args) => {
    const grades = await ctx.db
      .query("grades")
      .withIndex("by_student", (q) => q.eq("studentId", args.studentId))
      .collect();

    // Enrich with Assignment details (like Go's Preload)
    const gradesWithAssignment = await Promise.all(
      grades.map(async (grade) => {
        const assignment = await ctx.db.get(grade.assignmentId);
        return {
          ...grade,
          assignment,
        };
      })
    );

    return gradesWithAssignment;
  },
});

export const calculateAverage = query({
  args: { studentId: v.id("students") },
  handler: async (ctx, args) => {
    const grades = await ctx.db
      .query("grades")
      .withIndex("by_student", (q) => q.eq("studentId", args.studentId))
      .collect();

    if (grades.length === 0) {
      return 0;
    }

    const sum = grades.reduce((acc, curr) => acc + curr.score, 0);
    return sum / grades.length;
  },
});

export const submitGrade = mutation({
  args: {
    assignmentId: v.id("assignments"),
    studentId: v.id("students"),
    score: v.number(),
    feedback: v.optional(v.string()),
    isMissing: v.boolean(),
  },
  handler: async (ctx, args) => {
    // Check if grade already exists?
    const existing = await ctx.db
      .query("grades")
      .withIndex("by_assignment_student", (q) => 
        q.eq("assignmentId", args.assignmentId).eq("studentId", args.studentId)
      )
      .first();

    if (existing) {
      await ctx.db.patch(existing._id, {
        score: args.score,
        feedback: args.feedback,
        isMissing: args.isMissing,
        submittedAt: Date.now(),
      });
      return existing._id;
    }

    return await ctx.db.insert("grades", {
      ...args,
      submittedAt: Date.now(),
    });
  },
});
