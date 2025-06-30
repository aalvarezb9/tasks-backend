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
exports.UpdateTaskUseCase = void 0;
const tsyringe_1 = require("tsyringe");
const TaskId_1 = require("../../../domain/value-objects/TaskId");
let UpdateTaskUseCase = class UpdateTaskUseCase {
    constructor(repo) {
        this.repo = repo;
    }
    async execute(cmd) {
        const task = await this.repo.findById(TaskId_1.TaskId.from(cmd.id));
        if (!task)
            throw new Error('Task not found');
        task.update(cmd);
        await this.repo.save(task);
        return {
            id: task.id.value,
            title: task.title,
            description: task.description,
            categoryId: task.categoryId,
            status: task.status,
            userId: task.userId,
            createdAt: task.createdAt.toISOString(),
            updatedAt: task.updatedAt.toISOString(),
        };
    }
};
exports.UpdateTaskUseCase = UpdateTaskUseCase;
exports.UpdateTaskUseCase = UpdateTaskUseCase = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)('TaskRepository')),
    __metadata("design:paramtypes", [Object])
], UpdateTaskUseCase);
