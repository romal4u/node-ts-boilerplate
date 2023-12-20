import { DataSource } from 'typeorm'

import config from './config/ormconfig'

export const appDataSource = new DataSource(config)
