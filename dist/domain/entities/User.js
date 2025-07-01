"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const UserId_1 = require("../value-objects/UserId");
const Email_1 = require("../value-objects/Email");
const Password_1 = require("../value-objects/Password");
class User {
    constructor(id, email, _password, props, _createdAt) {
        this.id = id;
        this.email = email;
        this._password = _password;
        this.props = props;
        this._createdAt = _createdAt;
    }
    static async register(email, plainPassword, props) {
        const hashed = await Password_1.Password.hash(plainPassword);
        return new User(UserId_1.UserId.create(), email, hashed, props, new Date());
    }
    static hydrate(id, email, hashed, props, createdAt) {
        return new User(UserId_1.UserId.from(id), Email_1.Email.create(email), Password_1.Password.fromHashed(hashed), props, typeof createdAt === 'string' ? new Date(createdAt) : createdAt);
    }
    password() {
        return this._password;
    }
    checkPassword(plain) {
        return this._password.compare(plain);
    }
    get name() {
        return this.props.name;
    }
    get createdAt() {
        return this._createdAt;
    }
}
exports.User = User;
