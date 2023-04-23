import { Request, Response } from 'express'
import {User,IUser} from '../../model/user/user'
import {generateOtp} from '../../utile/otp'

export const employeeRegistration = async (req: Request, res: Response)=> {
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
             createAt
    } = req.body
          // create document and  save to document
        const employeeData:IUser = await User.create({
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
             createAt
        })
          // check request body
                  if (!employeeData) {
                    return res.status(404).json({
                          success: false,
                          msg : 'Not Found Error'
                       })
                  }
            // response data from employee       
                    return res.status(201).json({
                       success: true,
                       data: {createDataEmployee : employeeData},
                       msg : 'successfully create document user on database'
                   })
                  
    } catch (error) {
                    return res.status(500).json({
                      success: false,
                      msg : ['Internal Server Error', error]
                  })
    }
}

//login employee
export const employeeLogin = async(req:Request,res:Response) => {
  try {
    // check numberMobile employee
    const { numberMobile } = req.body

    const checkMobileNumber = await User.findOne({ numberMobile })
    
    if (! checkMobileNumber) {
      return res.status(404).json({
        success: false,
        msg : 'mobileNumber_not_found_ERR'
      })
    }

    // generate otp employee
    let otp = generateOtp(6)
    checkMobileNumber.mobileOtp = otp
    await checkMobileNumber.save()
    
    return res.status(200).json({
      success: true,
      data: {
        employeeId: checkMobileNumber._id,
        createOtp : otp
      },
      msg:'successfully send otp to mobileNumber employee'
    })

  } catch (err) {
    console.log(err)
    return res.status(500).json({
      success: false,
      msg:'Internal Server Error'
    })
  }
}


//verify login employee with otp 
export const verifyLoginEmployee = async (req: Request, res: Response) => {
    const { otp, employeeId } = req.body
  try {  
     //check find employee with id of database
    const employee = await User.findById({_id:employeeId})
    if (!employee) {
      return res.status(404).json({
        success: false,
        msg :'workerId not found'
      })
    }

    // build time  for verify and login employee
    const now = new Date()
    const timeDiff = now.getTime() - employee.verificationCodeSentAt.getTime()
    const minutesDiff = Math.floor(timeDiff / 60000)
    const time: number = 5 * 60 * 1000;

    // check and match time 
    if( minutesDiff > time) {
      return res.status(400).json({
          success : false,
          msg :'Verification code has expired' 
      })
    }

    // match otp 
    if (employee.mobileOtp !== otp) {
      return res.status(400).json({
        success: false,
        msg :'Invalid verification code'
      })
    }

    // Generate JWT
    const getToke = employee.generateAuthEmployeeToken()

    // last update document of employee 
    await employee.save()

    // send token and employeeId of document for login  employee in application 
    return res.status(200).json({
      success: true,
      data: {
        getToke,
        employeeID : employee._id
      },
      msg :"successfully login employee with mobileNumber "
    })

  } catch (error:any) {
    console.log(error)
    return res.status(500).json({
      success: false,
      msg : ['Internal Server Error', error.message]
    })
  }
}

