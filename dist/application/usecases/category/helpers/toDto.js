"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toDTO = void 0;
const toDTO = (c) => ({
    id: c.id.value,
    name: c.name,
    color: c.color,
    createdAt: c.createdAt.toISOString()
});
exports.toDTO = toDTO;
