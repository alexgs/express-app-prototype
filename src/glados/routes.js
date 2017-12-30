import express from 'express';

import GladosFactory from '@philgs/glados';

const glados = GladosFactory.create();
const router = express.Router();

router.get(
    '/login',
    glados.startOAuth2(),
    glados.getDummyHandler()
);

router.get(
    '/callback',
    glados.completeOAuth2(),
    ( request, response ) => response.redirect( request.session.returnTo || '/user' )
);

router.get(
    '/user',
    glados.ensureAuthenticated(),
    ( request, response ) => response.render( 'user-details.ejs' )
);

router.get(
    '/logout',
    glados.logout(),
    ( request, response ) => response.redirect( '/logout-successful' )
);

export default router;
