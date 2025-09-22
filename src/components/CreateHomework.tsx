import { useState } from "react";
import type React from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";
import { toast } from "sonner";

interface CreateHomeworkProps {
  student: {
    _id: Id<"students">;
    section: string;
  };
  subjects: Array<{
    name: string;
    color: string;
  }>;
}

export function CreateHomework({ student, subjects }: CreateHomeworkProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    subject: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const createHomework = useMutation(api.homework.createHomework);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await createHomework({
        title: formData.title,
        description: formData.description,
        subject: formData.subject,
      });

      toast.success("تم إنشاء الواجب بنجاح!");
      
      // Reset form
      setFormData({
        title: "",
        description: "",
        subject: "",
      });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "حدث خطأ أثناء إنشاء الواجب");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">إنشاء واجب جديد</h2>
        <p className="text-gray-600">قم بإنشاء واجب جديد لطلاب شعبة {student.section}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            عنوان الواجب
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="أدخل عنوان الواجب"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            تفاصيل الواجب
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
            placeholder="اكتب تفاصيل الواجب والمطلوب من الطلاب"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            المادة
          </label>
          <select
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          >
            <option value="">اختر المادة</option>
            {subjects.map(subject => (
              <option key={subject.name} value={subject.name}>
                {subject.name}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {isLoading ? "جاري الإنشاء..." : "إنشاء الواجب"}
        </button>
      </form>
    </div>
  );
}
