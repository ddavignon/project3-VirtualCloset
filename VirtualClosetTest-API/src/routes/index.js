import express from 'express';
import config from '../config';
import middleware from '../middleware';
import initializeDb from '../db';
import virtual_closet from '../controller/virtual_closet';

let router = express();

// connect to db
initializeDb(db => {

    // internal middleware
    router.use(middleware({ config, db }));

    // api routes v1 (/v1)
    router.use('/closet', virtual_closet({ config, db }))
})

export default router;
