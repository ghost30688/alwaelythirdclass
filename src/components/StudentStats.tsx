import { Id } from "../../convex/_generated/dataModel";

interface StudentStatsProps {
  student: {
    _id: Id<"students">;
    studentName: string;
    section: string;
    canPostHomework: boolean;
  };
  homework: Array<{
    _id: Id<"homework">;
    subject: string;
    completed: Id<"students">[];
    isUrgent: boolean;
    dueDate: number;
  }>;
  subjects: Array<{
    name: string;
    color: string;
  }>;
}

export function StudentStats({ student, homework, subjects }: StudentStatsProps) {
  const completedHomework = homework.filter(hw => hw.completed.includes(student._id));
  const pendingHomework = homework.filter(hw => !hw.completed.includes(student._id));
  const urgentHomework = homework.filter(hw => hw.isUrgent && !hw.completed.includes(student._id));
  const overdueHomework = homework.filter(hw => 
    !hw.completed.includes(student._id) && Date.now() > hw.dueDate
  );

  const completionRate = homework.length > 0 ? Math.round((completedHomework.length / homework.length) * 100) : 0;

  // إحصائيات المواد
  const subjectStats = subjects.map(subject => {
    const subjectHomework = homework.filter(hw => hw.subject === subject.name);
    const subjectCompleted = subjectHomework.filter(hw => hw.completed.includes(student._id));
    const completionRate = subjectHomework.length > 0 ? Math.round((subjectCompleted.length / subjectHomework.length) * 100) : 0;
    
    return {
      name: subject.name,
      color: subject.color,
      total: subjectHomework.length,
      completed: subjectCompleted.length,
      completionRate,
    };
  });

  const StatCard = ({ title, value, icon, color, description }: {
    title: string;
    value: string | number;
    icon: string;
    color: string;
    description?: string;
  }) => (
    <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl`} style={{ backgroundColor: color + "20" }}>
          {icon}
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold" style={{ color }}>{value}</div>
          <div className="text-sm text-gray-600">{title}</div>
        </div>
      </div>
      {description && (
        <p className="text-xs text-gray-500">{description}</p>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* الإحصائيات العامة */}
      <div>
        <h3 className="text-xl font-bold text-gray-800 mb-4">الإحصائيات العامة</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard
            title="إجمالي الواجبات"
            value={homework.length}
            icon="📚"
            color="#3B82F6"
          />
          <StatCard
            title="الواجبات المكتملة"
            value={completedHomework.length}
            icon="✅"
            color="#10B981"
          />
          <StatCard
            title="الواجبات المعلقة"
            value={pendingHomework.length}
            icon="⏳"
            color="#F59E0B"
          />
          <StatCard
            title="الواجبات العاجلة"
            value={urgentHomework.length}
            icon="🚨"
            color="#EF4444"
          />
        </div>
      </div>

      {/* معدل الإنجاز */}
      <div className="bg-white rounded-xl p-6 border border-gray-100">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">معدل الإنجاز</h4>
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <div className="bg-gray-200 rounded-full h-4 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-blue-500 to-green-500 h-full transition-all duration-500"
                style={{ width: `${completionRate}%` }}
              ></div>
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-800">{completionRate}%</div>
        </div>
        <p className="text-sm text-gray-600 mt-2">
          أكملت {completedHomework.length} من أصل {homework.length} واجب
        </p>
      </div>

      {/* تحذيرات */}
      {(overdueHomework.length > 0 || urgentHomework.length > 0) && (
        <div className="space-y-3">
          <h4 className="text-lg font-semibold text-gray-800">تنبيهات مهمة</h4>
          
          {overdueHomework.length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">⚠️</span>
                <div>
                  <h5 className="font-semibold text-red-800">واجبات متأخرة</h5>
                  <p className="text-red-600 text-sm">
                    لديك {overdueHomework.length} واجب متأخر عن موعد التسليم
                  </p>
                </div>
              </div>
            </div>
          )}

          {urgentHomework.length > 0 && (
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🚨</span>
                <div>
                  <h5 className="font-semibold text-orange-800">واجبات عاجلة</h5>
                  <p className="text-orange-600 text-sm">
                    لديك {urgentHomework.length} واجب عاجل يتطلب انتباهك
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* إحصائيات المواد */}
      <div>
        <h4 className="text-lg font-semibold text-gray-800 mb-4">إحصائيات المواد</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {subjectStats.map((subject) => (
            <div key={subject.name} className="bg-white rounded-lg p-4 border border-gray-100">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: subject.color }}
                  ></div>
                  <span className="font-medium text-gray-800">{subject.name}</span>
                </div>
                <span className="text-sm font-semibold" style={{ color: subject.color }}>
                  {subject.completionRate}%
                </span>
              </div>
              <div className="bg-gray-200 rounded-full h-2 overflow-hidden mb-2">
                <div 
                  className="h-full transition-all duration-500"
                  style={{ 
                    width: `${subject.completionRate}%`,
                    backgroundColor: subject.color 
                  }}
                ></div>
              </div>
              <p className="text-xs text-gray-600">
                {subject.completed} من {subject.total} واجب
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* معلومات الطالب */}
      <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-6">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">معلومات الطالب</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-600">الاسم:</span>
            <span className="font-medium text-gray-800 mr-2">{student.studentName}</span>
          </div>
          <div>
            <span className="text-gray-600">الصف:</span>
            <span className="font-medium text-gray-800 mr-2">
              الثالث متوسط - شعبة {student.section}
            </span>
          </div>
          {student.canPostHomework && (
            <div className="md:col-span-2">
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
                ناشر واجبات - يمكنك إنشاء الواجبات
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
