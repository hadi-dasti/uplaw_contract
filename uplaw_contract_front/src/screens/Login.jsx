import React, { useState } from "react";
import Page from "../components/Page";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  Input,
  Box,
  Typography,
} from "@mui/material";
import {
  LoginRounded,
  PhoneIphoneRounded,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import LoadingButton from "@mui/lab/LoadingButton";
import { Link } from "react-router-dom";
import { useGetOtp, useLoginUser } from "../hooks/user";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { idState } from "../atoms/employeeId";

export default function SignInPage() {
  const [number, setNumber] = useState("");
  const [otp, setOtp] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  //   const { signIn, signInError, signInLoading } = useSignIn();

  const id = useRecoilValue(idState);

  const navigate = useNavigate();
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const { getOtp } = useGetOtp();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const valid = await getOtp(number);
    if (valid) {
      setOtp(true);
    }
  };
  const { loginUser } = useLoginUser();
  const handleSubmit1 = async (event) => {
    event.preventDefault();
    const valid = await loginUser(password, id);
    if (valid) {
      navigate("/");
    }
  };
  return (
    <Page>
      <Box display="flex" justifyContent="center" alignItems="center" mt={15}>
        {otp ? (
          <form onSubmit={handleSubmit1}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <FormControl sx={{ m: 1, width: "45ch" }} variant="standard">
                <InputLabel htmlFor="standard-adornment-password">
                  OTP
                </InputLabel>
                <Input
                  id="standard-adornment-password"
                  type={showPassword ? "text" : "password"}
                  required={true}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  autoComplete="off"
                />
              </FormControl>
            </Box>

            {/* {signInError && <p className="text-red-700">Invalid credentials</p>} */}

            <LoadingButton
              type="submit"
              endIcon={<LoginRounded />}
              // loading={signInLoading}
              loadingPosition="end"
              variant="contained"
              sx={{ mt: 2, width: "53ch" }}
            >
              <span>LogIn</span>
            </LoadingButton>
          </form>
        ) : (
          <form onSubmit={handleSubmit}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <FormControl sx={{ m: 1, width: "45ch" }} variant="standard">
                <InputLabel htmlFor="standard-adornment-number">
                  Phone Number
                </InputLabel>
                <Input
                  id="standard-adornment-number"
                  type="text"
                  required={true}
                  value={number}
                  onChange={(event) => setNumber(event.target.value)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton>
                        <PhoneIphoneRounded />
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Box>

            {/* {signInError && <p className="text-red-700">Invalid credentials</p>} */}

            <LoadingButton
              type="submit"
              endIcon={<LoginRounded />}
              // loading={signInLoading}
              loadingPosition="end"
              variant="contained"
              sx={{ mt: 2, width: "53ch" }}
            >
              <span>Get OTP</span>
            </LoadingButton>
            <Typography
              sx={{
                mt: 2,
              }}
            >
              You dont have account? Go to{" "}
              <Link to="/register" style={{ color: "#1976d3" }}>
                register
              </Link>{" "}
              page
            </Typography>
          </form>
        )}
      </Box>
    </Page>
  );
}
