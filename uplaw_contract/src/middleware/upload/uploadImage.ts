import  multer  from 'multer'
import path from 'path'

// Set up Multer storage engine
const storage = multer.diskStorage({
    destination: (req, file, callback)=>{
        callback(null,path.join(process.cwd(),'./image'))
    },
    filename: (req,file,callback) => {
        callback(null,Date.now() + file.originalname )
    }
})

// Create Multer instance
const fileName = (req:any,file:any,callback:any) => {
    if (file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg')
    {
      return callback(null,true)  
    } else {
        return callback(null,false)
    }
}

 const upload = multer({
    storage: storage,
  fileFilter: fileName,
 })

export default upload;

