import express from 'express';
import {
    createPatient,
    updatePatient,
    deletePatient,
    getPatient,
    getPatients,
    saveTestPatient,
    getTestPatient,
} from '../controllers/patientController.js';

export const patientRoutes = express.Router();

//GET ALL
patientRoutes.get("/", getPatients);
//GET
patientRoutes.get("/:id", getPatient);
//CREATE
patientRoutes.post("/", createPatient);
//UPDATE
patientRoutes.put("/:id", updatePatient);
//DELETE
patientRoutes.delete("/:id", deletePatient);


//SAVE TEST PATIENT
patientRoutes.post("/:id/test", saveTestPatient);
//GET TEST PATIENT
patientRoutes.get("/:id/test", getTestPatient);