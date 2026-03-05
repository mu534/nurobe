import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { prisma } from "../lib/prisma.ts";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!;
const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:5000";

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: `${BACKEND_URL}/api/auth/google/callback`,
    },
    async (_accessToken, _refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value;
        const name = profile.displayName;
        const avatar = profile.photos?.[0]?.value ?? null;

        if (!email) return done(new Error("No email from Google"), undefined);

        let user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
          // Create new user
          user = await prisma.user.create({
            data: {
              name,
              email,
              password: "",
              role: "USER" as never,
              avatar,
            },
          });
        } else {
          user = await prisma.user.update({
            where: { email },
            data: { avatar },
          });
        }

        return done(null, {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          avatar: user.avatar,
        });
      } catch (err) {
        return done(err as Error, undefined);
      }
    },
  ),
);

export default passport;
