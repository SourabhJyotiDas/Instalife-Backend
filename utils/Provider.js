import { Strategy as GoogleStrategy } from "passport-google-oauth20"
import passport from "passport";
import User from "../models/User.js";

export const connectPassport = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: "915692287850-pcee4mbb0sfigrnb1mjikjnf0gik91ht.apps.googleusercontent.com",
        clientSecret: "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",
        callbackURL: "http://localhost:5000/api/v1/login"
        //  callbackURL: "https://google-auth2-0.vercel.app/api/v1/login",
      },
      async function (accessToken, refreshToken, profile, done) {

        const user = await User.findOne({
          googleId: profile.id,
        });

        if (!user) {
          const newUser = await User.create({
            googleId: profile.id,
            name: profile.displayName,
            email: `${profile.name && profile.name.familyName}${profile.name && profile.name.givenName}@gmail.com`,
            password: "qwertyuiop",
            avatar: { public_id: "myCloud.public_id", url: profile.photos[0].value },

          });
          return done(null, newUser);
        } else {
          return done(null, user);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
  });
};


