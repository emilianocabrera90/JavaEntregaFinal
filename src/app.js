
const express = require('express');
const app = express();

const path = require('path');


const exphbs = require('express-handlebars');


const productsRouter = require('./routes/products.router');
const cartsRouter = require('./routes/carts.router');
const viewsRouter = require('./routes/views.router');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(express.static(path.join(__dirname, '../public')));


app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, '../views'));


app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/', viewsRouter);   


app.get('/health', (req, res) => {
  res.send('🛒 API E‑commerce en funcionamiento');
});

module.exports = app;
