import React from 'react';
import ReactDOM from 'react-dom';
import './static/sketch.css';
import * as serviceWorker from './serviceWorker';
import * as pages from './pages.js';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
//let DOMAIN = 'http://localhost:4000';

class App extends React.Component {
  constructor() {
    super()
    this.state = {
    }
  }

  render() {
    return (
      <div className="App">
        <Router>
          <Navbar />
          <Content />
        </Router>
        <Footer />
      </div>
    )
  }
}

class Navbar extends React.Component {
  constructor() {
		super();
		this.state = {
      brand: '.dtSensores',
      navegador: ['Exibir Sensores', 'Cadastrar Sensor',
                'Atualizar Sensor', 'Deletar Sensor']
		}
	}

  render() {
    let brand = this.state.brand
    let navegador = this.state.navegador
    return(
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand" href="/">{ brand }</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse d-flex justify-content-end" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto d-flex justify-content-end">
            <li className="nav-item">
              <Link className="nav-link" to="/">{ navegador[0] }</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/cadastrar_sensor">{ navegador[1] }</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/atualizar_sensor">{ navegador[2] }</Link>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}

class Content extends React.Component {
  constructor() {
    super()
    this.state = {
    }
  }

  render() {
    return(
      <div className="content-fluid py-2">
        <Switch>
          <Route path="/(sensores|)">
            <pages.VisualizaSensor />
          </Route>
          <Route path="/cadastrar_sensor">
            <pages.CadastraSensor />
          </Route>
          <Route path="/atualizar_sensor">
            <pages.AtualizaSensor />
          </Route>
        </Switch>
      </div>
    )
  }
}

class Footer extends React.Component {
  constructor() {
    super()
    this.state = {
    }
  }

  render() {
    return(
      <footer className="page-footer py-1 bg-dark fixed-bottom">
        <div id="footer-elements" className="container">
          <p className="m-0 text-center text-white">Digital Talents - CRUD Sensores</p>
          <p className="m-0 text-center text-white">Vinicius França Lima Vilaça</p>
          <p className="m-0 text-center text-white">viniciusfdev@gmail.com - 2019</p>
        </div>
      </footer>
    )
  }
}


ReactDOM.render(<App />, document.getElementById('root'));
serviceWorker.unregister();
