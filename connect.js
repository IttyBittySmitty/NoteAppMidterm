import mongoose from "mongoose";

export const connect = (url) => mongoose.connect(url); // to be imported in index.js
