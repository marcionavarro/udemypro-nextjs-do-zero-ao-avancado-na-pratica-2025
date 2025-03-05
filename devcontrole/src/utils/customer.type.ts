export interface CustomerProps {
  id: string;
  name: string;
  email: string;
  phone: string;
  address?: string | null;
  userId: string | null;
}