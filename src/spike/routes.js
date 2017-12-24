import express from 'express';

const PARENT_ROUTE = '/spike';
const router = express.Router();

router.get(
    '/',
    ( request, response ) => {
        response.render( 'spike/root.ejs', {
            session: request.session,
            title: 'Spike'
        } );
    }
);

router.get(
    '/login',
    ( request, response ) => {
        request.session.user = {
            id: '99',
            name: 'super cool guy'
        };
        response.redirect( `${PARENT_ROUTE}/` );
    }
);

router.get(
    '/logout',
    ( request, response ) => {
        request.session.user = null;
        delete request.session.user;
        response.redirect( `${PARENT_ROUTE}/` );
    }
);

export default router;
