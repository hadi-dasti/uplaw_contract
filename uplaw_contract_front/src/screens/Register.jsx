import React, { useState } from "react";
import Page from "../components/Page";
// import { useSignIn } from "../hooks/user";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  Input,
  Box,
  Autocomplete,
  TextField,
} from "@mui/material";
import {
  AppRegistrationRounded,
  MailOutlineRounded,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import LoadingButton from "@mui/lab/LoadingButton";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  //   const { signIn, signInError, signInLoading } = useSignIn();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // const valid = await signIn(email, password);
    // if (valid) {
    //   router.push("/");
    // }
  };
  const defaultProps = {
    options: gender,
    getOptionLabel: (option) => option.title,
  };
  return (
    <Page title="Sign In">
      <Box display="flex" justifyContent="center" alignItems="center" mt={15}>
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <TextField
              id="standard-basic"
              label="First Name"
              variant="standard"
              sx={{ m: 1, width: "45ch" }}
            />
            <TextField
              id="standard-basic"
              label="Last Name"
              variant="standard"
              sx={{ m: 1, width: "45ch" }}
            />
            <TextField
              id="standard-basic"
              label="Address"
              variant="standard"
              sx={{ m: 1, width: "45ch" }}
            />
            <TextField
              id="standard-number"
              label="Age"
              type="number"
              variant="standard"
              sx={{ m: 1, width: "45ch" }}
            />
            <TextField
              id="standard-number"
              label="National Code"
              type="number"
              variant="standard"
              sx={{ m: 1, width: "45ch" }}
            />
            <TextField
              id="standard-number"
              label="Mobile Number"
              type="number"
              variant="standard"
              sx={{ m: 1, width: "45ch" }}
            />
            <Autocomplete
              sx={{ m: 1, width: "45ch" }}
              {...defaultProps}
              id="clear-on-escape"
              clearOnEscape
              renderInput={(params) => (
                <TextField {...params} label="Gender" variant="standard" />
              )}
            />

            <FormControl sx={{ m: 1, width: "45ch" }} variant="standard">
              <InputLabel htmlFor="standard-adornment-email">Email</InputLabel>
              <Input
                id="standard-adornment-email"
                type="email"
                required={true}
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton>
                      <MailOutlineRounded />
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
            <FormControl sx={{ m: 1, width: "45ch" }} variant="standard">
              <InputLabel htmlFor="standard-adornment-password">
                Confirm Password
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
            endIcon={<AppRegistrationRounded />}
            // loading={signInLoading}
            loadingPosition="end"
            variant="contained"
            sx={{ mt: 2, width: "53ch" }}
          >
            <span>Register</span>
          </LoadingButton>
        </form>
      </Box>
    </Page>
  );
}

const gender = [{ title: "Male" }, { title: "Female" }];
