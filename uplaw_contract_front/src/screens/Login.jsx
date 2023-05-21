import Page from "../components/Page";
import { Box } from "@mui/material";
import OtpForm from "../components/OtpForm";
import MobileForm from "../components/EmailPasswordForm";
import { useRecoilValue } from "recoil";
import { otpState } from "../atoms/otp";

export default function SignInPage() {
  const otp = useRecoilValue(otpState);

  //   const { signIn, signInError, signInLoading } = useSignIn();

  return (
    <Page>
      <Box display="flex" justifyContent="center" alignItems="center" mt={15}>
        {otp ? <OtpForm /> : <MobileForm />}
      </Box>
    </Page>
  );
}
