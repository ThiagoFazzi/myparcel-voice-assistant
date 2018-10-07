import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import { IsString, Length, MinLength } from 'class-validator'

@Entity()
export default class Label extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @IsString()
  @Length(5, 25)
  @Column('uuid')
  labelId: string

  @IsString()
  @MinLength(10)
  @Column('boolean')
  printed: boolean
}