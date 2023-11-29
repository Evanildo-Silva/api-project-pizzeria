import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from "typeorm";

export class AddProductIdToItems1700523182224 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "items",
      new TableColumn({
        name: "productId",
        type: "uuid",
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      "items",
      new TableForeignKey({
        name: "ProductsItems",
        columnNames: ["productId"],
        referencedTableName: "products",
        referencedColumnNames: ["id"],
        onDelete: "SET NULL",
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("items", "ProductsItems");
    await queryRunner.dropColumn("items", "productId");
  }
}
