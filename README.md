# YMO Avatar - منصة الواقع المعزز AR

## 🎯 نظرة عامة

YMO Avatar هي منصة ويب تتيح لك إنشاء تجارب الواقع المعزز (AR) بسهولة. ببساطة:
1. **رفع صورة** (الصورة التي سيتم مسحها)
2. **رفع محتوى** (فيديو أو صورة أو نموذج 3D)
3. **مشاركة** التجربة مع الآخرين

عندما يمسح أي شخص الصورة باستخدام كاميرا الهاتف، **سيظهر المحتوى تلقائياً** في الواقع المعزز!

## ✨ المميزات الرئيسية

### 🎨 للمسؤولين (Creators)
- **إنشاء مشاريع AR** - رفع صور وفيديوهات بسهولة
- **تدريب الصور** - تدريب تلقائي للصور باستخدام MindAR
- **إدارة المشاريع** - عرض، تعديل، وحذف المشاريع
- **QR Codes** - توليد QR codes تلقائياً لكل مشروع
- **إحصائيات** - متابعة عدد المشاهدات لكل مشروع

### 📱 للمستخدمين (Viewers)
- **مسح ضوئي AR** - مسح الصور لرؤية المحتوى
- **بدون تطبيقات** - كل شيء يعمل في المتصفح مباشرة
- **تتبع حقيقي** - المحتوى يظهر ويختفي تلقائياً عند الابتعاد
- **دعم متعدد** - صور، فيديوهات، ونماذج 3D

## 🚀 كيفية الاستخدام

### إنشاء تجربة AR جديدة

1. **سجل دخول** أو أنشئ حساب جديد
2. اضغط على **"Create"** من القائمة السفلية
3. أدخل **اسم المشروع**
4. ارفع **صورة Marker** (الصورة التي سيتم مسحها)
5. اختر **نوع المحتوى**:
   - 📷 صورة
   - 🎥 فيديو (ملف أو رابط)
   - 🎲 نموذج 3D
6. اضغط **"Generate"**

النظام سيقوم تلقائياً بـ:
- ✅ رفع الملفات
- ✅ تدريب الصورة للتعرف عليها
- ✅ إنشاء ملف Target للتتبع
- ✅ توليد QR Code للمشاركة

### مسح تجربة AR

1. اذهب إلى **"/scan"** أو اضغط على **"Scan"** في القائمة
2. اسمح بالوصول للكاميرا
3. **وجه الكاميرا** على صورة Marker
4. سيظهر **المحتوى تلقائياً** عند التعرف على الصورة!
5. **ابتعد** لإخفاء المحتوى

## 🛠️ التقنيات المستخدمة

### Frontend
- **React 18** - مكتبة واجهة المستخدم
- **TypeScript** - Type-safe JavaScript
- **Vite** - Build tool سريع
- **TailwindCSS** - Styling framework
- **shadcn/ui** - مكونات UI جاهزة
- **React Router** - Routing

### AR & 3D
- **MindAR** - مكتبة AR للـ Image Tracking
- **Three.js** - رسومات 3D في المتصفح
- **@react-three/fiber** - React renderer لـ Three.js
- **@react-three/drei** - مساعدات Three.js

### Backend
- **Supabase** - Backend as a Service
  - 🗄️ PostgreSQL Database
  - 📦 Storage للملفات
  - 🔐 Authentication
  - ⚡ Edge Functions
- **Deno** - Runtime للـ Edge Functions

## 📁 بنية المشروع

```
ymoavatar/
├─ src/
│  ├─ components/
│  │  ├─ ARScanner.tsx      # مكون المسح الضوئي AR
│  │  ├─ ARViewer.tsx       # عارض AR منفرد
│  │  ├─ BottomNav.tsx      # القائمة السفلية
│  │  └─ ui/                # مكونات shadcn/ui
│  ├─ pages/
│  │  ├─ Index.tsx          # الصفحة الرئيسية
│  │  ├─ Create.tsx         # إنشاء مشاريع AR
│  │  ├─ Dashboard.tsx      # إدارة المشاريع
│  │  ├─ Scan.tsx          # ⭐ صفحة المسح الجديدة
│  │  ├─ Viewer.tsx         # عرض مشروع محدد
│  │  ├─ Auth.tsx           # تسجيل دخول
│  │  └─ Account.tsx        # إعدادات الحساب
│  ├─ lib/
│  │  ├─ mindar-helpers.ts  # مساعدات MindAR
│  │  ├─ supabase-helpers.ts # مساعدات Supabase
│  │  └─ qr-generator.ts    # توليد QR codes
│  └─ integrations/
│     └─ supabase/
├─ supabase/
│  ├─ functions/
│  │  └─ generate-target/   # Edge Function للتدريب
│  └─ migrations/           # Database migrations
└─ package.json
```

## 🔧 الإعداد والتشغيل

### المتطلبات
- Node.js >= 18
- npm أو yarn أو bun
- حساب Supabase

### خطوات التثبيت

1. **استنساخ المشروع**
```bash
git clone <repository-url>
cd ymoavatar
```

2. **تثبيت المكتبات**
```bash
npm install
```

3. **إعداد متغيرات البيئة**
قم بإنشاء ملف `.env` مع:
```env
VITE_SUPABASE_URL=<your-supabase-url>
VITE_SUPABASE_PUBLISHABLE_KEY=<your-anon-key>
VITE_SUPABASE_PROJECT_ID=<your-project-id>
```

4. **تشغيل المشروع**
```bash
npm run dev
```

المشروع سيعمل على: `http://localhost:5173`

## 🗄️ قاعدة البيانات

### جدول ar_projects

```sql
CREATE TABLE ar_projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users NOT NULL,
  name TEXT NOT NULL,
  marker_image_url TEXT NOT NULL,
  content_type TEXT NOT NULL,  -- 'image' | 'video' | '3d'
  content_url TEXT,
  target_file_url TEXT,        -- ملف MindAR المدرب
  qr_code_url TEXT,
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Storage Buckets
- **ar-content**: تخزين الصور، الفيديوهات، وملفات Target

## 🔐 الأمان

- ✅ المصادقة مطلوبة لإنشاء المشاريع
- ✅ المستخدمون يمكنهم تعديل/حذف مشاريعهم فقط
- ✅ المسح الضوئي متاح للجميع بدون تسجيل
- ✅ Storage policies تحمي الملفات

## 📝 ملاحظات مهمة

### تدريب الصور (Image Training)
- يتم تلقائياً عند رفع صورة Marker
- يستخدم Edge Function في Supabase
- ينتج ملف `.mind` للتتبع
- قد يستغرق **بضع ثوانٍ**

### أفضل الممارسات للصور
1. استخدم صور **واضحة وذات تباين عالي**
2. تجنب الصور **المتشابهة جداً**
3. الحجم الموصى به: **640x480** أو أكبر
4. تجنب الصور **المتحركة أو الباهتة**

### المتصفحات المدعومة
- ✅ Chrome/Edge (Android & Desktop)
- ✅ Safari (iOS & macOS)
- ✅ Firefox
- ⚠️ يتطلب HTTPS للكاميرا (ما عدا localhost)

## 🐛 استكشاف الأخطاء

### الكاميرا لا تعمل
- تأكد من السماح بصلاحيات الكاميرا
- استخدم HTTPS أو localhost
- تحقق من عدم استخدام الكاميرا من تطبيق آخر

### الصورة لا يتم التعرف عليها
- تأكد من اكتمال تدريب الصورة (Badge: "Ready")
- جرب إضاءة أفضل
- تأكد من وضوح الصورة

### الفيديو لا يشتغل
- تأكد من رابط الفيديو صحيح
- استخدم فيديو بصيغة مدعومة (mp4, webm)
- تأكد من CORS headers للفيديوهات الخارجية

## 🎯 الميزات القادمة

- [ ] دعم عدة Targets في نفس المشروع
- [ ] تحسين الأداء للأجهزة الضعيفة
- [ ] إضافة مؤثرات صوتية
- [ ] مشاركة المشاريع مع مستخدمين آخرين
- [ ] Analytics متقدم

## 📄 الترخيص

MIT License - استخدم المشروع بحرية!

## 🤝 المساهمة

المساهمات مرحب بها! افتح Issue أو Pull Request.

---

**صُنع بـ ❤️ باستخدام React, MindAR, و Supabase**
