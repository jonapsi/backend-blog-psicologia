import { z } from "zod";


export const AutorBaseSchema = z.object({
    id: z.string().uuid(),
    nombre: z.string().min(1, "El nombre es requerido").max(50, "Máximo 50 caracteres"),
    apellido: z.string().min(1, "El apellido es requerido").max(50, "Máximo 50 caracteres"),
    createdAt: z.date(),
});

// Para el POST: Omitimos id y createdAt porque TypeORM los genera
export const CreateAutorSchema = AutorBaseSchema.omit({
    id: true,
    createdAt: true
});

// Para el PUT/PATCH: Todos los campos son opcionales
export const UpdateAutorSchema = CreateAutorSchema.partial();

// Inferir los tipos para TypeScript
export type CreateAutorDTO = z.infer<typeof CreateAutorSchema>;
export type UpdateAutorDTO = z.infer<typeof UpdateAutorSchema>;