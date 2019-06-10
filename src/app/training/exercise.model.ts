export interface Exercise {
  id: string;
  name: string;
  duration: number; // in seconds
  calories: number;
  date?: Date; // not all will have dates
  state?: 'completed' | 'cancelled' | null;
}
