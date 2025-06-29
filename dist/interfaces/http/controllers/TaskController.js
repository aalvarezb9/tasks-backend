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
exports.TaskController = void 0;
const tsyringe_1 = require("tsyringe");
const CreateTaskUseCase_1 = require("../../../application/usecases/task/CreateTaskUseCase");
const UpdateTaskUseCase_1 = require("../../../application/usecases/task/UpdateTaskUseCase");
const DeleteTaskUseCase_1 = require("../../../application/usecases/task/DeleteTaskUseCase");
const GetTasksUseCase_1 = require("../../../application/usecases/task/GetTasksUseCase");
const CatchErrors_1 = require("../decorators/CatchErrors");
const RequireAuth_1 = require("../decorators/RequireAuth");
class TaskController {
    static async list(req, res) {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const result = await this.listUC.execute({ page, limit });
        res.json(result);
    }
    static async create(req, res) {
        const t = await this.createUC.execute(req.body);
        res.status(201).json(t);
    }
    static async update(req, res) {
        const t = await this.updateUC.execute({ id: req.params.id, ...req.body });
        res.json(t);
    }
    static async delete(req, res) {
        await this.deleteUC.execute({ id: req.params.id });
        res.status(204).send();
    }
}
exports.TaskController = TaskController;
TaskController.createUC = tsyringe_1.container.resolve(CreateTaskUseCase_1.CreateTaskUseCase);
TaskController.listUC = tsyringe_1.container.resolve(GetTasksUseCase_1.GetTasksUseCase);
TaskController.updateUC = tsyringe_1.container.resolve(UpdateTaskUseCase_1.UpdateTaskUseCase);
TaskController.deleteUC = tsyringe_1.container.resolve(DeleteTaskUseCase_1.DeleteTaskUseCase);
__decorate([
    CatchErrors_1.CatchErrors,
    RequireAuth_1.RequireAuth,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], TaskController, "list", null);
__decorate([
    CatchErrors_1.CatchErrors,
    RequireAuth_1.RequireAuth,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], TaskController, "create", null);
__decorate([
    CatchErrors_1.CatchErrors,
    RequireAuth_1.RequireAuth,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], TaskController, "update", null);
__decorate([
    CatchErrors_1.CatchErrors,
    RequireAuth_1.RequireAuth,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], TaskController, "delete", null);
