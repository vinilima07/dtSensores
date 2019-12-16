import React from 'react';
import './static/sketch.css';
let DOMAIN = 'http://localhost:1777';

export class VisualizaSensor extends React.Component {
	constructor() {
		super();
		this.state = {
      isLoaded: false,
      sensores: []
		}
	}

  componentDidMount() {
    console.log('COMPONET HAS MOUNTED');
    fetch(DOMAIN+'/')
    .then(response => response.json())
    .then(data => {
      this.setState({
        isLoaded: true,
        sensores: data
      })
      }
    )
		fetch(DOMAIN+'/sensores')
    .then(response => response.json())
    .then(data => {
      this.setState({
        isLoaded: true,
        sensores: data
      })
      }
    ).catch()
  }

  deletarSensor(id_sensor, event) {
    event.preventDefault()
    let data = {
      id_sensor: id_sensor,
    }
    var request = new Request(DOMAIN+'/deletar_sensor', {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      body: JSON.stringify(data)
    })

    fetch(request)
    .then(response => response.json())
    .then(data => {
      if(data.msg){
        alert('Sensor deletado com sucesso!')
        for(let i=0; i<this.state.sensores.length; i++){
          if(this.state.sensores[i].id_sensor === id_sensor){
            this.state.sensores.splice(i, 1)
            let items = this.state.sensores
            this.setState({
              sensores: items
            })
            break
          }
        }
      }else{
        alert('Erro durante deleção')
      }
    })
  }

	render() {
    let {isLoaded, sensores} = this.state
    if(!isLoaded){
      return <div className="row">Loading...</div>
    }else{
  		return(
  			<div className="row">
          <div className="col view">
            <h3>Sensores</h3>
    				<table className="table table-dark">
    					<thead>
    						<tr>
    							<th scope="col">Localizacão</th>
    							<th scope="col">Ultima Medida</th>
    							<th scope="col">Tipo</th>
    							<th scope="col">Marca</th>
    							<th scope="col">Tamanho</th>
    							<th scope="col">Tensão da Bateria</th>
                  <th scope="col">Deletar</th>
    						</tr>
    					</thead>
    					<tbody>
                {sensores.map(item => (
                  <tr key={item.id_sensor}>
                    {item.localizacao != null && (
                      <td>{item.localizacao}</td>
                    )}
                    {item.localizacao == null && (
                      <td>Untracked</td>
                    )}
                    {item.ultima_medida != null && (
                      <td>{item.ultima_medida}</td>
                    )}
                    {item.ultima_medida == null && (
                      <td>unregister</td>
                    )}
                    <td>({item.largura}, {item.altura}, {item.comprimento})[cm]</td>
                    <td>{item.nm_marca}</td>
                    <td>{item.nm_tipo}</td>
                    <td>{item.tensao}[V]</td>
                    <td>
                      <button
                        onClick={this.deletarSensor.bind(this, item.id_sensor)}
                        className="btn btn-dark btn-lg btn-block"
                        type="button"
                        form={item.id_sensor}
                      >-</button>
                    </td>
                  </tr>
                ))}
    					</tbody>
    				</table>
          </div>
  			</div>
  		)
    }
	}
}

export class CadastraSensor extends React.Component {
  constructor() {
    super()
    this.state = {
      isLoaded: false,
      tamanhos: [],
      tipos: [],
      marcas: [],
      baterias: []
    }
  }

  componentDidMount() {
    console.log('COMPONET HAS MOUNTED');
    fetch(DOMAIN+'/cadastrar_sensor')
    .then(response => response.json())
    .then(data => {
      this.setState({
        isLoaded: true,
        tamanhos: data.tamanhos,
        tipos: data.tipos,
        marcas: data.marcas,
        baterias: data.baterias
      })
      }
    )
  }

  cadastrarSensor(event) {
    event.preventDefault()
    let data = {
      localizacao: this.refs.localizacao.value,
      ultima_medida: this.refs.ultima_medida.value,
      id_tamanho: this.refs.id_tamanho.value,
      id_tipo: this.refs.id_tipo.value,
      id_marca: this.refs.id_marca.value,
      id_bateria: this.refs.id_bateria.value
    }
    var request = new Request(DOMAIN+'/cadastrar_sensor', {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      body: JSON.stringify(data)
    })

    fetch(request)
    .then(response => response.json())
    .then(data => {
      if(data.msg){
        alert('Sensor registrado com sucesso!')
      }
      this.refs.formCadastro.reset()
    })
  }

  render(){
    let {isLoaded, tamanhos, tipos, marcas, baterias} = this.state

    if(!isLoaded){
      return <div className="row">Loading...</div>
    }else{
      return(
        <div className="row">
          <div className="col">
            <h3>Cadastro de sensor</h3>
            <form method="post" ref="formCadastro">
              <div className="form-group">
                <label htmlFor="localizacao">Localizacao</label>
                <input name="localizacao" className="form-control" type="text" ref="localizacao" placeholder="Localizacão caso necessite"/>
              </div>
              <div className="form-group">
                <label htmlFor="ultima_medida">Ultima medida</label>
                <input name="ultima_medida" className="form-control" type="number" step=".00000001" ref="ultima_medida" placeholder="Ultima medida caso exista"/>
              </div>
              <div className="form-group">
                <label htmlFor="id_tamanho">Tamanho</label>
                <select name="id_tamanho" value={this.id_tamanho} ref="id_tamanho" className="custom-select" required>
                  {tamanhos.map(item => (
                    <option key={item.id_tamanho} value={item.id_tamanho}>({item.altura}, {item.largura}, {item.comprimento})[cm]</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="id_tipo">Tipo</label>
                <select name="id_tipo" value={this.id_tipo} ref="id_tipo" className="custom-select" required>
                  {tipos.map(item => (
                    <option key={item.id_tipo} value={item.id_tipo}>{item.nm_tipo}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="id_marca">Marca</label>
                <select name="id_marca" value={this.id_marca} ref="id_marca" className="custom-select" required>
                  {marcas.map(item => (
                    <option key={item.id_marca} value={item.id_marca}>{item.nm_marca}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="id_bateria">Bateria</label>
                <select name="id_bateria" value={this.id_bateria} ref="id_bateria" className="custom-select" required>
                  {baterias.map(item => (
                    <option key={item.id_bateria} value={item.id_bateria}>{item.tensao}[V]</option>
                  ))}
                </select>
              </div>
              <button
                onClick={this.cadastrarSensor.bind(this)}
                type="submit"
                className="btn btn-dark btn-lg btn-block"
                form="formCadastro"
              >Cadastrar</button>
            </form>
          </div>
        </div>
      )
    }
  }
}

export class AtualizaSensor extends React.Component {
  constructor() {
    super()
    this.state = {
      isLoaded: false,
      tamanhos: [],
      tipos: [],
      marcas: [],
      baterias: [],
      sensores: []
    }
  }

  componentDidMount() {
    console.log('COMPONET HAS MOUNTED');
    fetch(DOMAIN+'/atualizar_sensor')
    .then(response => response.json())
    .then(data => {
      this.setState({
        isLoaded: true,
        tamanhos: data.tamanhos,
        tipos: data.tipos,
        marcas: data.marcas,
        baterias: data.baterias,
        sensores: data.sensores
      })
      }
    )
  }

  atualizarSensor(event) {
    event.preventDefault()
    let data = {
      id_sensor: this.refs.id_sensor.value,
      localizacao: this.refs.localizacao.value,
      ultima_medida: this.refs.ultima_medida.value,
      id_tamanho: this.refs.id_tamanho.value,
      id_tipo: this.refs.id_tipo.value,
      id_marca: this.refs.id_marca.value,
      id_bateria: this.refs.id_bateria.value
    }
    var request = new Request(DOMAIN+'/atualizar_sensor', {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      body: JSON.stringify(data)
    })

    fetch(request)
    .then(response => response.json())
    .then(data => {
      if(data.msg){
        alert('Sensor atualizado com sucesso!')
      }
      this.refs.formAtualizar.reset()
    })
  }

  render(){
    let {isLoaded, tamanhos, tipos, marcas, baterias, sensores} = this.state

    if(!isLoaded){
      return <div className="row">Loading...</div>
    }else{
      return(
        <div className="row">
          <div className="col">
            <h3>Atualização de sensor</h3>
            <form method="post" ref="formAtualizar">
              <div className="form-group">
                <label htmlFor="id_sensor">Selectione o sensor</label>
                <select name="id_sensor" value={this.id_sensor} ref="id_sensor" className="custom-select" required>
                  {sensores.map(item => (
                    <option key={item.id_sensor} value={item.id_sensor}>
                      {item.ultima_medida}&emsp;-&emsp;
                      {item.localizacao}&emsp;-&emsp;
                      ({item.largura}, {item.altura}, {item.comprimento})[cm]&emsp;-&emsp;
                      {item.nm_marca}&emsp;-&emsp;
                      {item.nm_tipo}&emsp;-&emsp;
                      {item.tensao}[V]
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="localizacao">Localizacao</label>
                <input name="localizacao" className="form-control" type="text" ref="localizacao" placeholder="Localizacão caso necessite"/>
              </div>
              <div className="form-group">
                <label htmlFor="ultima_medida">Ultima medida</label>
                <input name="ultima_medida" className="form-control" type="number" step=".00000001" ref="ultima_medida" placeholder="Ultima medida caso exista"/>
              </div>
              <div className="form-group">
                <label htmlFor="id_tamanho">Tamanho</label>
                <select name="id_tamanho" value={this.id_tamanho} ref="id_tamanho" className="custom-select" >
                  {tamanhos.map(item => (
                    <option key={item.id_tamanho} value={item.id_tamanho}>({item.altura}, {item.largura}, {item.comprimento})[cm]</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="id_tipo">Tipo</label>
                <select name="id_tipo" value={this.id_tipo} ref="id_tipo" className="custom-select" >
                  {tipos.map(item => (
                    <option key={item.id_tipo} value={item.id_tipo}>{item.nm_tipo}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="id_marca">Marca</label>
                <select name="id_marca" value={this.id_marca} ref="id_marca" className="custom-select" >
                  {marcas.map(item => (
                    <option key={item.id_marca} value={item.id_marca}>{item.nm_marca}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="id_bateria">Bateria</label>
                <select name="id_bateria" value={this.id_bateria} ref="id_bateria" className="custom-select" >
                  {baterias.map(item => (
                    <option key={item.id_bateria} value={item.id_bateria}>{item.tensao}[V]</option>
                  ))}
                </select>
              </div>
              <button
                onClick={this.atualizarSensor.bind(this)}
                type="submit"
                className="btn btn-dark btn-lg btn-block"
                form="formAtualizar"
              >Cadastrar</button>
            </form>
          </div>
        </div>
      )
    }
  }
}
