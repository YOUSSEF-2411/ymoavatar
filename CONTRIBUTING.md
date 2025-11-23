# 🤝 المساهمة في YMO Avatar

شكراً لاهتمامك بالمساهمة في YMO Avatar! نحن نرحب بجميع المساهمات.

## 📋 كيفية المساهمة

### 1. Fork المشروع
اضغط على زر "Fork" في أعلى الصفحة

### 2. Clone المشروع
```bash
git clone https://github.com/your-username/ymoavatar.git
cd ymoavatar
```

### 3. إنشاء فرع جديد
```bash
git checkout -b feature/amazing-feature
```

أو للإصلاحات:
```bash
git checkout -b fix/bug-description
```

### 4. إعداد البيئة
```bash
npm install
cp .env.example .env
# أضف credentials الخاصة بك في .env
```

### 5. قم بالتغييرات
اكتب كودك النظيف والموثق

### 6. اختبر التغييرات
```bash
npm run dev         # اختبر محلياً
npm run build       # تأكد من البناء
npm run lint        # فحص الأخطاء
```

### 7. Commit التغييرات
```bash
git add .
git commit -m "feat: add amazing feature"
```

### 8. Push للفرع
```bash
git push origin feature/amazing-feature
```

### 9. افتح Pull Request
اذهب إلى GitHub وافتح Pull Request

## 📝 معايير الكود

### Commit Messages
استخدم [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` ميزة جديدة
- `fix:` إصلاح bug
- `docs:` تغييرات في الdocs
- `style:` تنسيق الكود
- `refactor:` إعادة هيكلة الكود
- `test:` إضافة اختبارات
- `chore:` مهام صيانة

**أمثلة:**
```bash
feat: add video AR support
fix: resolve camera permission issue
docs: update Arabic README
```

### TypeScript
- استخدم TypeScript بشكل صحيح
- لا `any` إلا للضرورة
- اكتب interface للكائنات

### React Components
- استخدم Functional Components + Hooks
- اكتب Components قابلة لإعادة الاستخدام
- استخدم `memo` للتحسين عند الحاجة

### Styling
- استخدم TailwindCSS
- التزم بـ Design System الموجود
- Responsive design ضروري

### File Structure
```
src/
├── components/     # مكونات قابلة لإعادة الاستخدام
├── pages/          # صفحات التطبيق
├── lib/            # مساعدات وأدوات
├── hooks/          # Custom hooks
└── integrations/   # تكاملات خارجية
```

## 🐛 الإبلاغ عن Bugs

### قبل الإبلاغ:
1. ابحث في Issues الموجودة
2. تأكد من استخدام آخر نسخة
3. جرب على متصفح آخر

### عند الإبلاغ:
```markdown
## وصف المشكلة
وصف واضح للمشكلة

## خطوات إعادة الإنتاج
1. اذهب إلى '...'
2. اضغط على '...'
3. شاهد الخطأ

## السلوك المتوقع
ما كان يجب أن يحدث

## Screenshots
إن أمكن

## البيئة:
- OS: [Windows 11]
- Browser: [Chrome 120]
- Device: [Desktop/Mobile]
```

## 💡 اقتراح ميزات

نرحب بالأفكار الجديدة! افتح Issue بعنوان:
```
[Feature Request] عنوان الميزة
```

واشرح:
- المشكلة التي تحلها
- كيف تتخيل الحل
- أمثلة استخدام

## ✅ Pull Request Checklist

قبل فتح PR، تأكد من:

- [ ] الكود يعمل محلياً
- [ ] لا أخطاء في `npm run lint`
- [ ] `npm run build` ينجح
- [ ] اختبرت على mobile (إن أمكن)
- [ ] أضفت comments للكود المعقد
- [ ] حدثت documentation إن لزم
- [ ] Commit messages واضحة
- [ ] PR description مفصل

## 🎨 مجالات المساهمة

### Frontend
- تحسين UI/UX
- إضافة animations
- Accessibility improvements
- Performance optimization

### AR Features
- دعم تنسيقات جديدة
- تحسين التتبع
- إضافة مؤثرات AR

### Backend/Database
- تحسين Queries
- إضافة Indexes
- Edge Functions جديدة

### Documentation
- ترجمة إلى لغات أخرى
- إضافة tutorials
- تحديث examples

### Testing
- إضافة Unit Tests
- E2E Testing
- Performance Testing

## 📞 التواصل

- **Issues:** للمشاكل والاقتراحات
- **Discussions:** للأسئلة العامة
- **Email:** support@ymoavatar.com (if applicable)

## 📜 License

بمساهمتك، توافق على أن يكون كودك تحت رخصة MIT.

---

**شكراً على مساهمتك! 🙏**

كل مساهمة، كبيرة أو صغيرة، تساعد في تحسين YMO Avatar.
