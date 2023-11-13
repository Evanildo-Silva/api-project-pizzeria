import { ICategory } from "@modules/categories/domain/models/ICategory";
import {
  Column,
  CreateDateColumn,
  Entity,
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

  // TODO implementar a relação com Produtos
  // @OneToMany(() => Product, product => product.category)
  // products: Product[];
}

export default Category;
