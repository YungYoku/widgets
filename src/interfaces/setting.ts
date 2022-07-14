export interface Setting {
  name: string;
  title: string;
  turnedOn: boolean;
  actionType: string;
  action: () => {};
}