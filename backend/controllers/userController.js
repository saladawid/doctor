import {User} from '../models/UserModel.js';
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import {ValidationError} from '../middleware/errorMiddleware.js';
import {generateToken} from '../utils/generateToken.js';


export const registerUser = asyncHandler(async (req, res, next) => {
    const {name, surname, email, password} = req.body;

    const user = await User.findOne({email});

    if (user) {
        res.status(409);
        throw new ValidationError('The user already exists in the database');
    }
    if (!email) {
        res.status(422);
        throw new ValidationError('Email is required');
    }
    if (password.length <= 4) {
        res.status(422);
        throw new ValidationError('Password is too short. Five characters required');
    }
    // const salt = await bcrypt.genSalt(10)
    // const hashPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
        name,
        surname,
        email,
        password,
    });

    await newUser.save();

    res.status(200).json(newUser);
});

export const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;

    const user = await User.findOne({email});

    if (!user) {
        res.status(401);
        throw new ValidationError('Invalid email or password');
    }

    const matchPassword = await bcrypt.compare(password, user.password);

    if (matchPassword) {
        res.json({
            email: user.email,
            name: user.name,
            surname: user.surname,
            token: generateToken(user._id),
        });
    } else {
        res.status(401);
        throw new ValidationError('Invalid email or password');
    }
});

export const getUser = asyncHandler(async (req, res) => {

    const user = await User.findById(req.user._id);

    if (user) {
        res.status(200).json({
            email: user.email,
            name: user.name,
            surname: user.surname,
        });
    } else {
        res.status(404);
        throw new ValidationError('User not found');
    }
});


export const updateUser = asyncHandler(async (req, res) => {

    const {name, surname, email, password} = req.body;


    const user = await User.findById(req.user._id);

    if (password) {
        if (password.length <= 4) {
            res.status(422);
            throw new ValidationError('Password is too short. Five characters required');
        }
    }

    if (user) {
        user.name = name;
        user.surname = surname;
        user.email = email;
        if (password) {
            user.password = password;
        }
        const updatedUser = await user.save();

        res.status(200).json({
            name: updatedUser.name,
            surname: updatedUser.surname,
            email: updatedUser.email,
        });
    } else {
        res.status(404);
        throw new ValidationError('Users not found');
    }
});