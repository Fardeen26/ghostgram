export function customerMailTemplate(username: string, verifyCode: string) {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
            }
            .email-container {
                max-width: 600px;
                margin: auto;
                background-color: #ffffff;
                padding: 20px;
                border-radius: 10px;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            }
        </style>
    </head>
    <body>
        <div class="email-container">
            <h2>Hello ${username},</h2>
            <p>Thank you for registering. Please use the following verification code to complete your registration: </p>
            <h4>${verifyCode}</h4>
            <p>If you did not request this code, please ignore this email.</p>
        </div>
    </body>
    </html>
    `;
}
