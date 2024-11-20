import { sendVerificationEmail } from '@/helpers/sendVerificationEmail';
import dbConnect from '@/lib/dbConnect';
import UserModel from '@/model/User';

export async function POST(request: Request) {
    await dbConnect();
    const { username, email } = await request.json();

    try {
        const user = await UserModel.findOne({
            username,
            email
        });

        if (!user) {
            return Response.json(
                { success: false, message: 'User not found' },
                { status: 404 }
            );
        }

        const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date();
        if (isCodeNotExpired) {
            return Response.json(
                {
                    success: true,
                    message: `Your code is not expired yet, use this code ${user.verifyCode}`,
                },
                { status: 201 }
            );
        }

        if (user.isVerified) {
            return Response.json(
                {
                    success: true,
                    message: `You are already verified`,
                },
                { status: 201 }
            );
        }



        const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
        user.verifyCode = verifyCode;
        user.verifyCodeExpiry = new Date(Date.now() + 3600000);

        await user.save();

        const emailResponse = await sendVerificationEmail(
            email,
            username,
            verifyCode
        );

        if (!emailResponse.success) {
            return Response.json(
                {
                    success: false,
                    message: emailResponse.message,
                },
                { status: 500 }
            );
        }

        return Response.json(
            {
                success: true,
                message: 'Verification code send successfully',
            },
            { status: 201 }
        );

    } catch (error) {
        console.error('Error Sending Code:', error);
        return Response.json(
            { success: false, message: 'Error Sending code' },
            { status: 500 }
        );
    }
}