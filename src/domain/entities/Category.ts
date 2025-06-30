import { CategoryId } from '../value-objects/CategoryId';
export interface CategoryProps {
  name: string;
  color?: string;
} // color es opcional

export class Category {
  private constructor(
    public readonly id: CategoryId,
    private props: CategoryProps,
    private _createdAt: Date
  ) {}

  static create(props: CategoryProps) {
    return new Category(CategoryId.create(), props, new Date());
  }

  update(props: Partial<CategoryProps>) {
    this.props = { ...this.props, ...props };
  }

  static hydrate(id: string, props: CategoryProps, createdAt: string | Date) {
    return new Category(
      CategoryId.from(id),
      props,
      typeof createdAt === 'string' ? new Date(createdAt) : createdAt
    );
  }

  get name() {
    return this.props.name;
  }

  get color() {
    return this.props.color;
  }

  get createdAt() {
    return this._createdAt;
  }
}
