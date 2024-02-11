import { AuditingAction, AuditingEntity } from 'typeorm-auditing'
import { User } from './User'

@AuditingEntity(User)
export class AuditingUser extends User {
  readonly _seq: number
  readonly _action: AuditingAction
  readonly _modifiedAt: Date
}
