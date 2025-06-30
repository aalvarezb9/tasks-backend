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
exports.ListCategoriesUseCase = void 0;
const tsyringe_1 = require("tsyringe");
let ListCategoriesUseCase = class ListCategoriesUseCase {
    constructor(repo) {
        this.repo = repo;
    }
    async execute(p = {}) {
        const page = p.page && p.page > 0 ? p.page : 1;
        const limit = p.limit && p.limit > 0 ? p.limit : 10;
        const { categories, total } = await this.repo.findAll({ page, limit });
        return {
            categories: categories.map((c) => ({
                id: c.id.value,
                name: c.name,
                color: c.color,
                createdAt: c.createdAt.toISOString(),
            })),
            total,
            page,
            limit,
        };
    }
};
exports.ListCategoriesUseCase = ListCategoriesUseCase;
exports.ListCategoriesUseCase = ListCategoriesUseCase = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)('CategoryRepository')),
    __metadata("design:paramtypes", [Object])
], ListCategoriesUseCase);
