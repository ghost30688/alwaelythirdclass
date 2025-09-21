import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

const applicationTables = {
  // جدول الطلاب
  students: defineTable({
    userId: v.id("users"),
    studentName: v.string(),
    studentCode: v.string(), // كود الطالب
    section: v.string(), // "1", "2", "3", "4"
    canPostHomework: v.boolean(), // هل يمكن للطالب نشر الواجبات
    isActive: v.optional(v.boolean()), // هل الحساب نشط (مسجل دخول)
  })
    .index("by_user", ["userId"])
    .index("by_section", ["section"])
    .index("by_student_code", ["studentCode"]),

  // جدول الواجبات
  homework: defineTable({
    title: v.string(),
    description: v.string(),
    subject: v.string(), // المادة
    section: v.string(), // الشعبة المحددة
    createdBy: v.id("students"),
    attachments: v.optional(v.array(v.id("_storage"))),
    isArchived: v.boolean(), // للواجبات القديمة
  })
    .index("by_section", ["section"])
    .index("by_created_by", ["createdBy"])
    .index("by_archived", ["isArchived"]),

  // جدول المواد الدراسية
  subjects: defineTable({
    name: v.string(),
    teacher: v.string(),
    color: v.string(), // لون المادة في الواجهة
  }),
};

export default defineSchema({
  ...authTables,
  ...applicationTables,
});
