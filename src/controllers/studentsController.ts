import { Request, Response, NextFunction } from "express";

class StudentController {
    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            return res.json("Requisição GET")
        } catch(error) {
            next(error)
        }
    }

    async getByExternalId(req: Request, res: Response, next: NextFunction) {
        try {
            return res.json("Requisição GET by ID")
        } catch(error) {
            next(error)
        }
    }

    async register(req: Request, res: Response, next: NextFunction) {
        try {
            return res.json("Requisição POST")
        } catch(error) {
            next(error)
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            return res.json("Requisição PATCH")
        } catch(error) {
            next(error)
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            return res.json("Requisição DELETE")
        } catch(error) {
            next(error)
        }
    }
}

export { StudentController }