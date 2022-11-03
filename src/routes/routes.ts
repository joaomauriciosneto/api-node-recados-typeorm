import { Request, Response, Router } from "express";
import { RecadoController } from "../controllers/Recado.controller";
import { UsuarioController } from "../controllers/Usuario.controller";

export const routes = Router();

routes.get('/terms', (req: Request, res: Response) => {

    return res.json({
        message: 'Termos do serviço'
    });

});

routes.post('/usuario', new UsuarioController().criarUsuario);

routes.put('/usuario/:idUsuario', new UsuarioController().alterarUsuario);

routes.delete('/usuario/:idUsuario', new UsuarioController().deletarUsuario);

routes.get('/usuarios', new UsuarioController().listarUsuarios);

routes.post('/recado/:idUsuario/criar', new RecadoController().criarRecado);

routes.get('/recados', new RecadoController().listarRecados);

routes.get('/recado/usuario/:idUsuario', new RecadoController().listarRecadosPorUsuario);

routes.put('/recado/:idUsuario/:idRecado', new RecadoController().alterarRecado);

routes.delete('/recado/deletar/:idRecado', new RecadoController().deletarRecadoPorUsuario);
