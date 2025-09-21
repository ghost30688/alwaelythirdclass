import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

// أكواد الطلاب مع أسمائهم وشعبهم
const STUDENT_CODES: Record<string, { name: string; section: string; canPost: boolean }> = {
  // شعبة 1 - 51 كود
  "S1001a": { name: "", section: "1", canPost: true },
  "S1002a": { name: "", section: "1", canPost: true },
  "S1003": { name: "", section: "1", canPost: false },
  "S1004": { name: "", section: "1", canPost: false },
  "S1005": { name: "", section: "1", canPost: false },
  "S1006": { name: "", section: "1", canPost: false },
  "S1007": { name: "", section: "1", canPost: false },
  "S1008": { name: "", section: "1", canPost: false },
  "S1009": { name: "", section: "1", canPost: false },
  "S1010": { name: "", section: "1", canPost: false },
  "S1011": { name: "", section: "1", canPost: false },
  "S1012": { name: "", section: "1", canPost: false },
  "S1013": { name: "", section: "1", canPost: false },
  "S1014": { name: "", section: "1", canPost: false },
  "S1015": { name: "", section: "1", canPost: false },
  "S1016": { name: "", section: "1", canPost: false },
  "S1017": { name: "", section: "1", canPost: false },
  "S1018": { name: "", section: "1", canPost: false },
  "S1019": { name: "", section: "1", canPost: false },
  "S1020": { name: "", section: "1", canPost: false },
  "S1021": { name: "", section: "1", canPost: false },
  "S1022": { name: "", section: "1", canPost: false },
  "S1023": { name: "", section: "1", canPost: false },
  "S1024": { name: "", section: "1", canPost: false },
  "S1025": { name: "", section: "1", canPost: false },
  "S1026": { name: "", section: "1", canPost: false },
  "S1027": { name: "", section: "1", canPost: false },
  "S1028": { name: "", section: "1", canPost: false },
  "S1029": { name: "", section: "1", canPost: false },
  "S1030": { name: "", section: "1", canPost: false },
  "S1031": { name: "", section: "1", canPost: false },
  "S1032": { name: "", section: "1", canPost: false },
  "S1033": { name: "", section: "1", canPost: false },
  "S1034": { name: "", section: "1", canPost: false },
  "S1035": { name: "", section: "1", canPost: false },
  "S1036": { name: "", section: "1", canPost: false },
  "S1037": { name: "", section: "1", canPost: false },
  "S1038": { name: "", section: "1", canPost: false },
  "S1039": { name: "", section: "1", canPost: false },
  "S1040": { name: "", section: "1", canPost: false },
  "S1041": { name: "", section: "1", canPost: false },
  "S1042": { name: "", section: "1", canPost: false },
  "S1043": { name: "", section: "1", canPost: false },
  "S1044": { name: "", section: "1", canPost: false },
  "S1045": { name: "", section: "1", canPost: false },
  "S1046": { name: "", section: "1", canPost: false },
  "S1047": { name: "", section: "1", canPost: false },
  "S1048": { name: "", section: "1", canPost: false },
  "S1049": { name: "", section: "1", canPost: false },
  "S1050": { name: "", section: "1", canPost: false },
  "S1051": { name: "", section: "1", canPost: false },

  // شعبة 2 - 49 كود
  "S2001a": { name: "", section: "2", canPost: true },
  "S2002a": { name: "", section: "2", canPost: true },
  "S2003": { name: "", section: "2", canPost: false },
  "S2004": { name: "", section: "2", canPost: false },
  "S2005": { name: "", section: "2", canPost: false },
  "S2006": { name: "", section: "2", canPost: false },
  "S2007": { name: "", section: "2", canPost: false },
  "S2008": { name: "", section: "2", canPost: false },
  "S2009": { name: "", section: "2", canPost: false },
  "S2010": { name: "", section: "2", canPost: false },
  "S2011": { name: "", section: "2", canPost: false },
  "S2012": { name: "", section: "2", canPost: false },
  "S2013": { name: "", section: "2", canPost: false },
  "S2014": { name: "", section: "2", canPost: false },
  "S2015": { name: "", section: "2", canPost: false },
  "S2016": { name: "", section: "2", canPost: false },
  "S2017": { name: "", section: "2", canPost: false },
  "S2018": { name: "", section: "2", canPost: false },
  "S2019": { name: "", section: "2", canPost: false },
  "S2020": { name: "", section: "2", canPost: false },
  "S2021": { name: "", section: "2", canPost: false },
  "S2022": { name: "", section: "2", canPost: false },
  "S2023": { name: "", section: "2", canPost: false },
  "S2024": { name: "", section: "2", canPost: false },
  "S2025": { name: "", section: "2", canPost: false },
  "S2026": { name: "", section: "2", canPost: false },
  "S2027": { name: "", section: "2", canPost: false },
  "S2028": { name: "", section: "2", canPost: false },
  "S2029": { name: "", section: "2", canPost: false },
  "S2030": { name: "", section: "2", canPost: false },
  "S2031": { name: "", section: "2", canPost: false },
  "S2032": { name: "", section: "2", canPost: false },
  "S2033": { name: "", section: "2", canPost: false },
  "S2034": { name: "", section: "2", canPost: false },
  "S2035": { name: "", section: "2", canPost: false },
  "S2036": { name: "", section: "2", canPost: false },
  "S2037": { name: "", section: "2", canPost: false },
  "S2038": { name: "", section: "2", canPost: false },
  "S2039": { name: "", section: "2", canPost: false },
  "S2040": { name: "", section: "2", canPost: false },
  "S2041": { name: "", section: "2", canPost: false },
  "S2042": { name: "", section: "2", canPost: false },
  "S2043": { name: "", section: "2", canPost: false },
  "S2044": { name: "", section: "2", canPost: false },
  "S2045": { name: "", section: "2", canPost: false },
  "S2046": { name: "", section: "2", canPost: false },
  "S2047": { name: "", section: "2", canPost: false },
  "S2048": { name: "", section: "2", canPost: false },
  "S2049": { name: "", section: "2", canPost: false },

  // شعبة 3 - 60 كود
  "S3001a": { name: "", section: "3", canPost: true },
  "S3002a": { name: "", section: "3", canPost: true },
  "S3003": { name: "", section: "3", canPost: false },
  "S3004": { name: "", section: "3", canPost: false },
  "S3005": { name: "", section: "3", canPost: false },
  "S3006": { name: "", section: "3", canPost: false },
  "S3007": { name: "", section: "3", canPost: false },
  "S3008": { name: "", section: "3", canPost: false },
  "S3009": { name: "", section: "3", canPost: false },
  "S3010": { name: "", section: "3", canPost: false },
  "S3011": { name: "", section: "3", canPost: false },
  "S3012": { name: "", section: "3", canPost: false },
  "S3013": { name: "", section: "3", canPost: false },
  "S3014": { name: "", section: "3", canPost: false },
  "S3015": { name: "", section: "3", canPost: false },
  "S3016": { name: "", section: "3", canPost: false },
  "S3017": { name: "", section: "3", canPost: false },
  "S3018": { name: "", section: "3", canPost: false },
  "S3019": { name: "", section: "3", canPost: false },
  "S3020": { name: "", section: "3", canPost: false },
  "S3021": { name: "", section: "3", canPost: false },
  "S3022": { name: "", section: "3", canPost: false },
  "S3023": { name: "", section: "3", canPost: false },
  "S3024": { name: "", section: "3", canPost: false },
  "S3025": { name: "", section: "3", canPost: false },
  "S3026": { name: "", section: "3", canPost: false },
  "S3027": { name: "", section: "3", canPost: false },
  "S3028": { name: "", section: "3", canPost: false },
  "S3029": { name: "", section: "3", canPost: false },
  "S3030": { name: "", section: "3", canPost: false },
  "S3031": { name: "", section: "3", canPost: false },
  "S3032": { name: "", section: "3", canPost: false },
  "S3033": { name: "", section: "3", canPost: false },
  "S3034": { name: "", section: "3", canPost: false },
  "S3035": { name: "", section: "3", canPost: false },
  "S3036": { name: "", section: "3", canPost: false },
  "S3037": { name: "", section: "3", canPost: false },
  "S3038": { name: "", section: "3", canPost: false },
  "S3039": { name: "", section: "3", canPost: false },
  "S3040": { name: "", section: "3", canPost: false },
  "S3041": { name: "", section: "3", canPost: false },
  "S3042": { name: "", section: "3", canPost: false },
  "S3043": { name: "", section: "3", canPost: false },
  "S3044": { name: "", section: "3", canPost: false },
  "S3045": { name: "", section: "3", canPost: false },
  "S3046": { name: "", section: "3", canPost: false },
  "S3047": { name: "", section: "3", canPost: false },
  "S3048": { name: "", section: "3", canPost: false },
  "S3049": { name: "", section: "3", canPost: false },
  "S3050": { name: "", section: "3", canPost: false },
  "S3051": { name: "", section: "3", canPost: false },
  "S3052": { name: "", section: "3", canPost: false },
  "S3053": { name: "", section: "3", canPost: false },
  "S3054": { name: "", section: "3", canPost: false },
  "S3055": { name: "", section: "3", canPost: false },
  "S3056": { name: "", section: "3", canPost: false },
  "S3057": { name: "", section: "3", canPost: false },
  "S3058": { name: "", section: "3", canPost: false },
  "S3059": { name: "", section: "3", canPost: false },
  "S3060": { name: "", section: "3", canPost: false },

  // شعبة 4 - 49 كود
  "S4001a": { name: "", section: "4", canPost: true },
  "S4002a": { name: "", section: "4", canPost: true },
  "S4003": { name: "", section: "4", canPost: false },
  "S4004": { name: "", section: "4", canPost: false },
  "S4005": { name: "", section: "4", canPost: false },
  "S4006": { name: "", section: "4", canPost: false },
  "S4007": { name: "", section: "4", canPost: false },
  "S4008": { name: "", section: "4", canPost: false },
  "S4009": { name: "", section: "4", canPost: false },
  "S4010": { name: "", section: "4", canPost: false },
  "S4011": { name: "", section: "4", canPost: false },
  "S4012": { name: "", section: "4", canPost: false },
  "S4013": { name: "", section: "4", canPost: false },
  "S4014": { name: "", section: "4", canPost: false },
  "S4015": { name: "", section: "4", canPost: false },
  "S4016": { name: "", section: "4", canPost: false },
  "S4017": { name: "", section: "4", canPost: false },
  "S4018": { name: "", section: "4", canPost: false },
  "S4019": { name: "", section: "4", canPost: false },
  "S4020": { name: "", section: "4", canPost: false },
  "S4021": { name: "", section: "4", canPost: false },
  "S4022": { name: "", section: "4", canPost: false },
  "S4023": { name: "", section: "4", canPost: false },
  "S4024": { name: "", section: "4", canPost: false },
  "S4025": { name: "", section: "4", canPost: false },
  "S4026": { name: "", section: "4", canPost: false },
  "S4027": { name: "", section: "4", canPost: false },
  "S4028": { name: "", section: "4", canPost: false },
  "S4029": { name: "", section: "4", canPost: false },
  "S4030": { name: "", section: "4", canPost: false },
  "S4031": { name: "", section: "4", canPost: false },
  "S4032": { name: "", section: "4", canPost: false },
  "S4033": { name: "", section: "4", canPost: false },
  "S4034": { name: "", section: "4", canPost: false },
  "S4035": { name: "", section: "4", canPost: false },
  "S4036": { name: "", section: "4", canPost: false },
  "S4037": { name: "", section: "4", canPost: false },
  "S4038": { name: "", section: "4", canPost: false },
  "S4039": { name: "", section: "4", canPost: false },
  "S4040": { name: "", section: "4", canPost: false },
  "S4041": { name: "", section: "4", canPost: false },
  "S4042": { name: "", section: "4", canPost: false },
  "S4043": { name: "", section: "4", canPost: false },
  "S4044": { name: "", section: "4", canPost: false },
  "S4045": { name: "", section: "4", canPost: false },
  "S4046": { name: "", section: "4", canPost: false },
  "S4047": { name: "", section: "4", canPost: false },
  "S4048": { name: "", section: "4", canPost: false },
  "S4049": { name: "", section: "4", canPost: false },
};

// الحصول على بيانات الطالب الحالي
export const getCurrentStudent = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return null;

    const student = await ctx.db
      .query("students")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .unique();

    return student;
  },
});

// تسجيل طالب جديد أو تسجيل دخول
export const loginStudent = mutation({
  args: {
    studentName: v.string(),
    studentCode: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("يجب تسجيل الدخول أولاً");

    // التحقق من وجود الكود في النظام
    if (!STUDENT_CODES[args.studentCode]) {
      throw new Error("كود الطالب غير صحيح");
    }

    const codeData = STUDENT_CODES[args.studentCode];

    // التحقق من وجود طالب مسجل بهذا الكود
    const existingStudent = await ctx.db
      .query("students")
      .withIndex("by_student_code", (q) => q.eq("studentCode", args.studentCode))
      .unique();

    if (existingStudent) {
      // إذا كان الحساب نشط (مسجل دخول بالفعل)
      if (existingStudent.isActive) {
        throw new Error("هذا الحساب مستخدم حالياً من قبل طالب آخر");
      }
      
      // تحديث الحساب ليصبح نشط مع المستخدم الجديد
      await ctx.db.patch(existingStudent._id, {
        userId,
        studentName: args.studentName,
        isActive: true,
      });

      // تحديث اسم الطالب في قاعدة البيانات المحلية
      STUDENT_CODES[args.studentCode].name = args.studentName;

      return existingStudent._id;
    } else {
      // إنشاء حساب جديد
      const studentId = await ctx.db.insert("students", {
        userId,
        studentName: args.studentName,
        studentCode: args.studentCode,
        section: codeData.section,
        canPostHomework: codeData.canPost,
        isActive: true,
      });

      // تحديث اسم الطالب في قاعدة البيانات المحلية
      STUDENT_CODES[args.studentCode].name = args.studentName;

      return studentId;
    }
  },
});

// تسجيل خروج الطالب
export const logoutStudent = mutation({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return;

    const student = await ctx.db
      .query("students")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .unique();

    if (student) {
      // تحديث الحساب ليصبح غير نشط
      await ctx.db.patch(student._id, {
        isActive: false,
      });
    }
  },
});

// الحصول على جميع الطلاب في شعبة معينة
export const getStudentsBySection = query({
  args: { section: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("students")
      .withIndex("by_section", (q) => q.eq("section", args.section))
      .collect();
  },
});
