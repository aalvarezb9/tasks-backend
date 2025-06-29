import { TaskId } from '../value-objects/TaskId';
import { TaskCreated } from '../events/TaskCreated';

export type TaskStatus = 'pending' | 'in-progress' | 'completed';

export interface TaskProps {
  title: string;
  description?: string;
  category?: string;
}

export class Task {
  private _events: any[] = [];
  private constructor(
    public readonly id: TaskId,
    private props: TaskProps,
    private _status: TaskStatus,
    private _createdAt: Date,
    private _updatedAt: Date
  ) {}

  static create(p: TaskProps): Task {
    const t = new Task(TaskId.create(), p, 'pending', new Date(), new Date());
    t.addEvent(new TaskCreated(t.id));
    return t;
  }

  update(f: Partial<TaskProps & { status: TaskStatus }>) {
    this.props = { ...this.props, ...f };
    if (f.status) this._status = f.status;
    this._updatedAt = new Date();
  }

  get title() {
    return this.props.title;
  }

  get description() {
    return this.props.description;
  }

  get category() {
    return this.props.category;
  }

  get status() {
    return this._status;
  }

  get createdAt() {
    return this._createdAt;
  }

  get updatedAt() {
    return this._updatedAt;
  }

  private addEvent(e: any) {
    this._events.push(e);
  }

  pullEvents() {
    const ev = this._events;
    this._events = [];
    return ev;
  }
}
