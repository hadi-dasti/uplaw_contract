"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateOtp = void 0;
// CREATE RANDOM OTP FOR mobileNumber
const generateOtp = (otp_length) => {
    const digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < otp_length; i++) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
};
exports.generateOtp = generateOtp;
