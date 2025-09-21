import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

// إنشاء واجب جديد
export const createHomework = mutation({
  args: {
    title: v.string(),
    description: v.string(),
    subject: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("يجب تسجيل الدخول أولاً");

    const student = await ctx.db
      .query("students")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .unique();

    if (!student) throw new Error("الطالب غير مسجل");
    if (!student.canPostHomework) throw new Error("غير مسموح لك بنشر الواجبات");

    return await ctx.db.insert("homework", {
      title: args.title,
      description: args.description,
      subject: args.subject,
      section: student.section, // فقط للشعبة المحددة للناشر
      createdBy: student._id,
      isArchived: false,
    });
  },
});

// الحصول على واجبات الطالب حسب الشعبة
export const getHomeworkBySection = query({
  args: { section: v.string() },
  handler: async (ctx, args) => {
    const homework = await ctx.db
      .query("homework")
      .withIndex("by_section", (q) => q.eq("section", args.section))
      .filter((q) => q.eq(q.field("isArchived"), false))
      .order("desc")
      .collect();

    // إضافة معلومات منشئ الواجب
    const homeworkWithCreator = await Promise.all(
      homework.map(async (hw) => {
        const creator = await ctx.db.get(hw.createdBy);
        return {
          ...hw,
          creatorName: creator?.studentName || "غير معروف",
        };
      })
    );

    return homeworkWithCreator;
  },
});

// أرشفة الواجب (نقله للواجبات القديمة)
export const archiveHomework = mutation({
  args: { homeworkId: v.id("homework") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("يجب تسجيل الدخول أولاً");

    const student = await ctx.db
      .query("students")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .unique();

    if (!student) throw new Error("الطالب غير مسجل");

    const homework = await ctx.db.get(args.homeworkId);
    if (!homework) throw new Error("الواجب غير موجود");

    // التحقق من أن الطالب هو منشئ الواجب
    if (homework.createdBy !== student._id) {
      throw new Error("غير مسموح لك بأرشفة هذا الواجب");
    }

    await ctx.db.patch(args.homeworkId, { isArchived: true });
    return true;
  },
});

// الحصول على الواجبات المؤرشفة
export const getArchivedHomework = query({
  args: { section: v.string() },
  handler: async (ctx, args) => {
    const homework = await ctx.db
      .query("homework")
      .withIndex("by_section", (q) => q.eq("section", args.section))
      .filter((q) => q.eq(q.field("isArchived"), true))
      .order("desc")
      .collect();

    // إضافة معلومات منشئ الواجب
    const homeworkWithCreator = await Promise.all(
      homework.map(async (hw) => {
        const creator = await ctx.db.get(hw.createdBy);
        return {
          ...hw,
          creatorName: creator?.studentName || "غير معروف",
        };
      })
    );

    return homeworkWithCreator;
  },
});
