const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const datasource = require('../models');

const db = datasource();

module.exports = () => {
    const { Accesses } = db.models;
    const opts = {};
    opts.secretOrKey = process.env.SECRET;
    opts.jwtFromRequest = ExtractJwt.fromAuthHeader();

    const strategy = new JwtStrategy(opts, (payload, done) => {
        Accesses.findOne({ where: { temp: payload.temp } })
            .then(Access => {
                if (Access) {
                    return done(null, {
                        key: Access.temp,
                    });
                }
                return done(null, false);
            })
            .catch(error => done(error, null));
    });

    passport.use(strategy);

    return {
        initialize: () => passport.initialize(),
        authenticate: () => passport.authenticate('jwt', {
            session: false,
            failureRedirect: '/error',
        }),
    };
};
