import React from 'react';
import ReactDOM from 'react-dom';
import './static/vendor/bootstrap/css/bootstrap.min.css';
import './static/sketch.css';
import * as serviceWorker from './serviceWorker';
import * as pages from './pages.js';

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      page: 0
    }
  }

  setPage(event){
    console.log(this.page);
    this.page = 1
    console.log(this.page);
  }

  managePage(){
    switch (this.page) {
      case 1:
        return <pages.CadastraSensor />
      break;
      case 2:
        return <pages.AtualizaSensor />
      break;
      case 3:
        return <pages.DeletaSensor />
      break;
      default:
        return <pages.VisualizaSensor />
    }
  }

  render() {
    return (
      <div className="App">
        <Navbar setPage={ this.setPage }/>
        <Content managePage={ this.managePage }/>
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
                'Atualizar Sensor', 'Remover Sensor']
		}
	}

  render() {
    let brand = this.state.brand
    let navegador = this.state.navegador
    return(
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="/">{ brand }</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse d-flex justify-content-end" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto d-flex justify-content-end">
            <li className="nav-item">
              <a onClick={this.props.setPage.bind(this)}
              className="nav-link" href="sensores">{ navegador[0] }</a>
            </li>
            <li className="nav-item">
              <a onClick={this.props.setPage.bind(this)}
              className="nav-link" href="cadastrar_sensor">{ navegador[1] }</a>
            </li>
            <li className="nav-item">
              <a onClick={this.props.setPage.bind(this)}
              className="nav-link" href="atualizar_sensor">{ navegador[2] }</a>
            </li>
            <li className="nav-item">
              <a onClick={this.props.setPage.bind(this)}
              className="nav-link" href="remover_sensor">{ navegador[3] }</a>
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
      <div className="content-fluid" id="view">
        { this.props.managePage() }
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
          <p className="m-0 text-center text-white">Vinicius França</p>
          <p className="m-0 text-center text-white">2019</p>
        </div>
      </footer>
    )
  }
}


ReactDOM.render(<App />, document.getElementById('root'));
serviceWorker.unregister();
