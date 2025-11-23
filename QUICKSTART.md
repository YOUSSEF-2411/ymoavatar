# 🚀 Quick Start Guide - دليل البدء السريع

## للمطورين

### 1. التثبيت
```bash
# استنساخ المشروع
git clone https://github.com/yourusername/ymoavatar.git
cd ymoavatar

# تثبيت المكتبات
npm install

# إعداد البيئة
cp .env.example .env
# عدّل .env بمعلوماتك
```

### 2. إعداد Supabase

#### إنشاء مشروع
1. اذهب إلى [Supabase](https://supabase.com)
2. أنشئ مشروع جديد
3. انسخ URL و Anon Key

#### تشغيل Migrations
```bash
# تثبيت Supabase CLI
npm install -g supabase

# ربط المشروع
supabase link --project-ref your-project-id

# تطبيق migrations
supabase db push

# إنشاء Storage Bucket
# اذهب إلى Dashboard → Storage → Create Bucket
# اسم: ar-content
# Public: Yes
```

#### نشر Edge Functions
```bash
supabase functions deploy generate-target
```

### 3. التشغيل
```bash
npm run dev
```

افتح: http://localhost:8080

---

## للمستخدمين

### إنشاء تجربة AR

#### الخطوة 1: التسجيل
- اذهب إلى `/auth`
- سجل حساب جديد

#### الخطوة 2: إنشاء مشروع
- اضغط "Create" من القائمة
- أدخل اسم المشروع
- ارفع صورة **واضحة** كـ Marker

💡 **نصائح للصورة:**
- استخدم صور ذات تفاصيل واضحة
- تجنب الخلفيات البيضاء
- الحجم الموصى: 640x480 أو أكبر

#### الخطوة 3: اختر المحتوى
- **فيديو:** ارفع ملف أو ضع رابط
- **صورة:** ارفع صورة
- **3D:** (قريباً)

#### الخطوة 4: أنشئ
- اضغط "Generate"
- انتظر التدريب (~30 ثانية)

#### الخطوة 5: شارك
- انسخ الرابط
- أو حمّل QR Code
- شارك مع الأصدقاء!

---

### مسح تجربة AR

#### من المتصفح
1. اذهب إلى `/scan`
2. اسمح بالكاميرا
3. وجّه على الصورة
4. **الفيديو سيظهر تلقائياً!**

#### من QR Code
1. امسح QR بالهاتف
2. افتح الرابط
3. اضغط "Start AR"
4. وجّه على الصورة

---

## الأوامر المفيدة

```bash
# Development
npm run dev              # تشغيل dev server
npm run build           # بناء للإنتاج
npm run preview         # معاينة build
npm run lint            # فحص الأخطاء

# Deployment
npm run deploy:vercel   # نشر على Vercel
npm run deploy:netlify  # نشر على Netlify

# Database
supabase db reset       # إعادة تعيين DB
supabase db push        # تطبيق migrations
supabase functions deploy generate-target

# Git
git status              # حالة التغييرات
git add .               # إضافة كل الملفات
git commit -m "message" # commit
git push                # رفع للريبو
```

---

## المجلدات الهامة

```
ymoavatar/
├── src/
│   ├── components/
│   │   ├── ARScanner.tsx    ← ماسح AR للجميع
│   │   └── ARViewer.tsx     ← عارض مشروع واحد
│   ├── pages/
│   │   ├── Scan.tsx        ← ⭐ صفحة المسح
│   │   ├── Create.tsx      ← إنشاء مشاريع
│   │   └── Dashboard.tsx   ← إدارة المشاريع
│   └── lib/
│       └── mindar-helpers.ts ← تدريب الصور
├── supabase/
│   ├── migrations/         ← Database schema
│   └── functions/          ← Edge Functions
└── dist/                   ← ملفات الإنتاج
```

---

## 🆘 مساعدة سريعة

### الكاميرا لا تعمل
```
✅ تأكد من HTTPS (أو localhost)
✅ اسمح بصلاحيات الكاميرا
✅ جرب متصفح آخر
```

### الصورة ما تتعرف
```
✅ تأكد من اكتمال التدريب (Badge: Ready)
✅ استخدم إضاءة جيدة
✅ حافظ على ثبات الكاميرا
```

### Build فشل
```
✅ تأكد من Environment Variables
✅ حذف node_modules وأعد التثبيت
✅ تأكد من Node.js >= 18
```

---

## 📚 موارد إضافية

- [README.md](./README.md) - وثائق كاملة
- [DEPLOYMENT.md](./DEPLOYMENT.md) - دليل النشر
- [CONTRIBUTING.md](./CONTRIBUTING.md) - دليل المساهمة
- [MindAR Docs](https://hiukim.github.io/mind-ar-js-doc/)
- [Supabase Docs](https://supabase.com/docs)
- [Vite Docs](https://vitejs.dev)

---

**💪 استمتع ببناء تجارب AR مذهلة!**
