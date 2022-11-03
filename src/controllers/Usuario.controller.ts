import { Request, Response } from "express";
import { Usuario } from "../entities/Usuario";
import { recadoRepository } from "../repositories/recado.repository";
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

            const usuarios = await usuarioRepository.find();

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

    async alterarUsuario(req: Request, res: Response) {

        try {

            const {idUsuario} = req.params;
            const {email, senha} = req.body;

            if(!email) {
                return res.status(400).send({
                    ok: false,
                    message: 'Preencha o campo Email!'
                })
            }
            
            if(!senha) {
                return res.status(500).send({
                    ok: false,
                    message: 'Preencha o campo Senha!'
                })
            }

            const usuario = await usuarioRepository.findOneBy({id: Number(idUsuario)});

            if(!usuario) {
                return res.status(404).send({
                    ok: false,
                    message: 'Usuário não encontrado!'
                })
            }

            await usuarioRepository.update({id: Number(idUsuario)}, {
                email,
                senha
            })       

            return res.status(200).send({
                ok: true,
                message: 'Usuário atualizado com sucesso!',
                data: {
                    email,
                    senha
                }
            })

        } catch (error: any) {
            
            return res.status(500).send({
                ok: false,
                message: 'Instabilidade no servidor!',
                error: error.toString()
            })

        }

    }

    async deletarUsuario(req: Request, res: Response) {

        try {

            const {idUsuario} = req.params;

            const usuario = await usuarioRepository.findOneBy({id: Number(idUsuario)});

            if(!usuario) {
                return res.status(404).send({
                    ok: false,
                    message: 'Usuário não encontrado!'
                })
            }

            const recados= await recadoRepository.findBy({
                usuario: {
                    id: Number(idUsuario)
                }
            })

            if(recados && recados.length > 0) {
                await recadoRepository.delete({
                    usuario: {
                        id: Number(idUsuario)
                    }
                })
            }         

            await usuarioRepository.delete({id: Number(idUsuario)});

            return res.status(200).send({
                ok: true,
                message: 'Usuário excluído com sucesso!'
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