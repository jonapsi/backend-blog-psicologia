import { z } from "zod";


export const BlogBaseSchema = z.object({
    id: z.string().uuid(),
    titulo: z.string().max(50, "Máximo 50 caracteres").nullable().optional(),
    description: z.string().max(200, "Máximo 200 caracteres").nullable().optional(),
    content: z.string().max(50000, "El contenido es demasiado grande").nullable().optional(),
    createdAt: z.date(),
    autorId: z.string().uuid({ version: "v4", message: "El ID del autor debe ser un UUID válido" }),
});



export const CreateBlogSchema = BlogBaseSchema.omit({
    id: true,
    createdAt: true
});

// Para el PUT/PATCH
export const UpdateBlogSchema = CreateBlogSchema.partial();

// Inferir los tipos para TypeScript
export type CreateBlogDTO = z.infer<typeof CreateBlogSchema>;
export type UpdateBlogDTO = z.infer<typeof UpdateBlogSchema>;