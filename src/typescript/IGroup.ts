import Category from './ICategory';

export default interface IGroup {
  id: number;
  group: string;
  category?: Category;
}
