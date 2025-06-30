"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
const CategoryId_1 = require("../value-objects/CategoryId");
class Category {
    constructor(id, props, _createdAt) {
        this.id = id;
        this.props = props;
        this._createdAt = _createdAt;
    }
    static create(props) {
        return new Category(CategoryId_1.CategoryId.create(), props, new Date());
    }
    update(props) {
        this.props = { ...this.props, ...props };
    }
    get name() { return this.props.name; }
    get color() { return this.props.color; }
    get createdAt() { return this._createdAt; }
}
exports.Category = Category;
