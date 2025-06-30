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
exports.GetTasksUseCase = void 0;
const tsyringe_1 = require("tsyringe");
let GetTasksUseCase = class GetTasksUseCase {
    constructor(repo) {
        this.repo = repo;
    }
    async execute(query = {}) {
        const page = query.page && query.page > 0 ? query.page : 1;
        const limit = query.limit && query.limit > 0 ? query.limit : 10;
        const { tasks, total } = await this.repo.findAll({ page, limit });
        return {
            tasks: tasks.map((t) => ({
                id: t.id.value,
                title: t.title,
                description: t.description,
                categoryId: t.categoryId,
                status: t.status,
                createdAt: t.createdAt.toISOString(),
                updatedAt: t.updatedAt.toISOString(),
            })),
            total,
            page,
            limit,
        };
    }
};
exports.GetTasksUseCase = GetTasksUseCase;
exports.GetTasksUseCase = GetTasksUseCase = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)('TaskRepository')),
    __metadata("design:paramtypes", [Object])
], GetTasksUseCase);
