import { Request } from "express";
import multer from "multer";
import { type } from "os";

type DestinationCallback = (error: Error | null, destination: string) => void
type FileNameCallback = (error: Error | null, filename: string) => void

 const fileStorage = multer.diskStorage({
    destination:( request: Request,
        file: Express.Multer.File,
        callback: DestinationCallback):void =>{
            const uploadFolder = './public'
            callback(null, uploadFolder)
        },
        filename:(req: Request, 
            file: Express.Multer.File, 
            callback: FileNameCallback):void =>{
                callback(null, `/post-images/${Date.now()}-${file.originalname}`)
            }
 })

 const upload = multer({
    storage: fileStorage
 })

 export default upload
