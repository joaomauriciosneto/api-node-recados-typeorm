import { Request, Response } from "express";
import test from "node:test";
import { recadoRepository } from "../repositories/recado.repository";
import { usuarioRepository } from "../repositories/usuario.repository";

export class RecadoController {

    async criarRecado(req: Request, res: Response) {

        const {titulo, descricao} = req.body;
        const {idUsuario} = req.params;

        if(!titulo) {
            return res.status(400).send({
                ok: false,
                message: 'Preencha o compo Título!'
            })
        }

        if(!descricao) {
            return res.status(400).send({
                ok: false,
                message: 'Preencha o campo Descrição!'
            })
        }

        try {

            const usuario = await usuarioRepository.findOneBy({id: Number(idUsuario)})

            if(!usuario) {
                return res.status(404).send({
                    ok: false,
                    message: 'Usuário não encontrado!'
                })
            };

            const novoRecado = recadoRepository.create({
                titulo,
                descricao,
                usuario
            });

            await recadoRepository.save(novoRecado);

            return res.status(201).send({
                ok: true,
                message: 'Recado cadastrado com sucesso!',
                data: novoRecado
            });
            
        } catch (error: any) {
            
            return res.status(500).send({
                ok: false,
                message: 'Instabilidade no servidor!',
                error: error.toString()
            })

        }

    }

    async listarRecados(req: Request, res: Response) {

        try {

            const recados = await recadoRepository.find({
                relations: {
                    usuario: true
                }
            })

            return res.status(200).send({
                ok: true,
                message: 'Listagem de todos os recados!',
                data: recados
            })
            
        } catch (error: any) {
            
            return res.status(500).send({
                ok: false,
                message: 'Instabilidade no servidor!',
                error: error.toString()
            })

        }

    }

    async listarRecadosPorUsuario(req: Request, res: Response) {

        try {

            const {idUsuario} = req.params;

            const usuarioRecado = await recadoRepository.find({
                where: {
                    usuario: {id: Number(idUsuario)}
                }
            })

            if(usuarioRecado == null || usuarioRecado.length == 0 ) {
                return res.status(404).send({
                    ok: false,
                    message: 'Usuário não encontrado!'
                })
            }

            return res.status(200).send({
                ok: true,
                message: 'Recado listado por usuário!',
                data: usuarioRecado
            })
            
        } catch (error: any) {
            
            return res.status(500).send({
                ok: false,
                message: 'Instabilidade no servidor!',
                error: error.toString()
            })

        }

    }

    async alterarRecado(req: Request, res: Response) {

        try {

            const {idUsuario,idRecado} = req.params;
            const {titulo, descricao} = req.body;

            const usuario = await usuarioRepository.findOneBy({id: Number(idUsuario)});

            if(!usuario) {
                return res.status(404).send({
                    ok: false,
                    message: 'Usuário não existe!'
                })
            }

            const recado = await recadoRepository.findOneBy({
                id: Number(idRecado), 
                usuario: {id: usuario.id}
                });

            if(!recado) {
                return res.status(404).send({
                    ok: false,
                    message: 'Recado não existe!'
                })
            }

            recado.descricao = descricao;
            recado.titulo = titulo;

            await recadoRepository.save(recado);

            return res.status(200).send({
                ok: true,
                message: 'Recado alterado com sucesso!'
            })

        } catch (error: any) {
            
            return res.status(500).send({
                ok: false,
                message: 'Instabilidade no servidor!',
                error: error.toString()
            })

        }

    }

    async deletarRecadoPorUsuario(req: Request, res: Response) {

        try {

            const {idRecado} = req.params;

            const recadoUsuario = await recadoRepository.findOneBy({id: Number(idRecado)});

            if(!recadoUsuario) {
                return res.status(404).send({
                    ok: false,
                    message: 'Recado não existe!'
                })
            }

            await recadoRepository.delete(recadoUsuario);

            return res.status(200).send({
                ok: true,
                message: 'Recado excluído com sucesso!'
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