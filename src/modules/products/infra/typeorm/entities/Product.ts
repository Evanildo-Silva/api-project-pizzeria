import Category from "@modules/categories/infra/typeorm/entities/Category";
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("products")
export class Product {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column("decimal")
  price: number;

  @Column()
  description: string;

  @Column()
  banner: string;

  @ManyToOne(() => Category, category => category.products)
  category: Category;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
