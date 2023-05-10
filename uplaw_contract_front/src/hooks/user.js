import { useSetRecoilState } from "recoil";
import http from "../lib/index";
import { idState } from "../atoms/employeeId";

export const useGetOtp = () => {
  const setId = useSetRecoilState(idState);

  return {
    getOtp: async (num) => {
      try {
        const response = await http.post(
          `${http.url}/employee/login`,
          JSON.stringify({ numberMobile: num })
        );
        console.log("otp->", response.data.data.createOtp);

        setId(response.data.data.employeeId);

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
