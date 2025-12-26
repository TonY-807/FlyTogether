import { NextResponse } from 'next/server';
import transporter from '@/lib/nodemailer';

export async function POST(req: Request) {
    try {
        const { email, otp } = await req.json();

        if (!email || !otp) {
            return NextResponse.json({ error: 'Email and OTP are required' }, { status: 400 });
        }

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Your FlyTogether Verification Code',
            html: `
                <div style="font-family: sans-serif; padding: 20px; color: #1a1a1a;">
                    <h1 style="color: #4f46e5;">Welcome to FlyTogether!</h1>
                    <p>Use the following code to verify your account:</p>
                    <div style="background: #f3f4f6; padding: 20px; border-radius: 12px; text-align: center; margin: 20px 0;">
                        <span style="font-size: 32px; font-weight: bold; letter-spacing: 4px; color: #4f46e5;">${otp}</span>
                    </div>
                    <p>This code will expire in 10 minutes.</p>
                    <p style="color: #6b7280; font-size: 14px;">If you didn't request this, please ignore this email.</p>
                </div>
            `,
        };

        await transporter.sendMail(mailOptions);

        return NextResponse.json({ message: 'OTP sent successfully' });
    } catch (error) {
        console.error('Error sending OTP:', error);
        return NextResponse.json({ error: 'Failed to send OTP' }, { status: 500 });
    }
}
