import { Request, Response } from 'express';
import { Employee, IEmployee } from '../../model/Employee/Employee';
import { generateOtp } from '../../utile/otp';
import { sendRegistrationEmail } from '../../utile/sendEmail';



//register employee
export const employeeRegistration = async (req: Request, res: Response) => {
  
  // upload filename photo
  const file = req.file;
    
  try {
    // create field of req.body for push in document
    const {
      firstName,
      lastName,
      password,
      address,
      email,
      age,
      nationalCode,
      numberMobile,
      gender,
      isActive,
      createAt,
      profileImage
    } = req.body;

    // create document and  save to document
    const employeeData: IEmployee = await Employee.create({
      firstName,
      lastName,
      password,
      address,
      email,
      age,
      nationalCode,
      numberMobile,
      gender,
      isActive,
      createAt,
      profileImage
    });
    // check request body
    if (!employeeData) {
      return res.status(404).json({
        success: false,
        msg: 'Not Found Error'
      })
    };
            
    // send email to employee for register successfully
    await sendRegistrationEmail(employeeData.email, employeeData.firstName);
    
    // response data from employee
    return res.status(201).json({
      success: true,
      data: { createDataEmployee: employeeData._id },
      msg: 'successfully create document user on database'
    });
                  
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      msg: ['Internal Server Error', error.message]
    });
  }
};

//login employee
export const employeeLogin = async (req: Request, res: Response) => {
  try {
    
    const { email, password } = req.body;
    
    // check numberMobile employee
    const employees = await Employee.findOne({ email });

    if (!employees) {
      return res.status(404).json({
        success: false,
        msg: "Employee details were not found in the database"
      });
    };

    // match password employee  
    const isMatchPassword = await employees.isComparePassword(password);

    if (!isMatchPassword) {
      return res.status(400).json({
        success: false,
        msg: 'password is not match '
      });
    };

    // generate otp employee
    let otp = generateOtp(6);
    employees.mobileOtp = otp;
    await employees.save();
    
    return res.status(200).json({
      success: true,
      data: {
        createOtp: otp,
        employee: employees._id
      },
      msg: 'successfully send otp to mobileNumber employee'
    });

  } catch (err) {
    console.log(err)
    return res.status(500).json({
      success: false,
      msg: 'Internal Server Error'
    })
  }
};

//verify login employee with otp 
export const verifyLoginEmployee = async (req: Request, res: Response) => {
  const { otp, employeeId } = req.body;

  try {
    //check find employee with id of database
    const employee = await Employee.findById({ _id: employeeId });

    if (!employee) {
      return res.status(404).json({
        success: false,
        msg: 'workerId not found'
      });
    };

    // build time  for verify and login employee
    const now = new Date();
    const timeDiff = now.getTime() - employee.verificationCodeSentAt.getTime();
    const minutesDiff = Math.floor(timeDiff / 60000);
    const time: number = 5 * 60 * 1000;

    // check and match time 
    if (minutesDiff > time) {
      return res.status(400).json({
        success: false,
        msg: 'Verification code has expired'
      });
    };

    // match otp 
    if (employee.mobileOtp !== otp) {
      return res.status(400).json({
        success: false,
        msg: 'Invalid verification code'
      })
    }

    // Generate JWT
    const getToken = employee.generateAuthEmployeeToken()

    // last update document of employee 
    employee.mobileOtp = ""
    await employee.save();

    // send token and employeeId of document for login  employee in application 
    return res.status(200).json({
      success: true,
      data: {
        getToken,
        employeeID: employee._id
      },
      msg: "successfully login employee with mobileNumber "
    });

  } catch (error: any) {
    return res.status(500).json({
      success: false,
      msg: ['Internal Server Error', error.message]
    });
  };
};

// get All Employee 
export const getAllEmployee = async (req: Request, res: Response) => {
  
  try{
    const AllEmployee = await Employee.find({}, {
      isActive: 0,
      createdAt: 0,
      updatedAt: 0,
      __v: 0,
      verificationCodeSentAt: 0,
      mobileOtp: 0
    });

    if (!AllEmployee) {
      return res.status(404).json({
        success: false,
        msg: 'Error Not Found'
      });
    };

    return res.status(200).json({
      success: true,
      data: AllEmployee,
      msg: "successfully get all data of employee document"
    });

  }catch(err){
    console.log(err)
    return res.status(500).json({
      success: false,
      msg: "internal Server Error"
    })
  }
}

// get one Employee of database 
export const getOeEmployee = async (req: Request<{id:string}>, res: Response) => {
  const id = req.params.id;
  try { 
    const getEmployeeId: IEmployee | null = await Employee.findById({ _id: id }, {
      isActive: 0,
      createdAt: 0,
      updatedAt: 0,
      __v: 0,
      verificationCodeSentAt: 0,
      mobileOtp: 0
    });

    // Error not found
    if (!getEmployeeId) {
      return res.status(404).json({
        success: false,
        msg: "Error Not Found Id Employee of database"
      });
    };

    //response data of database
    return res.status(200).json({
      success: true,
      data: getEmployeeId,
      msg: "Successfully get One Employee with Id"
    });

  } catch (err) {
    console.log(err)
    return res.status(500).json({
      success: false,
      msg :"Internal Server Error"
    })
  }
}

// delete employee with id
export const deleteEmployee = async (req: Request<{ id: string }>, res: Response) => {
  const id = req.params.id;
  try {
    
    const getEmployee = await Employee.findByIdAndDelete(id);
    if (!getEmployee) {
      return res.status(404).json({
        success: false,
        msg: 'Error Not Found'
      });
    }

    return res.status(200).json({
      success: true,
      msg: 'Employee Delete Successfully'
    });

  } catch (err: any) {
    return res.status(500).json({
      success: false,
      msg: ['Internal Server Error', err.message]
    })
  }
};


//forget password employee 
export const employeeForgetPassword = async (req: Request, res: Response) => {
  
  const { nationalCode } = req.body;
  try {

    // get nationalCode employee as database
    const getEmployee: IEmployee | null = await Employee.findOne({ nationalCode });
    
    if (!getEmployee) {
      return res.status(400).json({
        success: false,
        msg: 'Error Not Found nationalCode employee of database'
      });
    }

    // create lastFourNumber as mobileNumber Employee
    const lastFourNumber = getEmployee.numberMobile.slice(-4);

    // response mobileNumber for employee
    return res.status(200).json({
      success: true,
      data: `mobileNumber:******${lastFourNumber}  ${"+"}  ${getEmployee._id} `,
      msg: 'successfully Get mobileNumber as database then show to employee'
    });

  } catch (err) {
    console.log(err)
    return res.status(500).json({
      success: false,
      mag: 'internal Server Error'
    });
  }
}

// verify reset mobileNumber Employee
export const resetPasswordEmployee = async (req: Request<{id:string}>, res: Response) => {
  const { lastFourDigits, employeeId } = req.body;
  try {

    const getEmployee: IEmployee | null = await Employee.findById({ _id: employeeId });

    if (!getEmployee) {
      return res.status(400).json({
        success: false,
        msg:"Not Found  Employee"
      })
    }

    // match last 4 numberMobile employee
    if (getEmployee.numberMobile.slice(-4) !== lastFourDigits) {
      return res.status(400).json({
        success: false,
        msg: 'Not Match for lastFourDigits with numberMobile'
      });
    }

    // generate otp  for mobileNumber employee 
    let otp = generateOtp(6)
    getEmployee.mobileOtp = otp
    await getEmployee.save()

    //TODO
    // send code otp For MobileNumber Employee
     
    return res.status(201).json({
      success: true,
      data: {
        createOtp: otp,
        employee: getEmployee._id
      },
      msg: 'successfully verify mobileNumber  and send code otp for employee'
    });

  } catch (err) {
    console.log(err)
    return res.status(500).json({
      success: false,
      msg :'Internal Server Error'
    })
  }
}

