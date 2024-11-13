export type Event =
{
  id: string;
  summary: string;
  description: string;
  address: string;
  location?:
  {
    lat: number;
    lng: number;
  };
  start: string;
  end: string;
};

export type State =
{
  events?: Event[];
};
