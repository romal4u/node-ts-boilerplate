import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class empTable1702184134056 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tbl_employee',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'email',
            type: 'varchar',
          },
          {
            name: 'password',
            type: 'varchar',
          },
          {
            name: 'is_2fa_enable',
            type: 'tinyint',
          },
          {
            name: 'is_otp_verified',
            type: 'tinyint',
          },
          {
            name: 'otp_secret',
            type: 'varchar',
          },
          {
            name: 'otp_auth_url',
            type: 'varchar',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'modified_at',
            type: 'timestamp',
            default: 'now()',
            onUpdate: 'now()'
          },
        ],
      }),
      true,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('tbl_employee')
  }
}
