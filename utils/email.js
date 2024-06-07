const nodemailer = require('nodemailer');

const sendEmail = async options => {
    // Create a transporter
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    // Define the email options
    const mailOptions = {
        from: 'Shikshya Poudel <cixyapoudel123@gmail.com>',
        to: options.email,
        subject: options.subject,
        text: options.message,
        // Add any additional fields as needed
        // html: options.html,
        // attachments: options.attachments
    };

    // Send the email
    await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
