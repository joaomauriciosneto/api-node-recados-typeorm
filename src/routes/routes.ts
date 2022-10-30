import { Router } from "express";
import { RecadoController } from "../controllers/Recado.controller";
import { UsuarioController } from "../controllers/Usuario.controller";

export const routes = Router();

routes.post('/usuario', new UsuarioController().criarUsuario);

routes.put('/usuario/:idUsuario', new UsuarioController().alterarUsuario);

routes.delete('/usuario/:idUsuario', new UsuarioController().deletarUsuario);

routes.get('/usuarios', new UsuarioController().listarUsuarios);

routes.post('/recado/:idUsuario/criar', new RecadoController().criarRecado);

routes.get('/recados', new RecadoController().listarRecados);
