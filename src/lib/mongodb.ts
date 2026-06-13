import mongoose from "mongoose";


declare global {
  var mongooseConn: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
}

global.mongooseConn ||= {
  conn: null,
  promise: null,
};

export async function connectDB() {
  if (global.mongooseConn.conn) {
    return global.mongooseConn.conn;
  }

  const MONGODB_URI = process.env.MONGODB_URI;
  if (!MONGODB_URI) {
    throw new Error("MONGODB_URI is missing");
  }

  if (!global.mongooseConn.promise) {
    global.mongooseConn.promise = mongoose.connect(MONGODB_URI);
  }

  global.mongooseConn.conn = await global.mongooseConn.promise;

  return global.mongooseConn.conn;
}
