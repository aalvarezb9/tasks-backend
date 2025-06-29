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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const tsyringe_1 = require("tsyringe");
const CreateUserUseCase_1 = require("../../../application/usecases/user/CreateUserUseCase");
const FindUserUseCase_1 = require("../../../application/usecases/user/FindUserUseCase");
const CatchErrors_1 = require("../decorators/CatchErrors");
const RequireAuth_1 = require("../decorators/RequireAuth");
class UserController {
    static async create(req, res) {
        const u = await this.createUC.execute(req.body);
        res.status(201).json(u);
    }
    static async find(req, res) {
        const u = await this.findUC.execute({ email: req.query.email });
        if (!u)
            return res.status(404).json({ message: 'User not found' });
        res.json(u);
    }
}
exports.UserController = UserController;
UserController.createUC = tsyringe_1.container.resolve(CreateUserUseCase_1.CreateUserUseCase);
UserController.findUC = tsyringe_1.container.resolve(FindUserUseCase_1.FindUserUseCase);
__decorate([
    CatchErrors_1.CatchErrors,
    RequireAuth_1.RequireAuth,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController, "create", null);
__decorate([
    CatchErrors_1.CatchErrors,
    RequireAuth_1.RequireAuth,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController, "find", null);
