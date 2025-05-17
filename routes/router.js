import { Router } from "express";
import * as userController from '../controllers/userController.js';
import * as authController from '../controllers/authController.js';
import * as noteController from '../controllers/noteController.js';
import { catchErrors } from "../handlers/errorHandlers.js";

export const router = Router();

// User routes
router.get('/register', userController.registerForm);
router.post('/register',
  userController.validateRegister,
  catchErrors(userController.register),
  authController.login
);
router.get('/login', userController.loginForm);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

// Note routes - all protected by authentication
router.get('/', authController.isLoggedIn, catchErrors(noteController.getNotes));
router.get('/notes', authController.isLoggedIn, catchErrors(noteController.getNotes));
router.get('/notes/add', authController.isLoggedIn, noteController.addNote);
router.post('/notes/add', 
  authController.isLoggedIn,
  catchErrors(noteController.createNote)
);
router.get('/notes/:id/edit', 
  authController.isLoggedIn,
  catchErrors(noteController.editNote)
);
router.post('/notes/:id/edit',
  authController.isLoggedIn,
  catchErrors(noteController.updateNote)
);
router.get('/notes/:id/delete',
  authController.isLoggedIn,
  catchErrors(noteController.deleteNote)
);