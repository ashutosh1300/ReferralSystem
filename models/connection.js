// mongoose.connect('mongodb://localhost/referral-system', { useNewUrlParser: true });
// const db = mongoose.connection;
// db.on('error', error => console.error(error));
// db.once('open', () => console.log('Connected to MongoDB'));

import mongoose from 'mongoose';
var url="mongodb://127.0.0.1:27017/EspSolution";
mongoose.connect(url);
console.log("Successfully connected to mongodb database");