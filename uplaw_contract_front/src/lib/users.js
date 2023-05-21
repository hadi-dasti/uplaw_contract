import http from ".";

export const getOtp = async (num) => {
  try {
    const response = await http.post(
      `${http.url}/employee/login`,
      JSON.stringify({ numberMobile: num })
    );
    console.log("otp->", response.data.data.createOtp);
    console.log("id->", response.data.data.employeeId);

    return response.data.success;
  } catch (err) {
    console.log(err);
  }
};

export const loginUser = async (otp, id) => {
  try {
    const response = await http.post(
      `${http.url}/employee/verifyEmployeeLogin`,
      JSON.stringify({
        otp,
        employeeId: id,
      })
    );
    console.log(response.data.msg);
    return response.data.success;
  } catch (err) {
    console.log(err);
  }
};
