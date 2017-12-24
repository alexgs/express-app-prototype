import express from 'express';
import ms from 'ms';

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
        response.cookie( 'user', JSON.stringify( {
            id: '99',
            name: 'super cool guy'
        } ), {
            encode: string => string,
            httpOnly: true,
            maxAge: ms( '90d' ),
            sameSite: true,
            secure: true
        } );
        response.redirect( `${PARENT_ROUTE}/` );
    }
);

router.get(
    '/logout',
    ( request, response ) => {
        // request.session.user = null;
        // delete request.session.user;
        // response.clearCookie( 'session-id' );
        // request.session.destroy( () => response.redirect( `${PARENT_ROUTE}/` ) );
        response.clearCookie( 'user' );
        response.redirect( `${PARENT_ROUTE}/` );
    }
);

export default router;
