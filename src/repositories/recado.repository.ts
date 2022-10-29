import { appDataSource } from "../data-source";
import { Recado } from "../entities/Recado";

export const recadoRepository = appDataSource.getRepository(Recado);