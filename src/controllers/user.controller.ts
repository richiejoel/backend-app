import {Request, Response} from "express";
import User, {IUser} from "../models/user";
import jwt from "jsonwebtoken";
import {v4 as uuid} from "uuid";
import config from "../config/config";
const fs = require("fs");

function createToken(user: IUser){
    return jwt.sign({id: user.id, email: user.email}, config.jwtSecret, {
        expiresIn:86400
    });
}

export const signUp = async (req:Request, res:Response): Promise<Response> => {
    if(!req.body.email || !req.body.password || !req.body.name || !req.body.document){
        return res.status(400).json({msg: "Please. Send your email and password."});
    }

    const user = await User.findOne({email: req.body.email});
    console.log(`Usuario -> ${user}`);
    if(user){
        return res.status(400).json({msg: "The user already exists"});
    }

    if(req.body.imgbase64){
        req.body.imagePath = "uploads/"+uuid()+".png";
        fs.writeFile(req.body.imagePath ,req.body.imgbase64, "base64",(error:any)=>{
            if(!error){
                console.log("Exito");
            } else {
                console.log(error);
            }
            
        });
    }

    const newUser = new User(req.body);
    await newUser.save();

    return res.status(201).json(newUser);

}

export const signIn = async (req:Request, res:Response): Promise<Response> => {
    
    if(!req.body.email || !req.body.password){
        return res.status(400).json({msg: "Please. Send your email and password."});
    }

    const user = await User.findOne({email: req.body.email});

    if(!user){
        return res.status(400).json({msg: "The user does not exists"});
    } else {
        const isMatch:boolean = await user.comparePassword(req.body.password);
        if(isMatch){
            return res.status(200).json({msg: "Login Sucess", token: createToken(user)});
        } else {
            return res.status(400).json({msg: "Bad credentials"});
        }
    }
}


export const consultarUsuario = async (req:Request, res:Response): Promise<Response> => {
    if(!req.body.document){
        return res.status(400).json({msg: "Please. Send the document of user."});
    }

    const user = await User.findOne({document: req.body.document});

    if(!user){
        return res.status(400).json({msg: "The user does not exists"});
    } else {
        return res.status(201).json({name: user.name, email: user.email, ocuppation: user.occupation, imgbase64:user.imgbase64});
    }
}

export const consultarUsuariosAll = async (req:Request, res:Response): Promise<Response> => {
    
    const users = await User.find({}, {_id:0, document:1, name:1, email:1, occupation:1, imgbase64:1});

    if(!users){
        return res.status(400).json({msg: "Error in the backend"});
    } else {
        return res.status(201).json({usuarios: users});
    }
}

export const consultarUsuarioUrl = async (req:Request, res:Response): Promise<Response> => {
    if(!req.body.document){
        return res.status(400).json({msg: "Please. Send the document of user."});
    }

    const user = await User.findOne({document: req.body.document});

    if(!user){
        return res.status(400).json({msg: "The user does not exists"});
    } else {
        return res.status(201).json({name: user.name, email: user.email, ocuppation: user.occupation, imagePath:user.imagePath});
    }
}

export const consultarUsuariosUrlAll = async (req:Request, res:Response): Promise<Response> => {
    
    const users = await User.find({}, {_id:0, document:1, name:1, email:1, occupation:1, imagePath:1});

    if(!users){
        return res.status(400).json({msg: "Error in the backend"});
    } else {
        return res.status(201).json({usuarios: users});
    }
}


export const consultarImagen = (req:Request, res:Response) => {
    return res.sendFile(`/uploads/488201cb-ce4a-4dd2-a66d-b465bac9f8c6.png`);
}

/* http://localhost:3000/uploads/dd4fa1c7-7777-4aa3-vbnu-93773fa11565.png */