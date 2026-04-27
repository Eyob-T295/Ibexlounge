export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  category: 'Habesha' | 'Fast Food' | 'Desserts' | 'Drinks';
  image: string;
}

export interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
  date: string;
  time: string;
  competition: string;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  description: string;
  image: string;
}
