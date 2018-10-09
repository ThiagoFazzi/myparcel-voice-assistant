// src/users/entity.ts
import { Entity, PrimaryGeneratedColumn, JoinColumn, Column, OneToOne } from 'typeorm';
import { BaseEntity } from 'typeorm/repository/BaseEntity';
import { IsString, MinLength, IsEmail } from 'class-validator';
import { Exclude } from 'class-transformer';
import Alexa from '../alexa/entity';
// import * as bcrypt from 'bcrypt' <-- not working giving weird error
const bcrypt = require('bcryptjs');

@Entity()
export default class User extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @IsEmail()
  @Column('text', {nullable:false})
  email: string

  @IsString()
  @MinLength(8)
  @Column('text', { nullable:true })
  @Exclude({toPlainOnly:true})
  password: string

  async setPassword(rawPassword: string) {
    const hash = bcrypt.hashSync(rawPassword, 10)
    this.password = hash
  }

  checkPassword(rawPassword: string): Promise<boolean> {
    return bcrypt.compareSync(rawPassword, this.password)
  }

  @OneToOne(_ => Alexa, alexa => alexa.user) // specify inverse side as a second parameter
  @JoinColumn()
  alexa: Alexa;
}