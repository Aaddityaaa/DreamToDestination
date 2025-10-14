import nodemailer from 'nodemailer'
import dotenv from 'dotenv';

dotenv.config();

const user = process.env.GMAIL
const password = process.env.GOOGLE_APP_PASSWORD
// console.log(user,password)


const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587, 
  secure: false, 
  auth: {
    user,
    pass: password,
  },
  debug: false,
    logger: false,
});

transporter.verify((error, success) => {
    if (error) {
        console.error('Transporter verification failed:', error.message);
    } else {
        console.log('Transporter ready for Gmail');
    }
});


// Wrap in an async IIFE so we can use await.
export async function sendMail (to,subject,text,html){
  try {
        if (!to || !subject) {
            throw new Error('Recipient email and subject are required.');
        }
        const info = await transporter.sendMail({
            from: '"Dream To Destination" <ayus135os@gmail.com>',
            to,
            subject,
            text,
            html,
        });
        console.log('Message sent successfully:', info.messageId);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error('SendMail error:', {
            code: error.code,
            message: error.message,
            response: error.response,
        });
        return { success: false, error: error.message };
    }
}

// sendMail(aditya7860075090,"MyAPP","Thaankss buddy")