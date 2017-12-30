import express from 'express';
import fs from 'fs';
import glados from '@philgs/glados';
import path from 'path';

const auth0PublicKey = fs.readFileSync( path.resolve( __dirname, '../../config/ickyzoo-auth0-com.pem' ) );
const PARENT_ROUTE = '/glados';
const router = express.Router();

router.get(
    '/login',
    glados.startOAuth2(),
    glados.getDummyHandler()
);

router.get(
    '/callback',
    glados.completeOAuth2( auth0PublicKey ),
    // ( request, response ) => response.redirect( request.session.returnTo || `${PARENT_ROUTE}/user` )
    ( request, response ) => response.redirect( `${PARENT_ROUTE}/user` )
);

router.get(
    '/user',
    // glados.ensureAuthenticated(),
    ( request, response ) => response.render( 'user-details.ejs', {
        userObject: JSON.stringify( request.cookies.glados, null, 4 )
    } )
);

router.get(
    '/logout',
    glados.logout(),
    ( request, response ) => response.redirect( '/logout-successful' )
);

export default router;
