import { DataSourceOptions } from 'typeorm'
import { AuditingSubscriber } from 'typeorm-auditing'

const config: DataSourceOptions = {
  type: 'mysql',
  name: 'default',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USER || 'dev',
  password: process.env.DB_PASSWORD || 'dev',
  database: process.env.DB_NAME || 'db_boilerplate',
  synchronize: false,
  logging: true,
  entities: ['src/orm/entities/**/*.ts'],
  migrations: ['src/orm/migrations/**/*.ts'],
  subscribers: ['src/orm/subscriber/**/*.ts', AuditingSubscriber],
}

export default config
