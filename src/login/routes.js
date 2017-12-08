import express from 'express';
import passport from 'passport';

const router = express.Router();

const auth0 = {
    domain: 'ickyzoo.auth0.com',
    clientID: 'JoVzWhQOwQwIkialwg6uY5GfOAhfdI_A',
    callbackURL: 'http://calypso.sword:5426/login/auth-complete'
};

// Handle login
router.get(
    '/',
    passport.authenticate( 'auth0', {
        clientID: auth0.clientID,
        domain: auth0.domain,
        redirectUri: auth0.callbackURL,
        audience: `https://${auth0.domain}/userinfo`,
        responseType: 'code',
        scope: 'openid'
    } ),
    ( request, response ) => {
        response.redirect( '/' );
    }
);

// Perform session logout and redirect to homepage
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

// Perform the final stage of authentication and redirect to '/user'
router.get(
    '/auth-complete',
    passport.authenticate('auth0', {
        failureRedirect: '/'
    }),
    function(req, res) {
        res.redirect(req.session.returnTo || '/user');
    }
);

export default router;
