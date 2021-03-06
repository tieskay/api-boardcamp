import { Router } from "express";
import { addRental, deleteRental, getMetrics, getRentals, returnRental } from "../controllers/rentalsController.js";
import { validateRentalSchemaData } from "../middlewares/validateRentalSchemaData.js";
import { validateRentalStatus } from "../middlewares/validateRentalStatus.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import rentalSchema from "../schemas/rentalSchema.js";

const rentalsRouter = Router();

rentalsRouter.get("/rentals", getRentals);
rentalsRouter.get("/rentals/metrics", getMetrics);
rentalsRouter.post("/rentals", validateSchema(rentalSchema), validateRentalSchemaData, addRental);
rentalsRouter.post("/rentals/:id/return", validateRentalStatus, returnRental);
rentalsRouter.delete("/rentals/:id", validateRentalStatus, deleteRental);

export default rentalsRouter;
