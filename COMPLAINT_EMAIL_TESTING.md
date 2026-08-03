# دليل اختبار نظام إرسال البريد للشكاوى
# Complaint Email System Testing Guide

## ✅ ما تم عمله / What Was Done

### 1. تحديث المتغيرات البيئية في Vercel
تم إضافة المتغيرات التالية إلى Vercel Production:
- `EMAIL_USER=alsahmalfareedinfo@gmail.com`
- `EMAIL_PASSWORD=girdwygfplhxoihs`

### 2. تحسين كود إرسال البريد
- إضافة معالجة أخطاء محسنة
- إضافة logs تفصيلية لتتبع العملية
- إضافة خيارات أمان إضافية للـ SMTP

### 3. إعادة النشر على Vercel
تم نشر آخر التحديثات على: https://al-sahm-alfareed-school.vercel.app

---

## 🧪 كيفية اختبار النظام / How to Test

### اختبار على الموقع المباشر:
1. افتح: https://al-sahm-alfareed-school.vercel.app/complaints
2. املأ نموذج الشكوى بمعلومات صحيحة
3. اضغط على زر "إرسال الشكوى"
4. انتظر ظهور رسالة النجاح ورقم التذكرة

### التحقق من وصول البريد:
1. افتح بريد Gmail: alsahmalfareedinfo@gmail.com
2. تحقق من صندوق الوارد (Inbox)
3. تحقق من صندوق البريد المزعج (Spam) - مهم جداً!
4. ابحث عن بريد بعنوان: `🎯 شكوى جديدة | New Complaint - SHK-XXXXXX`

---

## 📊 كيفية التحقق من Logs في Vercel

### طريقة 1: من خلال Dashboard
1. اذهب إلى: https://vercel.com
2. اختر المشروع: `al-sahm-alfareed-school`
3. اذهب إلى تبويب `Deployments`
4. اضغط على آخر deployment
5. اختر `Functions` ثم `api/complaints`
6. شاهد الـ logs

### طريقة 2: من خلال CLI
```bash
vercel logs https://al-sahm-alfareed-school.vercel.app
```

---

## 🔍 الرسائل المتوقعة في Logs

### إذا كان البريد يعمل بشكل صحيح:
```
📧 Attempting to send email with user: alsahmalfareedinfo@gmail.com
📤 Sending email to: alsahmalfareedinfo@gmail.com
✅ Email sent successfully: <message-id>
📬 Email accepted by: [ 'alsahmalfareedinfo@gmail.com' ]
✅ Complaint email sent successfully for ticket: SHK-XXXXXX
```

### إذا كان هناك خطأ:
```
❌ Missing EMAIL_USER or EMAIL_PASSWORD environment variables
أو
❌ Error sending email: [رسالة الخطأ]
❌ Failed to send complaint email: [تفاصيل الخطأ]
```

---

## ⚠️ مشاكل محتملة وحلولها / Potential Issues & Solutions

### 1. البريد لا يصل إلى Inbox
**الحل:**
- تحقق من مجلد Spam في Gmail
- تأكد من أن App Password صحيح وليس منتهي الصلاحية
- تحقق من أن "Less secure app access" مفعل في إعدادات Gmail (إذا لزم الأمر)

### 2. خطأ: "Invalid login credentials"
**الحل:**
- تحقق من أن EMAIL_PASSWORD هو App Password وليس كلمة مرور الحساب العادية
- أنشئ App Password جديد من: https://myaccount.google.com/apppasswords
- حدّث المتغير في Vercel:
```bash
vercel env rm EMAIL_PASSWORD production
echo your-new-app-password | vercel env add EMAIL_PASSWORD production
```

### 3. خطأ: "Missing EMAIL_USER or EMAIL_PASSWORD"
**الحل:**
- تأكد من أن المتغيرات مضافة في Vercel Production
- تحقق باستخدام: `vercel env ls`
- أعد النشر بعد إضافة المتغيرات

### 4. البريد يعمل محلياً ولا يعمل على Vercel
**الحل:**
- تحقق من أن `.env.local` ليس في `.gitignore` (لا تدفعه إلى Git!)
- تأكد من إضافة المتغيرات يدوياً في Vercel Dashboard أو CLI
- أعد نشر المشروع بعد إضافة المتغيرات

---

## 🔄 إعادة إضافة المتغيرات البيئية

إذا احتجت لإعادة إضافة المتغيرات:

```bash
# حذف القديمة
vercel env rm EMAIL_PASSWORD production
vercel env rm EMAIL_USER production

# إضافة الجديدة
echo girdwygfplhxoihs | vercel env add EMAIL_PASSWORD production
echo alsahmalfareedinfo@gmail.com | vercel env add EMAIL_USER production

# إعادة النشر
vercel --prod
```

---

## 📧 إنشاء App Password جديد (إذا لزم الأمر)

1. اذهب إلى: https://myaccount.google.com/security
2. تأكد من تفعيل "2-Step Verification"
3. اذهب إلى: https://myaccount.google.com/apppasswords
4. اختر "Mail" و "Windows Computer"
5. انسخ كلمة المرور المكونة من 16 حرف
6. استخدمها في `EMAIL_PASSWORD`

---

## 📱 التواصل للدعم

إذا استمرت المشكلة بعد تجربة كل الحلول:
- تحقق من Vercel Logs
- تحقق من Gmail Spam folder
- تحقق من Gmail Security settings
- جرب إنشاء App Password جديد

---

## ✨ التحديثات الأخيرة

- ✅ تم إضافة معالجة أخطاء محسنة
- ✅ تم إضافة logs تفصيلية
- ✅ تم تحديث المتغيرات البيئية في Vercel
- ✅ تم إعادة النشر على Production
- ✅ تم اختبار البناء محلياً بنجاح

**آخر نشر:** 2026-02-04
**الإصدار:** 1.0.0
**الحالة:** ✅ جاهز للاختبار
