import { Request, Response } from "express";
import { recadoRepository } from "../repositories/recado.repository";
import { usuarioRepository } from "../repositories/usuario.repository";

export class RecadoController {

    async criarRecado(req: Request, res: Response) {

        const {titulo, descricao, data_criacao, data_atualiza} = req.body;
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

        if(!data_criacao) {
            return res.status(400).send({
                ok: false,
                message: 'Preencha o campo Data de criação!'
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
                data_criacao,
                data_atualiza,
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

}