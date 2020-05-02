var wget = require('node-wget');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var fs = require('fs-js');
var app = express();
var debug =0;
var actualizaciones = 0;

//Function that downloads the XMl and renames it to the current public directory to bypass CORS
function xml (){
    wget({
            url:  'http://www.bne.es/media/datosgob/dibi/bibliotecas.xml',
            dest: 'biblio.xml',      // destination path or path with filenname, default is ./
            timeout: 2000       // duration to wait for request fulfillment in milliseconds, default is 2 seconds
        },
        function (error, response, body) {
            if (error) {
                console.log('--- headers:');
                console.log(response.headers); // response headers
                console.log('--- body:');
                console.log(body);             // content of package
                console.log('--- error:');
                console.log(error);            // error encountered
            }
/*            if (debug=1) {
                console.log('--- headers:');
                console.log(response.headers); // response headers
                console.log('--- body:');
                console.log(body);             // content of package
                console.log("Actualizado");
            }*/ else{
                console.log("Actualizado " + actualizaciones);
                rename();
                actualizaciones++;
            }
        }
    );
};
function rename (){
    fs.rename('biblio.xml', 'C:\\Users\\Rudiger\\WebstormProjects\\Nazi-CORS\\public\\biblio.xml', (err) => {
        if (err) throw err;
        console.log('renamed complete');
    });
};
//TIEMPO DE ACTUALIACION BAJAR PARA MAS FRECUENCIA
setInterval(xml, 6000);
//TIEMPO DE ACTUALIZACION

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;