import { appDataSource } from "../data-source";
import { Usuario } from "../entities/Usuario";

export const usuarioRepository = appDataSource.getRepository(Usuario);