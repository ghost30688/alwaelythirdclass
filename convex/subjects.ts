import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// إضافة المواد الأساسية للثالث متوسط
export const initializeSubjects = mutation({
  args: {},
  handler: async (ctx) => {
    const subjects = [
      { name: "الرياضيات", teacher: "أ. يوسف أحمد", color: "#3B82F6" },
      { name: "الفيزياء", teacher: "أ. ليلى حسن", color: "#10B981" },
      { name: "الكيمياء", teacher: "أ. محمود علي", color: "#84CC16" },
      { name: "الأحياء", teacher: "أ. رنا محمد", color: "#22C55E" },
      { name: "اللغة العربية", teacher: "أ. عبدالرحمن", color: "#F59E0B" },
      { name: "اللغة الإنجليزية", teacher: "أ. أمل سعد", color: "#8B5CF6" },
      { name: "التاريخ", teacher: "أ. علي محمود", color: "#EF4444" },
      { name: "الجغرافية", teacher: "أ. نور الهدى", color: "#06B6D4" },
    ];

    for (const subject of subjects) {
      await ctx.db.insert("subjects", subject);
    }

    return "تم إضافة المواد بنجاح";
  },
});

// الحصول على جميع المواد
export const getAllSubjects = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("subjects").collect();
  },
});
