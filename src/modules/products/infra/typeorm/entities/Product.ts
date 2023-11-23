import Category from "@modules/categories/infra/typeorm/entities/Category";
import { Item } from "@modules/items/infra/typeorm/entities/Item";
import { IProduct } from "@modules/products/domain/models/IProduct";
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("products")
class Product implements IProduct {
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

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Category, category => category.products)
  category: Category;

  @OneToMany(() => Item, item => item.product)
  items: Item[];
}

export default Product;
