import {Router} from "express";
const router = Router();

import {signIn, signUp, consultarUsuario, consultarUsuariosAll, consultarUsuarioUrl, consultarUsuariosUrlAll} from "../controllers/user.controller";

router.post("/signup",signUp );
router.post("/signin",signIn );
router.post("/consultarUsuario", consultarUsuario);
router.get("/consultarUsuariosAll",consultarUsuariosAll);
router.post("/consultarUsuarioUrl",consultarUsuarioUrl);
router.get("/consultarUsuariosUrlAll",consultarUsuariosUrlAll);

//router.get('/images/:img',consultarImagen);
//consultarUsuarioUrl

export default router;