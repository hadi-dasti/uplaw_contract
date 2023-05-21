import {
  Box,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useGetOtp } from "../hooks/user";
import {
  LoginRounded,
  PhoneIphoneRounded,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Link } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { otpState } from "../atoms/otp";

const MobileForm = () => {
  const { getOtp } = useGetOtp();

  const setOtp = useSetRecoilState(otpState);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const valid = await getOtp(email, password);
    if (valid) {
      setOtp(true);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <FormControl sx={{ m: 1, width: "45ch" }} variant="standard">
          <InputLabel htmlFor="standard-adornment-number">Email</InputLabel>
          <Input
            id="standard-adornment-number"
            type="email"
            required={true}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton>
                  <PhoneIphoneRounded />
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: "45ch" }} variant="standard">
          <InputLabel htmlFor="standard-adornment-password">
            Password
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
  );
};

export default MobileForm;
