import { useState } from "react";
import { useLoginUser } from "../hooks/user";
import { useRecoilValue } from "recoil";
import { idState } from "../atoms/employeeId";
import { useNavigate } from "react-router";
import {
  Box,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
} from "@mui/material";
import { LoginRounded, Visibility, VisibilityOff } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";

const OtpForm = () => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const { loginUser } = useLoginUser();
  const id = useRecoilValue(idState);
  const navigate = useNavigate();

  const handleSubmit1 = async (event) => {
    event.preventDefault();
    const valid = await loginUser(password, id);
    if (valid) {
      navigate("/");
    }
  };
  return (
    <form onSubmit={handleSubmit1} autoComplete="off">
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <FormControl sx={{ m: 1, width: "45ch" }} variant="standard">
          <InputLabel htmlFor="standard-adornment-password">OTP</InputLabel>
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
        <span>LogIn</span>
      </LoadingButton>
    </form>
  );
};

export default OtpForm;
