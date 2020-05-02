import mongoose from "mongoose";

export const setup = (url, options = {}) => {
  const defaultOpt = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
    reconnectInterval: 100, // Reconnect every 100ms
    ...options
  };
  mongoose.connect(url, defaultOpt);
  mongoose.connection.on("error", err => {
    console.log(err);
  });
};
