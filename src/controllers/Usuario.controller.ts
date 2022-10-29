import { Request, Response } from "express";
import { usuarioRepository } from "../repositories/usuario.repository";

export class UsuarioController {

    async criarUsuario(req: Request, res: Response) {

        const {email, senha} = req.body;

        if(!email) {
            return res.status(400).send({
                ok: false,
                message: 'O preenchimento do email é obrigatório!'
            })
        }

        if(!senha) {
            return res.status(400).send({
                ok: false,
                message: 'Por favor, informe uma senha!'
            })
        }

        try {

            const novoUsuario = usuarioRepository.create({
                email,
                senha
            })

            await usuarioRepository.save(novoUsuario);

            return res.status(201).send({
                ok: true,
                message: 'Usuário cadastrado com sucesso!',
                data: novoUsuario
            })
            
        } catch (error: any) {
            
            return res.status(500).send({
                ok: false,
                message: 'Instabilidade no servidor!',
                error: error.toString()
            })

        }

    }

    async listarUsuarios(req: Request, res: Response) {

        try {

            const usuarios = usuarioRepository.find({
                relations: {
                    recados: true
                }
            })

            return res.status(200).send({
                ok: true,
                message: 'Listagem de todos os usuários!',
                data: usuarios
            })
            
        } catch (error: any) {
            
            return res.status(500).send({
                ok: false,
                message: 'Instabilidade no servidor!',
                error: error.toString()
            })

        }

    }

}