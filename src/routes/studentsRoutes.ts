import { StudentController } from "@/controllers/studentsController";
import { Router, Request, Response, NextFunction } from "express";

const studentsRoutes = Router()
const studentsController = new StudentController

studentsRoutes.get("/", studentsController.getAll)
studentsRoutes.get("/:externalId", studentsController.getByExternalId)
studentsRoutes.post("/", studentsController.register)
studentsRoutes.patch("/:externalId", studentsController.update)
studentsRoutes.delete("/:externalId", studentsController.delete)

export { studentsRoutes }