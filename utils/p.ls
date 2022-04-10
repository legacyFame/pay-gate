import cookieParser from 'cookie-parser'
import session from 'express-session'
import passport from 'passport'
import  {Strategy as JWTStrategy,ExtractJWT} from 'passport-jwt'
import jwt from 'jsonwebtoken'
import { User} from '../models'

// const { JWTStrategy   } = pkg;
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = procees.env.JWT
opts.issuer = 'repl.com/Hiro';
opts.audience = 'paygate.surge.sh';

const Passport = app => {
  
  passport.use(
    new JWTStrategy(opts,(token, done) => {
      User.findOne({ id: token.id })
        .then( user=> {
        if (!user) return done(null, false)
        return done(null, user))
      })
        .catch(err => {
          console.error(err)
          return done(null, false, err)
        })
    })
    //   User.findByPk(name)
    //     .then(user => {
    //       if (!user) new Error('User does not exist')
    //       return user
    //     })
    //     .then(user => {
    //       if (user.validatePassword(password)) {
    //         return done(null, user)
    //       } else new Error('Password not correct')
    //     })
    //     .catch(err => {
    //       res.status(500).json(err)
    //       console.error(err)
    //       return done(null, false, err)
    //     })
    // }),
  )

  app.use(
    session({
      secret: process.env.JWT,
      resave: false,
      saveUninitialized: false,
      // automatically extends the session age on each request. useful if you want
      // the user activity to extend their session. If you want an absolute session
      // expiration, set to false
      rolling: true,
      name: 'order',
      cookie: {
        httpOnly: true,
        maxAge: 20 * 60 * 1000,
        // domain:
      },
    }),
  )
  // app.use(
  //   passport.authenticate('local', {
  //     successRedirect: '/',
  //     failureRedirect: '/login',
  //     failureFlash: true,
  //   }),
  // )

  app.use(passport.authenticate('bearer', { 
    session: true 
  }))

  app.use(passport.initialize())
  app.use(passport.session())
}

export default Passport
