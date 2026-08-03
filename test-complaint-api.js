/**
 * ملف اختبار API الشكاوى في Next.js
 * Test Complaints API in Next.js
 * 
 * الاستخدام | Usage:
 * تأكد من تشغيل السيرفر أولاً (npm run dev)
 * ثم شغّل: node test-complaint-api.js
 */

async function testComplaintAPI() {
  console.log('🚀 اختبار API الشكاوى...');
  console.log('🚀 Testing Complaints API...\n');

  try {
    const testData = {
      data: {
        fullName: 'محمد أحمد التجريبي',
        email: 'test@example.com',
        phone: '+218 91 234 5678',
        studentName: 'أحمد محمد',
        studentClass: 'الصف الأول الإعدادي',
        complaintType: 'academic',
        relation: 'parent',
        priority: 'medium',
        subject: 'شكوى تجريبية للاختبار',
        description: 'هذه شكوى تجريبية لاختبار نظام الشكاوى الجديد في Next.js. يجب أن يتم إرسال بريد إلكتروني تلقائياً عند تقديم هذه الشكوى.'
      }
    };

    console.log('📤 إرسال بيانات الاختبار...');
    console.log('📤 Sending test data...\n');

    const response = await fetch('http://localhost:3000/api/complaints', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData),
    });

    console.log(`📊 رمز الاستجابة | Response Status: ${response.status} ${response.statusText}\n`);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`API Error: ${JSON.stringify(errorData, null, 2)}`);
    }

    const result = await response.json();

    console.log('═══════════════════════════════════════════════════');
    console.log('✅ نجح الاختبار! Test Successful!');
    console.log('═══════════════════════════════════════════════════');
    console.log('📋 النتيجة | Result:\n');
    console.log(JSON.stringify(result, null, 2));
    console.log('\n═══════════════════════════════════════════════════');
    
    if (result.data?.ticketCode) {
      console.log(`\n🎫 رقم التذكرة | Ticket Code: ${result.data.ticketCode}`);
    }
    
    console.log('\n✅ تحقق الآن من البريد الإلكتروني:');
    console.log('✅ Check your email now:');
    console.log('   📧 alsahmalfareedinfo@gmail.com\n');
    
    console.log('💡 تلميح: قد يصل البريد إلى مجلد Spam');
    console.log('💡 Tip: Email might be in Spam folder\n');

  } catch (error) {
    console.error('\n═══════════════════════════════════════════════════');
    console.error('❌ فشل الاختبار | Test Failed');
    console.error('═══════════════════════════════════════════════════');
    console.error('الخطأ | Error:', error.message);
    console.error('═══════════════════════════════════════════════════\n');

    if (error.message.includes('ECONNREFUSED')) {
      console.error('💡 الحل المحتمل | Possible Solution:');
      console.error('   هل السيرفر يعمل؟ شغّل: npm run dev');
      console.error('   Is the server running? Run: npm run dev\n');
    } else if (error.message.includes('404')) {
      console.error('💡 الحل المحتمل | Possible Solution:');
      console.error('   تأكد من وجود ملف: src/app/api/complaints/route.ts');
      console.error('   Make sure file exists: src/app/api/complaints/route.ts\n');
    }
  }
}

// تشغيل الاختبار
console.log('═══════════════════════════════════════════════════');
console.log('   🧪 اختبار API الشكاوى');
console.log('   🧪 Complaints API Test');
console.log('═══════════════════════════════════════════════════\n');
console.log('⚠️  تأكد من تشغيل السيرفر أولاً: npm run dev');
console.log('⚠️  Make sure the server is running first: npm run dev\n');

testComplaintAPI().catch(error => {
  console.error('خطأ غير متوقع | Unexpected error:', error);
  process.exit(1);
});
