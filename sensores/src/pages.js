import React from 'react';
import ReactDOM from 'react-dom';

export class VisualizaSensor extends React.Component {
	constructor() {
		super();
		this.state = {
		}
	}

	createTable(){
	}

	render() {
		return(
			<div className="row">
        <h3>Sensores</h3>
				<table className="table">
					<thead>
						<tr>
							<th scope="col">Localizacão</th>
							<th scope="col">Ultima Medida</th>
							<th scope="col">Tipo</th>
							<th scope="col">Marca</th>
							<th scope="col">Tamanho</th>
							<th scope="col">Tensão da Bateria</th>
						</tr>
					</thead>
					<tbody>
						{ this.createTable() }
					</tbody>
				</table>
			</div>
		)
	}
}

export class CadastraSensor extends React.Component {
  constructor() {
    super()
    this.state = {

    }
  }

  render(){
    return(
      <div className="row">
        <form method="post">
          <div className="form-group">
            <label for="">Localizacao</label>
            <input className="form-control" type="text" name="" placeholder="Localizacão caso necessite"/>
          </div>
          <div className="form-group">
            <label for="">Ultima medida</label>
            <input className="form-control" type="text" name="" placeholder="Ultima medida caso exista"/>
          </div>
          <div className="form-group">
            <label for="">Tamanho</label>
            <select name="" className="custom-select" required>
            </select>
          </div>
          <div className="form-group">
            <label for="">Tipo</label>
            <select name="" className="custom-select" required>
            </select>
          </div>
          <div className="form-group">
            <label for="">Marca</label>
            <select name="" className="custom-select" required>
            </select>
          </div>
          <div className="form-group">
            <label for="">Bateria</label>
            <select name="" className="custom-select" required>
            </select>
          </div>
          <button type="submit" className="btn btn-dark btn-lg btn-block">Cadastrar</button>
        </form>
      </div>
    )
  }
}

export class AtualizaSensor extends React.Component {
  constructor() {
    super()
    this.state = {
    }
  }

  render(){
    return(
      <div className="row">
        <div className="form-group">
          <label for=""></label>
          <select name="" className="custom-select" required>
          </select>
        </div>
        <form method="post">
          <div className="form-group">
            <label for="">Localizacao</label>
            <input className="form-control" type="text" name="" placeholder="Localizacão caso necessite"/>
          </div>
          <div className="form-group">
            <label for="">Ultima medida</label>
            <input className="form-control" type="text" name="" placeholder="Ultima medida caso exista"/>
          </div>
          <div className="form-group">
            <label for="">Tamanho</label>
            <select name="" className="custom-select">
            </select>
          </div>
          <div className="form-group">
            <label for="">Tipo</label>
            <select name="" className="custom-select">
            </select>
          </div>
          <div className="form-group">
            <label for="">Marca</label>
            <select name="" className="custom-select">
            </select>
          </div>
          <div className="form-group">
            <label for="">Bateria</label>
            <select name="" className="custom-select">
            </select>
          </div>
          <button type="submit" className="btn btn-dark btn-lg btn-block">Atualizar</button>
        </form>
      </div>
    )
  }
}

export class DeletaSensor extends React.Component {
  constructor() {
    super()
    this.state = {

    }
  }

  render(){
    return(
      <div className="row">
        <form>
          <div className="form-group">
            <label for="">Selecione o Sensor</label>
            <select name="" className="custom-select">
            </select>
          </div>
          <button type="submit" className="btn btn-dark btn-lg btn-block">Deletar</button>
        </form>
      </div>
    )
  }
}
