import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

const transportOptions: SMTPTransport.Options = {

  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
};

export const transporter = nodemailer.createTransport(transportOptions);

export const mailOptions = {
  from: {
    name: "AADESH KUMAR ",
    address: `${process.env.EMAIL_USER}`,
  },
};