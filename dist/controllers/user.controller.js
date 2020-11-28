"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.consultarImagen = exports.consultarUsuariosUrlAll = exports.consultarUsuarioUrl = exports.consultarUsuariosAll = exports.consultarUsuario = exports.signIn = exports.signUp = void 0;
const user_1 = __importDefault(require("../models/user"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const uuid_1 = require("uuid");
const config_1 = __importDefault(require("../config/config"));
const fs = require("fs");
function createToken(user) {
    return jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, config_1.default.jwtSecret, {
        expiresIn: 86400
    });
}
exports.signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.email || !req.body.password || !req.body.name || !req.body.document) {
        return res.status(400).json({ msg: "Please. Send your email and password." });
    }
    const user = yield user_1.default.findOne({ email: req.body.email });
    console.log(`Usuario -> ${user}`);
    if (user) {
        return res.status(400).json({ msg: "The user already exists" });
    }
    if (req.body.imgbase64) {
        req.body.imagePath = "uploads/" + uuid_1.v4() + ".png";
        fs.writeFile(req.body.imagePath, req.body.imgbase64, "base64", (error) => {
            if (!error) {
                console.log("Exito");
            }
            else {
                console.log(error);
            }
        });
    }
    const newUser = new user_1.default(req.body);
    yield newUser.save();
    return res.status(201).json(newUser);
});
exports.signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({ msg: "Please. Send your email and password." });
    }
    const user = yield user_1.default.findOne({ email: req.body.email });
    if (!user) {
        return res.status(400).json({ msg: "The user does not exists" });
    }
    else {
        const isMatch = yield user.comparePassword(req.body.password);
        if (isMatch) {
            return res.status(200).json({ msg: "Login Sucess", token: createToken(user) });
        }
        else {
            return res.status(400).json({ msg: "Bad credentials" });
        }
    }
});
exports.consultarUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.document) {
        return res.status(400).json({ msg: "Please. Send the document of user." });
    }
    const user = yield user_1.default.findOne({ document: req.body.document });
    if (!user) {
        return res.status(400).json({ msg: "The user does not exists" });
    }
    else {
        return res.status(201).json({ name: user.name, email: user.email, ocuppation: user.occupation, imgbase64: user.imgbase64 });
    }
});
exports.consultarUsuariosAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_1.default.find({}, { _id: 0, document: 1, name: 1, email: 1, occupation: 1, imgbase64: 1 });
    if (!users) {
        return res.status(400).json({ msg: "Error in the backend" });
    }
    else {
        return res.status(201).json({ usuarios: users });
    }
});
exports.consultarUsuarioUrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.document) {
        return res.status(400).json({ msg: "Please. Send the document of user." });
    }
    const user = yield user_1.default.findOne({ document: req.body.document });
    if (!user) {
        return res.status(400).json({ msg: "The user does not exists" });
    }
    else {
        return res.status(201).json({ name: user.name, email: user.email, ocuppation: user.occupation, imagePath: user.imagePath });
    }
});
exports.consultarUsuariosUrlAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_1.default.find({}, { _id: 0, document: 1, name: 1, email: 1, occupation: 1, imagePath: 1 });
    if (!users) {
        return res.status(400).json({ msg: "Error in the backend" });
    }
    else {
        return res.status(201).json({ usuarios: users });
    }
});
exports.consultarImagen = (req, res) => {
    return res.sendFile(`/uploads/488201cb-ce4a-4dd2-a66d-b465bac9f8c6.png`);
};
/* http://localhost:3000/uploads/dd4fa1c7-7777-4aa3-vbnu-93773fa11565.png */ 
//# sourceMappingURL=user.controller.js.map