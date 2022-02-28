export interface Tenant {
  id: number;
  name: string;
  description?: string | null;
  created_at: Date;
  updated_at: Date;
}
