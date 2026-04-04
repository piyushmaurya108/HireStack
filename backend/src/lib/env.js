import dotenv from 'dotenv'
dotenv.config({quiet: true});

const rawClientUrls = process.env.CLIENT_URLS || process.env.CLIENT_URL || "";
const clientUrls = rawClientUrls
  .split(",")
  .map((url) =>
    url
      .trim()
      .replace(/^['"]|['"]$/g, "")
      .replace(/\/$/, "")
  )
  .filter(Boolean);

export const ENV = {
  PORT: process.env.PORT,
  DB_URL: process.env.DB_URL,
  NODE_ENV: process.env.NODE_ENV,
  INNGEST_EVENT_KEY: process.env.INNGEST_EVENT_KEY,
  INNGEST_SIGNING_KEY: process.env.INNGEST_SIGNING_KEY,
  STREAM_API_KEY: process.env.STREAM_API_KEY,
  STREAM_API_SECRET: process.env.STREAM_API_SECRET,
  CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
  CLERK_PUBLISHABLE_KEY: process.env.CLERK_PUBLISHABLE_KEY,
  CLIENT_URL: process.env.CLIENT_URL,
  CLIENT_URLS: clientUrls,
};
