require('dotenv').config();
require('express-async-errors');

const express = require('express');

const connectDB = require('./configs/connect-db.configs');
const notFoundHandle = require('./middleware/notfound.middleware');
const errorHandler = require('./middleware/errhandler.middleware');
const cookieParser = require('cookie-parser');

const userRouters = require('./routes/user.routes')
const indexRouters = require('./routes/index.routes')

const app = express();

connectDB();

//json
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//view
app.set('views', './src/views');
app.set('view engine', 'ejs');

//cookie
app.use(cookieParser());

//routes
app.use('/', indexRouters);
app.use('/user', userRouters);

//middleware
app.use(notFoundHandle);
app.use(errorHandler)

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`App is listening on port: ${PORT}`);
})













