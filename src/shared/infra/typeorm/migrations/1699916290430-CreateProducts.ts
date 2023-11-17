import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
} from "typeorm";

export class CreateProducts1699916290430 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "products",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
          },
          {
            name: "name",
            type: "varchar",
          },
          {
            name: "price",
            type: "decimal",
            precision: 10,
            scale: 2,
          },
          {
            name: "description",
            type: "varchar",
          },
          {
            name: "banner",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "created_at",
            type: "timestamp with time zone",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp with time zone",
            default: "now()",
          },
        ],
      }),
    );
    await queryRunner.addColumn(
      "products",
      new TableColumn({
        name: "categoryId",
        type: "uuid",
      }),
    );
    await queryRunner.createForeignKey(
      "products",
      new TableForeignKey({
        columnNames: ["categoryId"],
        referencedColumnNames: ["id"],
        referencedTableName: "categories",
        onDelete: "CASCADE",
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable("products");
    const foreignKey = table?.foreignKeys.find(
      fk => fk.columnNames.indexOf("categoryId") !== -1,
    );
    await queryRunner.dropForeignKey(
      "products",
      foreignKey as string | TableForeignKey,
    );
    await queryRunner.dropColumn("products", "categoryId");
    await queryRunner.dropTable("products");
  }
}
