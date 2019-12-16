let express = require('express')
let bodyParser = require('body-parser')
let morgan = require('morgan')
let pg = require('pg')
let app = express()
let fs = require('fs')
const PORT = 1777;

let config = fs.readFileSync('database/settings.json');
config = (JSON.parse(config)).database
let pool = new pg.Pool(config)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended:true }))
app.use(morgan('dev'))
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*") // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})

app.listen(PORT, () => console.log('Listening on port ' + PORT))

let get_tamanho = 'SELECT * FROM tamanho;';
let get_marca = 'SELECT * FROM marca;';
let get_tipo = 'SELECT * FROM tipo;';
let get_bateria = 'SELECT * FROM bateria;';
let get_sensores =
  'SELECT id_sensor, ultima_medida, localizacao, largura,' +
  'altura, comprimento, nm_marca, nm_tipo, tensao ' +
  'FROM sensor ' +
  'NATURAL JOIN tamanho ' +
  'NATURAL JOIN marca ' +
  'NATURAL JOIN tipo ' +
  'NATURAL JOIN bateria;'
;
let new_sensor =
  'INSERT INTO sensor (localizacao, ultima_medida,' +
  'id_tamanho, id_tipo, id_marca, id_bateria) ' +
  'VALUES($1, $2, $3, $4, $5, $6);'
;
let delete_sensor =  'DELETE FROM sensor WHERE id_sensor = $1;';

app.get(['/', '/sensores'], function(request, response) {
  pool.connect((err, db, done) => {
    if(err){
      console.log(err);
      return response.status(400).send(err)
    }
    db.query(get_sensores, (err, result) => {
      done()
      if(err){
        console.log(err);
        return response.status(400).send(err)
      }else{
        return response.status(200).send(result.rows)
      }
    })
  })
})

app.get('/cadastrar_sensor', function(request, response) {
  pool.connect((err, db, done) => {
    if(err){
      return response.status(400).send(err)
    }
    db.query(get_tamanho+get_tipo+get_marca+get_bateria, (err, results) => {
      done()
      if(err){
        console.log(err);
        return response.status(400).send(err)
      }else{
        return response.status(200).send(
          {
            tamanhos: results[0].rows,
            tipos: results[1].rows,
            marcas: results[2].rows,
            baterias: results[3].rows
          })
      }
    })
  })
})

app.post('/cadastrar_sensor', function(request, response) {
  let localizacao = null
  let ultima_medida = null
  if(request.body.localizacao != '')
    localizacao = request.body.localizacao
  if(request.body.ultima_medida != '')
    ultima_medida = parseFloat(request.body.ultima_medida)

  pool.connect((err, db, done) => {
    if(err){
      return response.status(400).send(err)
    }
    db.query(new_sensor, [
      localizacao, ultima_medida,
      request.body.id_tamanho, request.body.id_tipo,
      request.body.id_marca, request.body.id_bateria],
      (err, result) => {
      done()
      if(err){
        console.log('Deu erro');
        console.log(err);
        return response.status(400).send(err)
      }else{
        console.log('Funcionou');
        return response.status(201).send({msg: true})
      }
    })
  })
})

app.get('/atualizar_sensor', function(request, response) {
  pool.connect((err, db, done) => {
    if(err){
      return response.status(400).send(err)
    }
    db.query(get_tamanho+get_tipo+get_marca+get_bateria+get_sensores, (err, results) => {
      done()
      if(err){
        return response.status(400).send(err)
      }else{
        return response.status(200).send(
          {
            tamanhos: results[0].rows,
            tipos: results[1].rows,
            marcas: results[2].rows,
            baterias: results[3].rows,
            sensores: results[4].rows
          })
      }
    })
  })
})

app.post('/atualizar_sensor', function(request, response) {
  let id_sensor = request.body.id_sensor
  let query = ""
  let values = []
  let statements = []

  if(request.body.localizacao != ''){
    values.push(request.body.localizacao)
    statements.push('localizacao')
  }
  if(request.body.ultima_medida != ''){
    values.push(request.body.ultima_medida)
    statements.push('ultima_medida')
  }
  if(request.body.id_tamanho != ''){
    values.push(request.body.id_tamanho)
    statements.push('id_tamanho')
  }
  if(request.body.id_tipo != ''){
    values.push(request.body.id_tipo)
    statements.push('id_tipo')
  }
  if(request.body.id_marca != ''){
    values.push(request.body.id_marca)
    statements.push('id_marca')
  }
  if(request.body.id_bateria != ''){
    values.push(request.body.id_bateria)
    statements.push('id_bateria')
  }

  for(let i=0; i<statements.length; i++){
      query += statements[i]+'='+values[i]+','
  }
  query = query.substring(0, query.length - 1);

  pool.connect((err, db, done) => {
    if(err){
      return response.status(400).send(err)
    }
    db.query(
      'UPDATE sensor SET ' + query +
      ' WHERE id_sensor = '+ id_sensor,
      (err, result) => {
      done()
      if(err){
        console.log('Deu erro');
        console.log(err);
        return response.status(400).send(err)
      }else{
        console.log('Funcionou');
        return response.status(201).send({msg: true})
      }
    })
  })
})

app.post('/deletar_sensor', function(request, response) {
  console.log('tentou deletar');
  var id_sensor = parseFloat(request.body.id_sensor)
  pool.connect((err, db, done) => {
    if(err){
      return response.status(400).send(err)
    }
    db.query(delete_sensor, [id_sensor], (err, result) => {
      done()
      if(err){
        console.log(err);
        return response.status(400).send(err)
      }else{
        return response.status(201).send({msg: true})
      }
    })
  })
})

process.stdin.resume();//so the program will not close instantly

function exitHandler(options, exitCode) {
    if (options.cleanup) console.log('clean');
    if (exitCode || exitCode === 0) console.log(exitCode);
    if (options.exit) process.exit();
}

//do something when app is closing
process.on('exit', exitHandler.bind(null,{cleanup:true}));

//catches ctrl+c event
process.on('SIGINT', exitHandler.bind(null, {exit:true}));

// catches "kill pid" (for example: nodemon restart)
process.on('SIGUSR1', exitHandler.bind(null, {exit:true}));
process.on('SIGUSR2', exitHandler.bind(null, {exit:true}));

//catches uncaught exceptions
process.on('uncaughtException', exitHandler.bind(null, {exit:true}));
