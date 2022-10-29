import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Usuario } from "./Usuario";

@Entity('recados')
export class Recado {

    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'text'})
    titulo: string

    @Column({type: 'text'})
    descricao: string

    @Column({type: 'text'})
    data_criacao: string

    @Column({type: 'text'})
    data_atualiza: string

    @ManyToOne(() => Usuario, usuario => usuario.recados)
    @JoinColumn({name: 'id_usuario'})
    usuario: Usuario

}