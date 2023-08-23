import passport from "passport";
import passportGoogle from "passport-google-oauth20";
import { Employee } from '../model/Employee/Employee';
import dotenv from 'dotenv';
import { join } from 'path';

const GoogleStrategy = passportGoogle.Strategy;

// Load environment variables from .env files
dotenv.config({path:join(__dirname, './../../.env')});



// Serialize the employee object
 passport.serializeUser((employee, done) => {
   done(null, employee);
  });

// Deserialize the employee object by its id
passport.deserializeUser(async (id, done) => {
  try {
    const employee = await Employee.findById(id);
    done(null, employee);
  
  } catch (error) {
     done(error as Error, null);
  }
});

// Use Google OAuth2.0 strategy for authentication
passport.use(
  new GoogleStrategy(
    {
      clientID:process.env.CLIENTID as string,
      clientSecret:process.env.CLIENTSECRET as string,
      callbackURL:process.env.CALLBACKURL as string,
    },

    async (accessToken, refreshToken, profile, done) => {
      console.log(profile)
      try {
        // Find the employee by their Google ID
        const existEmployee = await Employee.findOne({ googleId: profile.id });

        if (existEmployee) {
          console.log('already profile id exist', existEmployee)
        }

       

        // Create a new employee if they don't exist
        const newEmployee = await Employee.create({
          googleId: profile.id,
          email: profile.emails?.[0]?.value,
        });
        

       console.log('New employee created:', newEmployee);
         return done(null,newEmployee);
       
      } catch (error) {
        console.log(error)
         return done(error as Error); 
      };
    }
  ));





