import type { Request, Response } from 'express';
import { AppDataSource } from '../../../src/data-source.js';
import { Autores } from '../../../src/entity/autores.js';
import type { CreateAutorDTO, UpdateAutorDTO } from '../../../src/schemas/autor.schema.js'

const autorRepository = AppDataSource.getRepository(Autores);

export class AutorController {
    constructor() { }


    createAutor = async (req: Request, res: Response) => {
        try {
            const data: CreateAutorDTO = req.body;


            const nuevoAutor = autorRepository.create({
                nombre: data.nombre,
                apellido: data.apellido
            });

            // 2. Guardar en la base de datos (TypeORM generará el UUID y createdAt)
            const autorGuardado = await autorRepository.save(nuevoAutor);

            return res.status(201).json(autorGuardado);
        } catch (error) {
            console.error("Error al crear autor:", error);
            return res.status(500).json({ message: "Error interno del servidor" });
        }
    };

    // ==========================================
    // R E A D   (Todos)
    // ==========================================
    /* getAllAutores = async (req: Request, res: Response) => {
        try {
            // Buscamos todos los autores e incluimos los blogs relacionados
            const autores = await autorRepository.find({
                relations: ['blog'] // Trae el array de blogs de cada autor
            });

            return res.status(200).json(autores);
        } catch (error) {
            console.error("Error al obtener autores:", error);
            return res.status(500).json({ message: "Error interno del servidor" });
        }
    }; */
    getAllAutores = async (req: Request, res: Response) => {
        try {
            const autores = await autorRepository.createQueryBuilder("autores")
                .select([
                    "autores.id",
                    "autores.nombre",
                    "autores.apellido"
                ])
                .getMany();

            return res.status(200).json(autores);
        } catch (error) {
            console.error("Error al obtener autores:", error);
            return res.status(500).json({ message: "Error interno del servidor" });
        }
    };

    // ==========================================
    // U P D A T E
    // ==========================================
    updateAutor = async (req: Request, res: Response) => {
        try {
            const id = req.params.id as string;
            const data: UpdateAutorDTO = req.body;

            // 1. Buscar el autor existente
            const autorActual = await autorRepository.findOneBy({ id });
            if (!autorActual) {
                return res.status(404).json({ message: "Autor no encontrado" });
            }

            // 2. Preparar los datos a actualizar
            const updateData: any = {};
            if (data.nombre !== undefined) updateData.nombre = data.nombre;
            if (data.apellido !== undefined) updateData.apellido = data.apellido;

            // 3. Mezclar los datos nuevos con los existentes y guardar
            autorRepository.merge(autorActual, updateData);

            const autorActualizado = await autorRepository.save(autorActual);

            return res.status(200).json(autorActualizado);
        } catch (error) {
            console.error("Error al actualizar autor:", error);
            return res.status(500).json({ message: "Error interno del servidor" });
        }
    };

    // ==========================================
    // D E L E T E
    // ==========================================
    deleteAutor = async (req: Request, res: Response) => {
        try {
            const id = req.params.id as string;

            // 1. Buscar el autor
            const autor = await autorRepository.findOneBy({ id });
            if (!autor) {
                return res.status(404).json({ message: "Autor no encontrado" });
            }

            // 2. Eliminar
            await autorRepository.remove(autor);

            return res.status(204).send(); // 204 No Content
        } catch (error) {
            console.error("Error al eliminar autor:", error);
            return res.status(500).json({ message: "Error interno del servidor" });
        }
    };
}
