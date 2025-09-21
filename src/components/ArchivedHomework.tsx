import { Id } from "../../convex/_generated/dataModel";

interface ArchivedHomeworkProps {
  homework: Array<{
    _id: Id<"homework">;
    title: string;
    description: string;
    subject: string;
    creatorName: string;
  }>;
  subjects: Array<{
    name: string;
    color: string;
  }>;
}

export function ArchivedHomework({ homework, subjects }: ArchivedHomeworkProps) {
  const getSubjectColor = (subjectName: string) => {
    const subject = subjects.find(s => s.name === subjectName);
    return subject?.color || "#6B7280";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-gray-800">الواجبات القديمة</h3>
        <span className="text-sm text-gray-500">الواجبات المؤرشفة</span>
      </div>

      {/* Homework Cards */}
      <div className="space-y-4">
        {homework.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📋</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">لا توجد واجبات قديمة</h3>
            <p className="text-gray-500">لم يتم أرشفة أي واجبات بعد</p>
          </div>
        ) : (
          homework.map((hw) => (
            <div
              key={hw._id}
              className="bg-gray-50 border-2 border-gray-200 rounded-xl p-6 opacity-75"
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
                    <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs font-medium">
                      مؤرشف
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-700 mb-2">
                    {hw.title}
                  </h3>
                  <p className="text-gray-600 mb-3 leading-relaxed">{hw.description}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>👨‍🎓 بواسطة: {hw.creatorName}</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
