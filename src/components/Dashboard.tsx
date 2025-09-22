import { useState, useEffect } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";
import { HomeworkList } from "./HomeworkList";
import { CreateHomework } from "./CreateHomework";
import { ArchivedHomework } from "./ArchivedHomework";

interface DashboardProps {
  student: {
    _id: Id<"students">;
    studentName: string;
    section: string;
    studentCode: string;
    canPostHomework: boolean;
  };
}

export function Dashboard({ student }: DashboardProps) {
  const [activeTab, setActiveTab] = useState("homework");
  
  const homework = useQuery(api.homework.getHomeworkBySection, { section: student.section });
  const archivedHomework = useQuery(api.homework.getArchivedHomework, { section: student.section });
  const subjects = useQuery(api.subjects.getAllSubjects);
  const initializeSubjects = useMutation(api.subjects.initializeSubjects);

  // تهيئة المواد إذا لم تكن موجودة
  useEffect(() => {
    if (subjects && subjects.length === 0) {
      initializeSubjects({});
    }
  }, [subjects, initializeSubjects]);

  const tabs = [
    { id: "homework", label: "الواجبات الحالية", icon: "📚" },
    { id: "archived", label: "الواجبات القديمة", icon: "📋" },
    ...(student.canPostHomework ? [{ id: "create", label: "إنشاء واجب", icon: "✏️" }] : []),
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">مرحباً {student.studentName}</h2>
            <p className="text-blue-100">
              الثالث متوسط - شعبة {student.section}
            </p>
            {student.canPostHomework && (
              <span className="inline-block bg-white/20 text-white px-3 py-1 rounded-full text-sm mt-2">
                ناشر واجبات
              </span>
            )}
          </div>
          <div className="text-6xl opacity-20">🎓</div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="flex border-b border-gray-100">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 px-6 py-4 text-center font-medium transition-all ${
                activeTab === tab.id
                  ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                  : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-6">
          {activeTab === "homework" && (
            <HomeworkList 
              homework={homework || []} 
              student={student}
              subjects={subjects || []}
            />
          )}
          
          {activeTab === "archived" && (
            <ArchivedHomework 
              homework={archivedHomework || []} 
              subjects={subjects || []}
            />
          )}
          
          {activeTab === "create" && student.canPostHomework && (
            <CreateHomework 
              student={student}
              subjects={subjects || []}
            />
          )}
        </div>
      </div>
    </div>
  );
}
