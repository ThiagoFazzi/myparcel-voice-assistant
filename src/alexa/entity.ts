import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import { IsString, IsNumber, Length } from 'class-validator'
import User from '../users/entity'

@Entity()
export default class Alexa extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @Column('uuid', {nullable:false})
  labelId: string
  
  @IsNumber()
  @Column('boolean', {nullable:false})
  printed: boolean

  @OneToOne(_ => User, user => user.alexa)
  user: User
}