import { ICategory } from "@modules/categories/domain/models/ICategory";
import Product from "@modules/products/infra/typeorm/entities/Product";
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("categories")
class Category implements ICategory {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Product, product => product.category_id)
  products: Product[];
}

export default Category;
