"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
const user_controller_1 = require("../controllers/user.controller");
router.post("/signup", user_controller_1.signUp);
router.post("/signin", user_controller_1.signIn);
router.post("/consultarUsuario", user_controller_1.consultarUsuario);
router.get("/consultarUsuariosAll", user_controller_1.consultarUsuariosAll);
router.get("/consultarUsuariosAllTxt", user_controller_1.consultarUsuariosAllTxt);
router.post("/consultarUsuarioUrl", user_controller_1.consultarUsuarioUrl);
router.get("/consultarUsuariosUrlAll", user_controller_1.consultarUsuariosUrlAll);
router.put("/updateUser", user_controller_1.updateUser);
router.post("/deleteOneUser", user_controller_1.deleteOneUser);
//router.get('/images/:img',consultarImagen);
//consultarUsuarioUrl
exports.default = router;
//# sourceMappingURL=auth.routes.js.map