import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import bcrypt from 'bcryptjs'

@Entity({ name: 'tbl_employee' })
export class Employee {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  email: string

  @Column()
  password: string

  @Column()
  is_2fa_enable: boolean

  @Column()
  is_otp_verified: boolean

  @Column()
  otp_secret: boolean

  @Column()
  otp_auth_url: boolean

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
