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
exports.UpdateCategoryUseCase = void 0;
const tsyringe_1 = require("tsyringe");
const CategoryId_1 = require("../../../domain/value-objects/CategoryId");
const toDto_1 = require("./helpers/toDto");
let UpdateCategoryUseCase = class UpdateCategoryUseCase {
    constructor(repo) {
        this.repo = repo;
    }
    async execute(cmd) {
        const cat = await this.repo.findById(CategoryId_1.CategoryId.from(cmd.id));
        if (!cat)
            throw new Error('Category not found');
        cat.update({ name: cmd.name, color: cmd.color });
        await this.repo.save(cat);
        return (0, toDto_1.toDTO)(cat);
    }
};
exports.UpdateCategoryUseCase = UpdateCategoryUseCase;
exports.UpdateCategoryUseCase = UpdateCategoryUseCase = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)('CategoryRepository')),
    __metadata("design:paramtypes", [Object])
], UpdateCategoryUseCase);
