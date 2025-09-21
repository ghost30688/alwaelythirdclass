import { Authenticated, Unauthenticated, useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { SignInForm } from "./SignInForm";
import { SignOutButton } from "./SignOutButton";
import { Toaster } from "sonner";
import { StudentLogin } from "./components/StudentLogin";
import { Dashboard } from "./components/Dashboard";

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm shadow-lg border-b-2 border-blue-100">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-2xl">📚</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">ثانوية الوائلي للمتميزين</h1>
                <p className="text-lg text-blue-600 font-semibold">موقع واجبات الثالث متوسط</p>
              </div>
            </div>
            <Authenticated>
              <SignOutButton />
            </Authenticated>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Content />
      </main>

      <Toaster position="top-right" />
    </div>
  );
}

function Content() {
  const loggedInUser = useQuery(api.auth.loggedInUser);
  const currentStudent = useQuery(api.students.getCurrentStudent);

  if (loggedInUser === undefined || currentStudent === undefined) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Unauthenticated>
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-3xl">📖</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">مرحباً بك</h2>
            <p className="text-gray-600">سجل دخولك للوصول إلى واجبات الثالث متوسط</p>
          </div>
          <SignInForm />
        </div>
      </Unauthenticated>

      <Authenticated>
        {!currentStudent ? (
          <StudentLogin />
        ) : (
          <Dashboard student={currentStudent} />
        )}
      </Authenticated>
    </div>
  );
}
