"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
const TaskId_1 = require("../value-objects/TaskId");
const TaskCreated_1 = require("../events/TaskCreated");
class Task {
    constructor(id, props, _status, _createdAt, _updatedAt) {
        this.id = id;
        this.props = props;
        this._status = _status;
        this._createdAt = _createdAt;
        this._updatedAt = _updatedAt;
        this._events = [];
    }
    static create(p) {
        const t = new Task(TaskId_1.TaskId.create(), p, 'pending', new Date(), new Date());
        t.addEvent(new TaskCreated_1.TaskCreated(t.id));
        return t;
    }
    update(f) {
        this.props = { ...this.props, ...f };
        if (f.status)
            this._status = f.status;
        this._updatedAt = new Date();
    }
    get title() {
        return this.props.title;
    }
    get description() {
        return this.props.description;
    }
    get categoryId() {
        return this.props.categoryId;
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
    addEvent(e) {
        this._events.push(e);
    }
    pullEvents() {
        const ev = this._events;
        this._events = [];
        return ev;
    }
    static hydrate(id, props, status, createdAt, updatedAt) {
        return new Task(TaskId_1.TaskId.from(id), props, status, typeof createdAt === 'string' ? new Date(createdAt) : createdAt, typeof updatedAt === 'string' ? new Date(updatedAt) : updatedAt);
    }
}
exports.Task = Task;
