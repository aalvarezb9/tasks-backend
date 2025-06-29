"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserUseCase = void 0;
const tsyringe_1 = require("tsyringe");
const Email_1 = require("../../../domain/value-objects/Email");
const User_1 = require("../../../domain/entities/User");
let CreateUserUseCase = class CreateUserUseCase {
    constructor(repo) {
        this.repo = repo;
    }
    async execute(dto) {
        const email = Email_1.Email.create(dto.email);
        const existing = await this.repo.findByEmail(email);
        if (existing)
            return toDTO(existing);
        const user = await User_1.User.register(email, dto.password, { name: dto.name });
        await this.repo.save(user);
        return toDTO(user);
    }
};
exports.CreateUserUseCase = CreateUserUseCase;
exports.CreateUserUseCase = CreateUserUseCase = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)('UserRepository')),
    __metadata("design:paramtypes", [Object])
], CreateUserUseCase);
const toDTO = (u) => ({
    id: u.id.value,
    email: u.email.value,
    password: u.password().value(),
    name: u.name,
    createdAt: u.createdAt.toISOString(),
});
