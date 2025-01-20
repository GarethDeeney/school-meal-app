export interface RouteAction {
  label: string;
  url: string;
  icon: string;
  params?: {};
  execute?: Function;
}
