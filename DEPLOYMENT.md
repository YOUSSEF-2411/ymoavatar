# 🚀 دليل النشر (Deployment Guide)

## خيارات النشر

يمكنك نشر المشروع على أي من المنصات التالية:

### 1. Vercel (موصى به) ⭐

**الخطوات:**
1. أنشئ حساب على [Vercel](https://vercel.com)
2. اربط حساب GitHub الخاص بك
3. اختر "Import Project"
4. اختر repository الخاص بك
5. أضف Environment Variables:
   ```
   VITE_SUPABASE_URL=your-supabase-url
   VITE_SUPABASE_PUBLISHABLE_KEY=your-anon-key
   VITE_SUPABASE_PROJECT_ID=your-project-id
   ```
6. اضغط Deploy

**أو استخدم Vercel CLI:**
```bash
npm install -g vercel
vercel login
vercel
```

---

### 2. Netlify

**الخطوات:**
1. أنشئ حساب على [Netlify](https://netlify.com)
2. اذهب إلى "Sites" → "Add new site" → "Import from Git"
3. اختر repository الخاص بك
4. ضع إعدادات البناء:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. أضف Environment Variables في Settings
6. Deploy

**أو استخدم Netlify CLI:**
```bash
npm install -g netlify-cli
netlify login
netlify init
netlify deploy --prod
```

**ملف `netlify.toml` (اختياري):**
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

### 3. GitHub Pages

**الخطوات:**

1. تثبيت `gh-pages`:
```bash
npm install --save-dev gh-pages
```

2. أضف في `package.json`:
```json
{
  "homepage": "https://yourusername.github.io/ymoavatar",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

3. نشر:
```bash
npm run deploy
```

4. فعّل GitHub Pages من Settings → Pages

⚠️ **ملاحظة:** قد تحتاج لضبط `base` في `vite.config.ts`:
```ts
export default defineConfig({
  base: '/ymoavatar/',
  // ...
})
```

---

### 4. Railway

**الخطوات:**
1. أنشئ حساب على [Railway](https://railway.app)
2. "New Project" → "Deploy from GitHub repo"
3. اختر repository
4. أضف Environment Variables
5. Deploy تلقائياً

---

### 5. Render

**الخطوات:**
1. أنشئ حساب على [Render](https://render.com)
2. "New" → "Static Site"
3. Connect repository
4. إعدادات البناء:
   - Build Command: `npm run build`
   - Publish Directory: `dist`
5. أضف Environment Variables
6. Create Static Site

---

## متطلبات النشر

### Environment Variables المطلوبة:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-anon-key
VITE_SUPABASE_PROJECT_ID=your-project-id
```

### إعداد Supabase Edge Functions

إذا كنت تستخدم Edge Functions (للتدريب):

1. تثبيت Supabase CLI:
```bash
npm install -g supabase
```

2. تسجيل دخول:
```bash
supabase login
```

3. ربط المشروع:
```bash
supabase link --project-ref your-project-id
```

4. نشر Functions:
```bash
supabase functions deploy generate-target
```

---

## ⚠️ ملاحظات مهمة

### HTTPS مطلوب
- الكاميرا تحتاج HTTPS (أو localhost)
- جميع منصات النشر توفر HTTPS تلقائياً

### CORS Headers
- تأكد من إعداد CORS في Supabase Storage
- Policies موجودة في migrations

### الأداء
- ملف JS كبير (~1.5 MB) بسبب Three.js و MindAR
- استخدم CDN و compression
- فكّر في code splitting للتحسين

### الكاميرا على الموبايل
- اختبر على أجهزة حقيقية
- بعض المتصفحات قد تحتاج أذونات إضافية

---

## 🔧 Troubleshooting

### المشكلة: "Failed to load module"
**الحل:** تأكد من build command صحيح: `npm run build`

### المشكلة: SPA routing لا يعمل
**الحل:** أضف redirects/rewrites في config:
- Vercel: `vercel.json` (موجود)
- Netlify: `netlify.toml`
- Others: راجع الdocs

### المشكلة: Environment variables لا تعمل
**الحل:** تأكد من:
- البادئة `VITE_` موجودة
- الإعدادات في لوحة التحكم صحيحة
- إعادة deploy بعد التغيير

---

## ✅ Checklist قبل النشر

- [ ] اختبار build محلياً: `npm run build && npm run preview`
- [ ] Environment variables جاهزة
- [ ] Supabase database و storage جاهزين
- [ ] Edge Functions منشورة (إذا لزم)
- [ ] اختبار على mobile
- [ ] README محدث
- [ ] .env في .gitignore
- [ ] .env.example موجود

---

**🎉 بالتوفيق في النشر!**

للمساعدة: [Discord](https://discord.gg/supabase) | [Docs](https://vitejs.dev/guide/static-deploy.html)
