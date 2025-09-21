import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";
import { toast } from "sonner";

interface HomeworkListProps {
  homework: Array<{
    _id: Id<"homework">;
    title: string;
    description: string;
    subject: string;
    creatorName: string;
  }>;
  student: {
    _id: Id<"students">;
    studentName: string;
    section: string;
    canPostHomework: boolean;
  };
  subjects: Array<{
    name: string;
    color: string;
  }>;
}

export function HomeworkList({ homework, student, subjects }: HomeworkListProps) {
  const archiveHomework = useMutation(api.homework.archiveHomework);

  const getSubjectColor = (subjectName: string) => {
    const subject = subjects.find(s => s.name === subjectName);
    return subject?.color || "#6B7280";
  };

  const handleArchive = async (homeworkId: Id<"homework">) => {
    try {
      await archiveHomework({ homeworkId });
      toast.success("تم نقل الواجب إلى الواجبات القديمة");
    } catch (error) {
      toast.error("حدث خطأ أثناء أرشفة الواجب");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-gray-800">الواجبات الحالية</h3>
        <span className="text-sm text-gray-500">شعبة {student.section}</span>
      </div>

      {/* Homework Cards */}
      <div className="space-y-4">
        {homework.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">لا توجد واجبات حالية</h3>
            <p className="text-gray-500">لم يتم نشر أي واجبات جديدة بعد</p>
          </div>
        ) : (
          homework.map((hw) => (
            <div
              key={hw._id}
              className="bg-white border-2 border-gray-200 rounded-xl p-6 transition-all hover:shadow-lg hover:border-blue-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: getSubjectColor(hw.subject) }}
                    ></span>
                    <span className="text-sm font-medium text-gray-600">
                      {hw.subject}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {hw.title}
                  </h3>
                  <p className="text-gray-600 mb-3 leading-relaxed">{hw.description}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>👨‍🎓 بواسطة: {hw.creatorName}</span>
                  </div>
                </div>
                
                {student.canPostHomework && (
                  <button
                    onClick={() => handleArchive(hw._id)}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium transition-all hover:bg-red-600 hover:text-white"
                  >
                    أرشفة
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
