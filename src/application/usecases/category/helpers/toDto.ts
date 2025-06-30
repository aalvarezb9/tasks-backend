import { Category } from "../../../../domain/entities/Category";
import { CategoryDTO } from "../../../dtos/CategoryDTO";

export const toDTO = (c: Category): CategoryDTO => ({
    id: c.id.value,
    name: c.name,
    color: c.color,
    createdAt: c.createdAt.toISOString()
});