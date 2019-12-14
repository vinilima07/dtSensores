let express = require('express')
let bodyParser = require('body-parser')
let morgan = require('morgan')
let pg = require('pg')
let app = express()
const PORT = 3000;

var config = {
  port: 5432,
  password: '',
  user: 'postgres',
  host: 'localhost',
  database: 'dtSensores'
}
let pool = new pg.Pool(config)

function exec_query(query){
  pool.connect((err, db, done){
    if(err){
      return console.log(err)
    }
    db.query(query, (err, result) => {
      release()
      if(err){
        console.log(err)
      }else{
        console.log(result)
        console.log(result.rows)
        return result.rows
      }
    })
  })
}

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended:true }))
app.use(morgan('dev'))
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "YOUR-DOMAIN.TLD") // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})

app.listen(PORT, () => console.log('Listening on port ' + PORT))
