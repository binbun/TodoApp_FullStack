import express from 'express';

import { getAllUserProfiles, login, signup, getUserProfile } from '../controllers/users/index';

const route = express.Router();

//admin route
route.get('/admin/profiles', getAllUserProfiles);

//user route
route.post('/signup', signup);
route.post('/login', login);
route.get('/user/profiles', getUserProfile)

export default route;