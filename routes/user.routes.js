// Importation EXpress
const router = require('express').Router();

// Importation de la route auth
const authController = require('../controllers/auth.controller');

// Importation de la route user
const userController = require('../controllers/user.controller')

// Importation de la route upload
const uploadController = require('../controllers/upload.controller');

// Importation de multer
const multer = require("multer");
const upload = multer();


// route auth
router.post('/register', authController.signUp);
router.post('/login', authController.signIn);
router.get('/logout', authController.logout);

// route getAllUsers
router.get('/', userController.getAllUsers);

// route getOneUser
router.get('/:id', userController.getOneUser);

// route updateUser
router.put("/:id", userController.updateUser);

// Route delete
router.delete('/:id', userController.deleteUser);

// route Follower
router.patch('/follow/:id', userController.follow);   // fonction pour mettre le tableau utilisateur a jour

// route unfollower
router.patch('/unfollow/:id', userController.unfollow);   // fonction pour mettre le tableau utilisateur a jour

// upload
router.post("/upload", upload.single("file"), uploadController.uploadProfil);


// Exportation de router
module.exports = router;