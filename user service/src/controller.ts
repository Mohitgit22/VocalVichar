import { User } from "./model.js";
import TryCatch from "./TryCatch.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { AuthenticatedRequest } from "./middleware.js";

export const registerUser = TryCatch(async (req, res) => {
    
    const {name, email, password} = req.body;
    let user = await User.findOne({email});

    if(user){
        res.status(400).json({
            message: "User Already exist",
        })
    return ;
    }

    const hashPassword = await bcrypt.hash(password, 10);

    user = await User.create({
        name,
        email, 
        password: hashPassword,
    });

    const token = jwt.sign({_id: user._id, email: user.email}, process.env.JWT_SEC as string, {
        expiresIn: "7d"
    });
   
     res.status(201).json({
        message: "User Registered Successfully",
        user,
        token,
     });

});


export const loginUser = TryCatch(async(req, res) => {
    const {email, password} = req.body;

    let user = await User.findOne({email});

    if(!user){
        res.status(404).json({
            message:"User not exists",
        });
        return;
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch){
        res.status(400).json({
            message:"Invalid Password",
        });
        return;
    }

    const token = jwt.sign({_id: user._id}, process.env.JWT_SEC as string, {
        expiresIn: "7d"
    });
   
     res.status(200).json({
        message: "User login Successfull",
        user,
        token,
     });
});

export const myProfile = TryCatch(async(req: AuthenticatedRequest, res) => {
    const user = req.user;

    res.json(user);
})