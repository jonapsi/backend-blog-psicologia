import type { Request, Response } from 'express';
import { AppDataSource } from '../../../src/data-source.js'
import { Blog } from '../../../src/entity/blog.js';
import { Autores } from '../../../src/entity/autores.js';
import type { CreateBlogDTO, UpdateBlogDTO } from '../../../src/schemas/articulo.schema.js'

// Obtenemos los repositorios de TypeORM
const blogRepository = AppDataSource.getRepository(Blog);
const autorRepository = AppDataSource.getRepository(Autores);

// C R E A T E
export class ArticulosController {
    constructor() { }
    createBlog = async (req: Request, res: Response) => {
        try {
            const data: CreateBlogDTO = req.body;

            // 1. Verificar que el autor exista antes de asignarlo
            const autorExiste = await autorRepository.findOneBy({ id: data.autorId });
            if (!autorExiste) {
                return res.status(404).json({ message: "El autor especificado no existe" });
            }

            // 2. Crear la instancia del blog (TypeORM vincula la relación con el objeto autor)
            const nuevoBlog = blogRepository.create({
                titulo: data.titulo ?? null,
                description: data.description ?? null,
                content: data.content ?? null,
                autor: autorExiste   // Relación @ManyToOne
            });

            // 3. Guardar en la base de datos (TypeORM generará el UUID y createdAt)
            const blogGuardado = await blogRepository.save(nuevoBlog);

            return res.status(201).json(blogGuardado);
        } catch (error) {
            console.error("Error al crear blog:", error);
            return res.status(500).json({ message: "Error interno del servidor" });
        }
    };

    getAllBlogs = async (req: Request, res: Response) => {
        try {
            // Buscamos todos los blogs e incluimos los datos del autor relacionado
            const blogs = await blogRepository.find({
                relations: ['autor']
            });

            return res.status(200).json(blogs);
        } catch (error) {
            return res.status(500).json({ message: "Error interno del servidor" });
        }
    };

    updateBlog = async (req: Request, res: Response) => {
        try {
            const id = req.params.id as string;
            const data: UpdateBlogDTO = req.body;

            // 1. Buscar el blog existente
            const blogActual = await blogRepository.findOneBy({ id });
            if (!blogActual) {
                return res.status(404).json({ message: "Blog no encontrado" });
            }

            // 2. Si están intentando actualizar el autorId, verificamos que el nuevo autor exista
            if (data.autorId) {
                const nuevoAutor = await autorRepository.findOneBy({ id: data.autorId });
                if (!nuevoAutor) {
                    return res.status(404).json({ message: "El nuevo autor especificado no existe" });
                }
                // Asignamos la nueva relación
                blogActual.autor = nuevoAutor;
            }

            // 3. Mezclar los datos nuevos con los existentes y guardar
            // merge() actualiza la entidad solo con los campos que vengan en 'data'
            const updateData: any = {};
            if (data.titulo !== undefined) updateData.titulo = data.titulo;
            if (data.description !== undefined) updateData.description = data.description;
            if (data.content !== undefined) updateData.content = data.content;
            //if ('author' in data) updateData.author = (data as any).author;

            blogRepository.merge(blogActual, updateData);

            const blogActualizado = await blogRepository.save(blogActual);

            return res.status(200).json(blogActualizado);
        } catch (error) {
            console.error("Error al actualizar blog:", error);
            return res.status(500).json({ message: "Error interno del servidor" });
        }
    };

    patchBlog = async (req: Request, res: Response) => {
        try {
            const id = req.params.id as string;
            const data: UpdateBlogDTO = req.body;

            // 1. Buscar el blog existente
            const blogActual = await blogRepository.findOneBy({ id });
            if (!blogActual) {
                return res.status(404).json({ message: "Blog no encontrado" });
            }

            // 2. Si están intentando actualizar el autorId, verificamos que el nuevo autor exista
            if (data.autorId) {
                const nuevoAutor = await autorRepository.findOneBy({ id: data.autorId });
                if (!nuevoAutor) {
                    return res.status(404).json({ message: "El nuevo autor especificado no existe" });
                }
                // Asignamos la nueva relación
                blogActual.autor = nuevoAutor;
            }

            // 3. Mezclar los datos nuevos con los existentes y guardar
            // merge() actualiza la entidad solo con los campos que vengan en 'data'
            const updateData: any = {};
            if (data.titulo !== undefined) updateData.titulo = data.titulo;
            if (data.description !== undefined) updateData.description = data.description;
            if (data.content !== undefined) updateData.content = data.content;
            //if ('author' in data) updateData.author = (data as any).author;

            blogRepository.merge(blogActual, updateData);

            const blogActualizado = await blogRepository.save(blogActual);

            return res.status(200).json(blogActualizado);
        } catch (error) {
            console.error("Error al actualizar blog:", error);
            return res.status(500).json({ message: "Error interno del servidor" });
        }
    };

    deleteBlog = async (req: Request, res: Response) => {
        try {
            const id = req.params.id as string;

            // 1. Buscar el blog
            const blog = await blogRepository.findOneBy({ id });
            if (!blog) {
                return res.status(404).json({ message: "Blog no encontrado" });
            }

            // 2. Eliminar
            await blogRepository.remove(blog);

            return res.status(204).send(); // 204 No Content es ideal para deletes exitosos
        } catch (error) {
            return res.status(500).json({ message: "Error interno del servidor" });
        }
    };

    getBlogById = async (req: Request, res: Response) => {
        try {
            const id = req.params.id as string;

            const blog = await blogRepository.findOne({
                where: { id },
                relations: ['autor']
            });

            if (!blog) {
                return res.status(404).json({ message: "Blog no encontrado" });
            }

            return res.status(200).json(blog);
        } catch (error) {
            return res.status(500).json({ message: "Error interno del servidor" });
        }
    };

}
/* export const createBlog = async (req: Request, res: Response) => {
    try {
        const data: CreateBlogDTO = req.body;

        // 1. Verificar que el autor exista antes de asignarlo
        const autorExiste = await autorRepository.findOneBy({ id: data.autorId });
        if (!autorExiste) {
            return res.status(404).json({ message: "El autor especificado no existe" });
        }

        // 2. Crear la instancia del blog (TypeORM vincula la relación con el objeto autor)
        const nuevoBlog = blogRepository.create({
            titulo: data.titulo ?? null,
            description: data.description ?? null,
            content: data.content ?? null,
            author: (data as any).author || 'Sin autor', // Campo varchar normal
            autor: autorExiste   // Relación @ManyToOne
        });

        // 3. Guardar en la base de datos (TypeORM generará el UUID y createdAt)
        const blogGuardado = await blogRepository.save(nuevoBlog);

        return res.status(201).json(blogGuardado);
    } catch (error) {
        console.error("Error al crear blog:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
}; */

// ==========================================
// R E A D   (Todos)
// ==========================================
/* export const getAllBlogs = async (req: Request, res: Response) => {
    try {
        // Buscamos todos los blogs e incluimos los datos del autor relacionado
        const blogs = await blogRepository.find({
            relations: ['autor']
        });

        return res.status(200).json(blogs);
    } catch (error) {
        return res.status(500).json({ message: "Error interno del servidor" });
    }
}; */

// ==========================================
// R E A D   (Por ID)
// ==========================================
/* export const getBlogById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;

        const blog = await blogRepository.findOne({
            where: { id },
            relations: ['autor']
        });

        if (!blog) {
            return res.status(404).json({ message: "Blog no encontrado" });
        }

        return res.status(200).json(blog);
    } catch (error) {
        return res.status(500).json({ message: "Error interno del servidor" });
    }
}; */

// ==========================================
// U P D A T E
// ==========================================
/* export const updateBlog = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;
        const data: UpdateBlogDTO = req.body;

        // 1. Buscar el blog existente
        const blogActual = await blogRepository.findOneBy({ id });
        if (!blogActual) {
            return res.status(404).json({ message: "Blog no encontrado" });
        }

        // 2. Si están intentando actualizar el autorId, verificamos que el nuevo autor exista
        if (data.autorId) {
            const nuevoAutor = await autorRepository.findOneBy({ id: data.autorId });
            if (!nuevoAutor) {
                return res.status(404).json({ message: "El nuevo autor especificado no existe" });
            }
            // Asignamos la nueva relación
            blogActual.autor = nuevoAutor;
        }

        // 3. Mezclar los datos nuevos con los existentes y guardar
        // merge() actualiza la entidad solo con los campos que vengan en 'data'
        const updateData: any = {};
        if (data.titulo !== undefined) updateData.titulo = data.titulo;
        if (data.description !== undefined) updateData.description = data.description;
        if (data.content !== undefined) updateData.content = data.content;
        if ('author' in data) updateData.author = (data as any).author;

        blogRepository.merge(blogActual, updateData);

        const blogActualizado = await blogRepository.save(blogActual);

        return res.status(200).json(blogActualizado);
    } catch (error) {
        console.error("Error al actualizar blog:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
}; */

// ==========================================
// D E L E T E
// ==========================================
/* export const deleteBlog = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;

        const blog = await blogRepository.findOneBy({ id });
        if (!blog) {
            return res.status(404).json({ message: "Blog no encontrado" });
        }

        // Eliminamos el registro
        await blogRepository.remove(blog);

        // 204 significa "No Content" (se procesó con éxito pero no se devuelve cuerpo en la respuesta)
        return res.status(204).send();
    } catch (error) {
        return res.status(500).json({ message: "Error interno del servidor" });
    }
}; */