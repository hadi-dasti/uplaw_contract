import { useState } from "react";
import Page from "../components/Page";
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
import { useFormik } from "formik";
import { useRegisterUser } from "../hooks/user";
import { useNavigate } from "react-router";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const defaultProps = {
    options: genderSeelect,
    getOptionLabel: (option) => option.label,
  };
  const navigate = useNavigate();

  const { registerUser } = useRegisterUser();
  const registerValues = {
    firstName: "",
    lastName: "",
    password: "",
    address: "",
    email: "",
    age: "",
    nationalCode: "",
    numberMobile: "",
    gender: "",
  };
  const formik = useFormik({
    initialValues: registerValues,
    onSubmit: (values) => {
      console.log("Form Values: ", JSON.stringify(values));
      const valid = registerUser(values);
      if (valid) {
        console.log("Done");
      }
    },
  });
  return (
    <Page title="Sign In">
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        mt={5}
        mb={15}
      >
        <form onSubmit={formik.handleSubmit}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <TextField
              name="firstName"
              label="First Name"
              variant="standard"
              sx={{ m: 1, width: "45ch" }}
              value={formik.values?.firstName}
              onChange={formik.handleChange}
            />
            <TextField
              name="lastName"
              label="Last Name"
              variant="standard"
              sx={{ m: 1, width: "45ch" }}
              value={formik.values?.lastName}
              onChange={formik.handleChange}
            />
            <TextField
              name="address"
              label="Address"
              variant="standard"
              sx={{ m: 1, width: "45ch" }}
              value={formik.values?.address}
              onChange={formik.handleChange}
            />
            <TextField
              name="age"
              label="Age"
              type="number"
              variant="standard"
              sx={{ m: 1, width: "45ch" }}
              value={formik.values?.age}
              onChange={formik.handleChange}
            />
            <TextField
              name="nationalCode"
              label="National Code"
              type="text"
              variant="standard"
              sx={{ m: 1, width: "45ch" }}
              value={formik.values?.nationalCode}
              onChange={formik.handleChange}
            />
            <TextField
              name="numberMobile"
              label="Mobile Number"
              type="text"
              variant="standard"
              sx={{ m: 1, width: "45ch" }}
              value={formik.values?.numberMobile}
              onChange={formik.handleChange}
            />
            <Autocomplete
              sx={{ m: 1, width: "45ch" }}
              {...defaultProps}
              clearOnEscape
              onChange={(event, newValue) => {
                formik.setFieldValue("gender", newValue?.value || "");
              }}
              isOptionEqualToValue={(option, value) =>
                option.value === value.value
              }
              // isOptionEqualToValue={}
              renderInput={(params) => (
                <TextField
                  {...params}
                  name="gender"
                  label="Gender"
                  variant="standard"
                  onChange={formik.handleChange}
                  value={formik.values?.gender}
                />
              )}
            />

            <FormControl sx={{ m: 1, width: "45ch" }} variant="standard">
              <InputLabel htmlFor="standard-adornment-email">Email</InputLabel>
              <Input
                id="standard-adornment-email"
                name="email"
                type="email"
                required={true}
                value={formik.values?.email}
                onChange={formik.handleChange}
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
                name="password"
                type={showPassword ? "text" : "password"}
                required={true}
                value={formik.values?.password}
                onChange={formik.handleChange}
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
            {/* <FormControl sx={{ m: 1, width: "45ch" }} variant="standard">
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
            </FormControl> */}
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

const genderSeelect = [
  { label: "Male", value: "MALE" },
  { label: "Female", value: "FEMALE" },
];
