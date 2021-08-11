export interface Activity {
  id: string;
  title: string;
  date: string;
  description: string;
  category: string;
  city: string;
  venue: string;
}

export const initialActivity = {
  id: "",
  title: "",
  date: "",
  description: "",
  category: "",
  city: "",
  venue: "",
};
