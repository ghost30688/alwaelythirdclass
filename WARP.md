# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## أوامر التطوير الشائعة

- تثبيت الحزم:
  - PowerShell: npm install

- تشغيل بيئة التطوير (الفرونت + الباك Convex معاً):
  - npm run dev

- تشغيل كل جزء على حدة:
  - الواجهة (Vite): npm run dev:frontend
  - الباك (Convex): npm run dev:backend

- البناء للإنتاج:
  - npm run build

- الفحص والتنميط (typecheck + لوازم Convex):
  - npm run lint

- إعداد متغير بيئة Convex أثناء التطوير:
  - في PowerShell للجلسة الحالية فقط: $env:VITE_CONVEX_URL = "{{CONVEX_URL}}"
  - استبدل {{CONVEX_URL}} بعنوان نشر Convex لديك. لا تحفظ القيم الحساسة في الملف.

ملاحظات:
- لا توجد سكربتات اختبارات مُعرفة حالياً في package.json، ولا يوجد إطار اختبارات مضاف (مثل Vitest أو Jest). إذا لزم الأمر، أضِف الإطار أولاً قبل تشغيل اختبارات مفردة.

## البنية العامة للمشروع (نظرة عليا)

- الواجهة الأمامية (frontend):
  - React 19 + Vite 6 + TailwindCSS مع دعم RTL.
  - نقطة الدخول: src/main.tsx حيث يتم تهيئة ConvexReactClient باستخدام VITE_CONVEX_URL ولف التطبيق ضمن ConvexAuthProvider.
  - التطبيق الأساسي App.tsx يقدّم حالتين: غير مُوثّق (نموذج تسجيل الدخول المجهول) ومُوثّق (Dashboard). يتم تحميل بيانات المستخدم currentStudent عبر useQuery من Convex.
  - مسارات وقطع رئيسية:
    - المكوّن Dashboard: يبني التبويبات ويفصل المشاهد إلى واجبات حالية، قديمة، وإنشاء واجب (للأذونات المناسبة). يجلب البيانات: homework.getHomeworkBySection وhomework.getArchivedHomework وsubjects.getAllSubjects. يهيّئ المواد مرة واحدة عبر subjects.initializeSubjects({}).
    - CreateHomework: يستدعي homework.createHomework لإدراج واجب جديد في شعبة الطالب الحالي.
    - HomeworkList و ArchivedHomework: يعرضان البطاقات، مع أرشفة الواجبات عبر homework.archiveHomework (مسموح فقط لمنشئ الواجب).
    - SignInForm/SignOutButton: يعتمد على @convex-dev/auth/react لتسجيل الدخول المجهول وتسجيل الخروج، ويزامن حالة الطالب عبر students.logoutStudent.
  - الضبط:
    - vite.config.ts يفعّل alias ‏"@" → "./src" ويحقن كود أدوات Chef في وضع التطوير فقط.
    - tsconfig.app.json يفعّل المسارات "@/*" ويُشدد خيارات TypeScript.
    - tailwind.config.js يُحدد المصادر ويمدّ الألوان والخط العربي.

- البنية الخلفية (Convex):
  - المصادقة: @convex-dev/auth مع مزوّدين Password و Anonymous. ملف convex/auth.ts يعرّف convexAuth ويصدّر signIn/signOut/isAuthenticated وloggedInUser. ملف convex/auth.config.ts يحدّد providers مع domain = process.env.CONVEX_SITE_URL.
  - HTTP: convex/router.ts ينشئ httpRouter، وconvex/http.ts يضيف مسارات المصادقة عبر auth.addHttpRoutes(http) ويُصدّر http. أضِف أي مسارات HTTP مخصصة عبر httpAction ثم صدّرها من http.ts.
  - المخطط (schema): convex/schema.ts يعرّف الجداول والفهارس:
    - students: userId, studentName, studentCode, section, canPostHomework, isActive مع فهارس by_user, by_section, by_student_code.
    - homework: title, description, subject, section, createdBy, attachments?, isArchived مع فهارس by_section, by_created_by, by_archived.
    - subjects: name, teacher, color.
  - الدوال:
    - students.ts: loginStudent، logoutStudent، getCurrentStudent، getStudentsBySection. يستخدم STUDENT_CODES كثوابت لتفعيل/قفل الكود. يضبط isActive لمنع تعدد الجلسات على نفس الكود.
    - homework.ts: createHomework (يتحقق من الصلاحية canPostHomework)، getHomeworkBySection (يضيف creatorName)، archiveHomework (يسمح فقط لمنشئ الواجب)، getArchivedHomework.
    - subjects.ts: initializeSubjects لإضافة مواد افتراضية، وgetAllSubjects لجلبها.

- العلاقة بين الطبقات:
  - المتصفح يتصل بـ Convex عبر convex/react hooks. عنوان Convex يُؤخذ من VITE_CONVEX_URL.
  - تدفّق شائع: المستخدم يسجّل دخولاً مجهولاً → students.loginStudent يربط userId بكود الطالب ويضبط isActive → Dashboard يعرض واجبات الشعبة ويتيح الأرشفة/الإنشاء بحسب canPostHomework.

- ملاحظات من README:
  - npm run dev يشغّل الواجهة والباك معاً.
  - المشروع مرتبط بنشر Convex باسم shiny-sparrow-279. حافظ على تهيئة عنوان VITE_CONVEX_URL الصحيح عند التشغيل محلياً أو عند النشر.
  - تُعرّف مسارات HTTP المخصصة في convex/router.ts منفصلة عن convex/http.ts.

## قواعد مهمة مستخلصة من .cursor/rules/convex_rules.mdc

- استخدم دائماً صيغة الدوال الجديدة في Convex مع validators صريحة للأargs وreturns. إذا لم يوجد return أعِد v.null().
- نظّم الدوال العامة تحت query/mutation/action، والدوال الداخلية تحت internalQuery/internalMutation/internalAction. استدعِ الداخلية عبر internal.* فقط.
- لا تستخدم filter في الاستعلامات على الوثائق. عرّف فهارس في schema واستعمل withIndex للاستعلام بكفاءة. عيّن order صراحة عند الحاجة.
- مسارات HTTP تُعرّف عبر httpAction وتُسجّل على httpRouter في http.ts بالمسار الدقيق الذي تحدّده.
- عند الحاجة إلى ترقيم الصفحات استخدم paginate مع paginationOpts من convex/server.
- كن صارماً مع الأنواع Id<'table'> واستخدم v.id("table") في validators. تجنّب undefined؛ استخدم null وv.null().
- للمهام المجدولة استعمل cronJobs ومرّر FunctionReference (internal.*) صراحة.

## ملاحظات بيئية لـ Warp

- هذا المستودع يستخدم npm وVite وConvex. استخدم PowerShell على Windows كما في الأوامر أعلاه.
- عند الحاجة للوصول إلى نشر Convex: اضبط $env:VITE_CONVEX_URL لكل جلسة قبل npm run dev.
- لا تُعدّل ملفات convex/_generated يدوياً.
