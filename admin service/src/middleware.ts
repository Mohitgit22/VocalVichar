import {NextFunction, Request, Response} from 'express'
import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config();

interface IUser {
    _id: string;
    name: string;
    email: string;
    password: string;
    role: string;
    playlist: string[];
}

interface AutheticatedRequest extends Request {
    user?: IUser | null;
}

export const isAuth = async (req: AutheticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const token = req.headers.token as string;

        if(!token){
            res.status(403).json({
                message:"Please Login"
            });
            return ;
        }

        const {data} = await axios.get(`${process.env.User_URL}/api/v1/user/me`, {
            headers:{
                token,
            }
        })

        req.user = data;
        next();
    } catch (error) {
        res.status(403).json({
            message:"Please Login"
        })
    }
}


//multer setup
import multer from 'multer'

const storage = multer.memoryStorage()

const uploadFile = multer({storage}).single("File");

export default uploadFile;


