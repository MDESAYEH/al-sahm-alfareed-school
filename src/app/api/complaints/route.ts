import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import crypto from 'crypto';

// تعريف واجهة البيانات
interface ComplaintData {
  fullName: string;
  email: string;
  phone: string;
  studentName?: string;
  studentClass?: string;
  complaintType?: string;
  relation?: string;
  priority?: 'low' | 'medium' | 'high' | 'urgent';
  subject: string;
  description: string;
}

// دالة إرسال البريد الإلكتروني
async function sendComplaintEmail(data: ComplaintData, ticketCode: string) {
  try {
    // التحقق من وجود المتغيرات البيئية
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      console.error('❌ Missing EMAIL_USER or EMAIL_PASSWORD environment variables');
      throw new Error('Email configuration is missing');
    }

    console.log('📧 Attempting to send email with user:', process.env.EMAIL_USER);

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
      // إضافة خيارات إضافية لضمان العمل
      secure: true,
      tls: {
        rejectUnauthorized: false
      }
    });

    const emailHtml = `
      <!DOCTYPE html>
      <html dir="rtl" lang="ar">
      <head>
        <meta charset="UTF-8">
        <style>
          body {
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 20px;
            text-align: center;
            border-radius: 10px 10px 0 0;
          }
          .content {
            background: #f9f9f9;
            padding: 30px;
            border: 1px solid #ddd;
          }
          .field {
            margin-bottom: 15px;
            padding: 10px;
            background: white;
            border-right: 4px solid #667eea;
          }
          .label {
            font-weight: bold;
            color: #667eea;
            display: block;
            margin-bottom: 5px;
          }
          .value {
            color: #555;
          }
          .ticket-code {
            background: #667eea;
            color: white;
            padding: 10px 20px;
            border-radius: 5px;
            display: inline-block;
            font-size: 18px;
            font-weight: bold;
            margin: 10px 0;
          }
          .priority-urgent { border-right-color: #dc3545; }
          .priority-high { border-right-color: #ff6b6b; }
          .priority-medium { border-right-color: #ffc107; }
          .priority-low { border-right-color: #28a745; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>🎯 شكوى جديدة من موقع مدرسة السهم الفريد</h1>
          <p>New Complaint from Al-Sahm Al-Fareed School</p>
        </div>
        
        <div class="content">
          <div class="field">
            <span class="label">رقم التذكرة / Ticket Number:</span>
            <div class="ticket-code">${ticketCode}</div>
          </div>

          <div class="field ${data.priority ? 'priority-' + data.priority : ''}">
            <span class="label">الاسم الكامل / Full Name:</span>
            <span class="value">${data.fullName}</span>
          </div>

          <div class="field">
            <span class="label">البريد الإلكتروني / Email:</span>
            <span class="value">${data.email}</span>
          </div>

          <div class="field">
            <span class="label">رقم الهاتف / Phone:</span>
            <span class="value">${data.phone}</span>
          </div>

          ${data.studentName ? `
          <div class="field">
            <span class="label">اسم الطالب / Student Name:</span>
            <span class="value">${data.studentName}</span>
          </div>
          ` : ''}

          ${data.studentClass ? `
          <div class="field">
            <span class="label">الصف / Class:</span>
            <span class="value">${data.studentClass}</span>
          </div>
          ` : ''}

          ${data.relation ? `
          <div class="field">
            <span class="label">الصلة / Relation:</span>
            <span class="value">${data.relation}</span>
          </div>
          ` : ''}

          ${data.complaintType ? `
          <div class="field">
            <span class="label">نوع الشكوى / Type:</span>
            <span class="value">${data.complaintType}</span>
          </div>
          ` : ''}

          ${data.priority ? `
          <div class="field priority-${data.priority}">
            <span class="label">الأولوية / Priority:</span>
            <span class="value">
              ${data.priority === 'urgent' ? '🔴 عاجل / Urgent' : 
                data.priority === 'high' ? '🟠 عالية / High' : 
                data.priority === 'medium' ? '🟡 متوسطة / Medium' : 
                '🟢 منخفضة / Low'}
            </span>
          </div>
          ` : ''}

          <div class="field">
            <span class="label">الموضوع / Subject:</span>
            <span class="value">${data.subject}</span>
          </div>

          <div class="field">
            <span class="label">وصف الشكوى / Description:</span>
            <div class="value" style="white-space: pre-wrap; margin-top: 10px; padding: 10px; background: #f5f5f5; border-radius: 5px;">
${data.description.replace(/<br\/>/g, '\n')}
            </div>
          </div>

          <div class="field">
            <span class="label">تاريخ الاستلام / Received:</span>
            <span class="value">${new Date().toLocaleString('ar-EG', { timeZone: 'Asia/Baghdad' })} 
            (${new Date().toLocaleString('en-US')})</span>
          </div>
        </div>

        <div style="text-align: center; margin-top: 20px; color: #888; font-size: 12px;">
          <p>هذه رسالة تلقائية من نظام إدارة الشكاوى - مدرسة السهم الفريد</p>
          <p>This is an automated message from Al-Sahm Al-Fareed School Complaint System</p>
        </div>
      </body>
      </html>
    `;

    const mailOptions = {
      from: `"مدرسة السهم الفريد | Al-Sahm Al-Fareed School" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER, // إرسال إلى نفس البريد
      subject: `🎯 شكوى جديدة | New Complaint - ${ticketCode}`,
      html: emailHtml,
      replyTo: data.email,
    };

    console.log('📤 Sending email to:', process.env.EMAIL_USER);
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent successfully:', info.messageId);
    console.log('📬 Email accepted by:', info.accepted);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Error sending email:', error);
    // إضافة تفاصيل أكثر عن الخطأ
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    throw error;
  }
}

// معالج POST
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data: ComplaintData = body.data || body;

    // التحقق من البيانات المطلوبة
    if (!data.fullName || !data.email || !data.phone || !data.subject || !data.description) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // إنشاء رقم تذكرة فريد
    const ticketCode = 'SHK-' + crypto.randomBytes(3).toString('hex').toUpperCase() + '-' + Date.now().toString(36).toUpperCase();

    // إرسال البريد الإلكتروني
    let emailSent = false;
    let emailError = null;
    
    try {
      const emailResult = await sendComplaintEmail(data, ticketCode);
      emailSent = true;
      console.log(`✅ Complaint email sent successfully for ticket: ${ticketCode}`);
    } catch (emailError: any) {
      console.error('❌ Failed to send complaint email:', emailError);
      emailError = emailError.message || 'Unknown email error';
      // نستمر بالعملية حتى لو فشل البريد
    }

    // إرجاع النتيجة
    return NextResponse.json({
      success: true,
      emailSent,
      emailError: emailError || undefined,
      data: {
        ticketCode,
        fullName: data.fullName,
        email: data.email,
        createdAt: new Date().toISOString(),
      },
    }, { status: 201 });

  } catch (error: any) {
    console.error('Complaint creation error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create complaint' },
      { status: 500 }
    );
  }
}

// معالج GET (اختياري - للاختبار)
export async function GET() {
  return NextResponse.json({
    message: 'Complaints API is running',
    endpoint: '/api/complaints',
    method: 'POST',
  });
}
