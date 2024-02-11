import { DataSourceOptions } from 'typeorm'
import { AuditingSubscriber } from 'typeorm-auditing'

const config: DataSourceOptions = {
  type: 'mysql',
  name: 'default',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: true,
  entities: ['src/orm/entities/**/*.ts'],
  migrations: ['src/orm/migrations/**/*.ts'],
  subscribers: ['src/orm/subscriber/**/*.ts', AuditingSubscriber],
}

export default config
