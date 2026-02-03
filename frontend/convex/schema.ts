import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(), // Display name
    firstName: v.optional(v.string()),
    lastName: v.optional(v.string()),
    email: v.string(),
    role: v.union(v.literal("teacher"), v.literal("student"), v.literal("parent"), v.literal("admin")),
    workosId: v.string(), // WorkOS User ID
    profileImage: v.optional(v.string()),
  }).index("by_workos_id", ["workosId"])
    .index("by_email", ["email"]),

  teachers: defineTable({
    userId: v.id("users"),
    department: v.optional(v.string()),
    bio: v.optional(v.string()),
  }).index("by_user_id", ["userId"]),

  students: defineTable({
    userId: v.id("users"),
    studentIdNumber: v.string(),
    dateOfBirth: v.optional(v.number()),
    gradeLevel: v.number(), // Changed to number to match Go int
    guardianId: v.optional(v.id("users")), // Parent (User, not specific parent table yet)
  }).index("by_user_id", ["userId"])
    .index("by_student_id_number", ["studentIdNumber"]),

  classes: defineTable({
    name: v.string(),
    teacherId: v.id("teachers"),
    description: v.optional(v.string()),
    schedule: v.optional(v.string()),
    semester: v.optional(v.string()),
  }).index("by_teacher_id", ["teacherId"]),

  enrollments: defineTable({
    studentId: v.id("students"),
    classId: v.id("classes"),
    enrolledAt: v.number(),
  }).index("by_student_class", ["studentId", "classId"])
    .index("by_class", ["classId"])
    .index("by_student", ["studentId"]),

  assignments: defineTable({
    classId: v.id("classes"),
    title: v.string(),
    description: v.optional(v.string()),
    dueDate: v.number(), // Timestamp
    totalPoints: v.number(),
    category: v.string(), // e.g. "Homework", "Quiz"
  }).index("by_class_id", ["classId"]),

  grades: defineTable({
    assignmentId: v.id("assignments"),
    studentId: v.id("students"),
    score: v.number(),
    feedback: v.optional(v.string()),
    isMissing: v.boolean(),
    submittedAt: v.optional(v.number()),
  }).index("by_assignment_student", ["assignmentId", "studentId"])
    .index("by_student", ["studentId"]),

  attendance: defineTable({
    studentId: v.id("students"),
    classId: v.id("classes"),
    date: v.number(), // Timestamp for the day
    status: v.string(), // 'present', 'absent', 'tardy', 'excused'
    notes: v.optional(v.string()),
  }).index("by_student_class_date", ["studentId", "classId", "date"])
    .index("by_class_date", ["classId", "date"]),
});