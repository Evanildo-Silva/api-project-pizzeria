import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from "typeorm";

export class AddOrderIdToItems1700522613355 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "items",
      new TableColumn({
        name: "order_id",
        type: "uuid",
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      "items",
      new TableForeignKey({
        name: "OrdersItems",
        columnNames: ["order_id"],
        referencedTableName: "orders",
        referencedColumnNames: ["id"],
        onDelete: "SET NULL",
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("items", "OrdersItems");
    await queryRunner.dropColumn("items", "order_id");
  }
}
