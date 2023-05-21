import { useSetRecoilState } from "recoil";
import http from "../lib/index";
import { idState } from "../atoms/employeeId";

export const useGetOtp = () => {
  const setId = useSetRecoilState(idState);

  return {
    getOtp: async (email, password) => {
      try {
        const response = await http.post(
          `${http.url}/employee/login`,
          JSON.stringify({ email, password })
        );
        console.log(response.data.msg);
        console.log("otp->", response.data.data.createOtp);

        setId(response.data.data.employee);
        console.log(response.data.data.employee);

        return response.data.success;
      } catch (err) {
        console.log(err);
      }
    },
  };
};

export const useLoginUser = () => {
  return {
    loginUser: async (otp, id) => {
      try {
        const response = await http.post(
          `${http.url}/employee/verifyEmployeeLogin`,
          JSON.stringify({
            otp,
            employeeId: id,
          })
        );
        console.log(response.data.msg);
        console.log("jwt->", response.data.data.getToken);

        return response.data.success;
      } catch (err) {
        console.log(err);
      }
    },
  };
};

export const useRegisterUser = () => {
  return {
    registerUser: async (values) => {
      try {
        const response = await http.post(
          `${http.url}/employee/register`,
          JSON.stringify(values)
        );
        console.log(response.data.msg);
        console.log("id->", response.data.data.createDataEmployee);

        return response.data.success;
      } catch (err) {
        console.log(err);
      }
    },
  };
};
