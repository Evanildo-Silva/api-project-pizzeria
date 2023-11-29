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
        name: "orderId",
        type: "uuid",
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      "items",
      new TableForeignKey({
        name: "OrdersItems",
        columnNames: ["orderId"],
        referencedTableName: "orders",
        referencedColumnNames: ["id"],
        onDelete: "SET NULL",
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("items", "OrdersItems");
    await queryRunner.dropColumn("items", "orderId");
  }
}
