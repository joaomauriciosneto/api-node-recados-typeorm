import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Recado } from "./Recado"

@Entity('usuarios')
export class Usuario {

    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'text'})
    email: string

    @Column({type: 'text'})
    senha: string

    @OneToMany(() => Recado, recado => recado.usuario)
    recados: Recado

}