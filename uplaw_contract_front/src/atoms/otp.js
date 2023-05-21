import { atom } from "recoil";

const otpState = atom({
  key: "otp",
  default: false,
});

export { otpState };
