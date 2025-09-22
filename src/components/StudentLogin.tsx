import { useState } from "react";
import type React from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { toast } from "sonner";

export function StudentLogin() {
  const [formData, setFormData] = useState({
    studentName: "",
    studentCode: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const loginStudent = useMutation(api.students.loginStudent);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await loginStudent(formData);
      toast.success("تم تسجيل الدخول بنجاح!");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "حدث خطأ أثناء تسجيل الدخول");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-2xl">🎓</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">تسجيل دخول الطالب</h2>
          <p className="text-gray-600">أدخل اسمك وكود الطالب الخاص بك</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              اسم الطالب
            </label>
            <input
              type="text"
              name="studentName"
              value={formData.studentName}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="أدخل اسمك الكامل"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              الكود
            </label>
            <input
              type="text"
              name="studentCode"
              value={formData.studentCode}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="أدخل كود الطالب الخاص بك"
            />
            <p className="text-xs text-gray-500 mt-1">
              استخدم الكود المعطى لك من قبل المدرسة
            </p>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isLoading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="bg-blue-50 rounded-lg p-4">
            <h4 className="font-semibold text-blue-800 mb-2">ملاحظة مهمة:</h4>
            <p className="text-blue-700 text-sm">
              • كل طالب له كود خاص به<br/>
              • إذا كان الكود مستخدم حالياً، لن تتمكن من الدخول<br/>
              • عند تسجيل الخروج، يصبح الكود متاحاً للاستخدام مرة أخرى
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
