export interface Activity {
  id: string;
  title: string;
  date: Date | null;
  description: string;
  category: string;
  city: string;
  venue: string;
}

export const initialActivity = {
  id: "",
  title: "",
  date: null,
  description: "",
  category: "",
  city: "",
  venue: "",
};
