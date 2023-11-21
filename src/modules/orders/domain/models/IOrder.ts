export interface IOrder {
  id: string;
  table: number;
  status: boolean;
  draft: boolean;
  name?: string;
  created_at: Date;
  updated_at: Date;
}
