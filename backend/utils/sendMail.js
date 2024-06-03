const nodemailer = require('nodemailer');
const asyncHandler = require('express-async-handler');

const sendMail = asyncHandler(async (req, res) => {
    const {email, html, subject} = data;

    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    });

    let info = await transporter.sendMail({
        from: '',
        to: email,
        subject: subject,
        html: html
    })

    return info;
});

module.exports = {sendMail};