import bcrypt from 'bcryptjs'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

export type JwtPayload = {
  uuid: string
  name: string
  email: string
  created_at: Date
  is_2fa_enable: number
  is_otp_verified: number
}

@Entity({ name: 'tbl_employee' })
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  uuid: string

  @Column()
  name: string

  @Column()
  email: string

  @Column()
  password: string

  @Column()
  is_2fa_enable: number

  @Column()
  is_otp_verified: number

  @Column()
  otp_secret: string

  @Column()
  otp_auth_url: string

  @Column()
  created_at: Date

  @Column()
  modified_at: Date

  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 8)
  }

  checkIfPasswordMatch(unencryptedPassword: string) {
    return bcrypt.compareSync(unencryptedPassword, this.password)
  }
}
