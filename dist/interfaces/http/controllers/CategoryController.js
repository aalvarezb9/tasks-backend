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
exports.CategoryController = void 0;
const tsyringe_1 = require("tsyringe");
const CreateCategoryUseCase_1 = require("../../../application/usecases/category/CreateCategoryUseCase");
const UpdateCategoryUseCase_1 = require("../../../application/usecases/category/UpdateCategoryUseCase");
const CatchErrors_1 = require("../decorators/CatchErrors");
const RequireAuth_1 = require("../decorators/RequireAuth");
const ListCategoryUseCase_1 = require("../../../application/usecases/category/ListCategoryUseCase");
class CategoryController {
    static async list(_req, res) {
        const cats = await this.listUC.execute();
        res.json(cats);
    }
    static async create(req, res) {
        const c = await this.createUC.execute(req.body);
        res.status(201).json(c);
    }
    static async update(req, res) {
        const c = await this.updateUC.execute({ id: req.params.id, ...req.body });
        res.json(c);
    }
}
exports.CategoryController = CategoryController;
CategoryController.listUC = tsyringe_1.container.resolve(ListCategoryUseCase_1.ListCategoriesUseCase);
CategoryController.createUC = tsyringe_1.container.resolve(CreateCategoryUseCase_1.CreateCategoryUseCase);
CategoryController.updateUC = tsyringe_1.container.resolve(UpdateCategoryUseCase_1.UpdateCategoryUseCase);
__decorate([
    CatchErrors_1.CatchErrors,
    RequireAuth_1.RequireAuth,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CategoryController, "list", null);
__decorate([
    CatchErrors_1.CatchErrors,
    RequireAuth_1.RequireAuth,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CategoryController, "create", null);
__decorate([
    CatchErrors_1.CatchErrors,
    RequireAuth_1.RequireAuth,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CategoryController, "update", null);
