/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./configs/schema.js",
    dialect: 'postgresql',
    dbCredentials: {
      url: 'postgresql://aividgen_owner:bnfVv4rMaw0E@ep-purple-rain-a56fyiwi.us-east-2.aws.neon.tech/aividgen?sslmode=require'
    }
  };