import { Request, Response, NextFunction } from "express";
import { knex } from "@/database/knex";
import { z } from "zod"

class StudentController {
    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const search = String(req.query.search || '').trim()

            let query = knex("students")
                .select()
                //.where({ is_deleted: false })
                .orderBy("name", "asc")

            if (search) {
                const searchNum = parseInt(search, 10)
                const hasNum = !isNaN(searchNum)

                query = query.andWhere((qb) => {
                    qb.whereILike("name", `%${search}%`)
                        .orWhereILike("email", `%${search}%`)
                    if(hasNum) {
                        qb.orWhere("academic_record", searchNum)
                    }            
                })
            }

            const students = await query

            return res.json({ results: students })
        } catch(error) {
            next(error)
        }
    }

    async getByExternalId(req: Request, res: Response, next: NextFunction) {
        try {
            const externalId = z
                .string()
                .parse(req.params.externalId)

            const student = await knex("students")
                .select()
                .where({ externalId })
                .first()

            return res.json({ results: student })
        } catch(error) {
            next(error)
        }
    }

    async register(req: Request, res: Response, next: NextFunction) {
        try {
            const bodySchema = z.object({
                academic_record: z.int().gt(0).min(6),
                name: z.string().trim().min(6),
                email: z.email(),
                document: z.int().min(10000000000).max(99999999999)
            }).strict()

            const { academic_record, name, email, document } = bodySchema.parse(req.body)

            await knex("students").insert({ academic_record, name, email, document })

            return res.status(201).json()
        } catch(error) {
            next(error)
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const externalId = z
                .string()
                .parse(req.params.externalId)

            const bodySchema = z.object({
                name: z.string().trim().min(6).optional(),
                email: z.email().optional()
            }).strict()

            const updateStudent = bodySchema.parse(req.body)

            const student = await knex("students")
                .select()
                .where({ externalId })
                .first()

            if(!student) {
                throw new Error("Student not found")
            }
            
            await knex("students")
                .update({ ...updateStudent, updated_at: knex.fn.now() })
                .where({ externalId })

            return res.status(204).json()
        } catch(error) {
            next(error)
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const externalId = z
                .string()
                .parse(req.params.externalId)

            const student = await knex("students")
                .select()
                .where({ externalId })
                .first()

            if(student.is_deleted){
                throw new Error("Student already deleted!")
            }

            if(!student) {
                throw new Error("Student not found!")
            }

            await knex("students")
                .update({ is_deleted: true, deleted_at: knex.fn.now() })
                .where({ externalId })

            return res.json()
        } catch(error) {
            next(error)
        }
    }
}

export { StudentController }