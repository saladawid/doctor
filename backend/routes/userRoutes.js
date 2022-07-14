import express from 'express';
import {getUser, loginUser, registerUser, updateUser} from '../controllers/userController.js';
import {protect} from '../middleware/authMiddleware.js';


export const userRoutes = express.Router();

//REGISTER USER
userRoutes.post("/", registerUser);
//LOGIN USER
userRoutes.post("/login", loginUser);
//GET USER
userRoutes.get("/profile", protect, getUser);
//UPDATE
userRoutes.put("/profile",protect, updateUser);



// //DELETE
// patientRoutes.delete("/:id", deleteUser);

// //GET USERS
// userRoutes.get("/", protect, getUsers);