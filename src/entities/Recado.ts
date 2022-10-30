import { 
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn } from "typeorm";
import { Usuario } from "./Usuario";

@Entity('recados')
export class Recado {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'text'})
    titulo: string;

    @Column({type: 'text'})
    descricao: string;

    @CreateDateColumn()
    data_criacao: Date;

    @CreateDateColumn()
    data_atualiza: Date;

    @ManyToOne(() => Usuario, usuario => usuario.recados)
    @JoinColumn({name: 'id_usuario'})
    usuario: Usuario

}