import { Item } from "@modules/items/infra/typeorm/entities/Item";
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("orders")
class Order {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  table: number;

  @Column({ default: false })
  status: boolean;

  @Column({ default: true })
  draft: boolean;

  @Column({ nullable: true })
  name: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Item, item => item.order)
  items: Item[];
}

export default Order;
