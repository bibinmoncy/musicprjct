import User from "../model/user.model.js";
import { generateToken } from "../lib/util.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) =>{
    const {fullName, email, password} = req.body;

    try{
        if(!fullName || !email || !password) return res.status(400).json({message: "all fields required"}); 
        
        if(password.length < 6){
            return res.status(400).json({message: "password must be atleast 6 characters"});
        }

        const user = await User.findOne({email});
        
        //email verification
        if(user) return res.status(400).json({messge: "email already exists"});

        //encrypt password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        
        const newUser = new User({
            fullName: fullName,
            email: email,
            password: hashPassword
        })

        if(newUser){
            // generate jwt token
            generateToken(newUser._id, res)
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                
            });
        }else{
            res.status(400).json({message: "Invalid User Data"});
        }
        
    }catch(error){
        console.error(`Error in signup controller: ${error.message}`);
    res.status(500).json({ message: "Internal Server Error" });
    }
}

export const login = async(req, res) =>{
    const {email, password} = req.body;
    try{
        const user = await User.findOne({email})

        if(!user) return res.status(400).json({message: "Invalid Credentials"});

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if(!isPasswordCorrect) return res.status(400).json({message:"Invalid Credentials"})
        
        generateToken(user._id, res);

        res.status(200).json({
            _id: user._id,
                fullName: user.fullName,
                email: user.email,
                profilePic: user.profilePic
        })

    }catch(error){
        console.log(`error in login controller ${error.message}`);
        res.status(500).json({message: "Internal Server Error"});
    }
}

export const logout = (req, res) =>{
    try{
        res.cookie("jwt", "", {maxAge:0});
        res.status(200).json({message: "Logged out Successfully"});
    }catch(error){
        console.log(`error in logout controller ${error.message}`);
        res.status(500).json({message: "Internal Server Error"})
    }
}

export const checkAuth = (req, res)=>{
    try{
        res.status(200).json(req.user);
    }catch(error){
        console.log(`error in checkAuth controller: ${error.message}`)
        res.status(500).json({message: "Internal Server Error"});
    }
};
