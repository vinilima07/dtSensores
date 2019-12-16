# Author
Vinícius França Lima vilaça<br />
e-mail: viniciusfdev@gmail.com

# dtSensores
CRUD de um sistema de gestão de sensores

# Executando
1 - Execute primeiro o comando  `sh ./database.sh` dentro da pasta pg-api/database/ do projeto para configurar o banco de dados.<br />
    $sudo sh ./pg-api/database/database.sh<br />
2 - Instale o nodemon com o comando `sudo npm install -g nodemon`<br />
3 - Baixe os modulos do npm para a pasta sensores/. !Tenha certeza de estar utilizando as versões mais atuais do node e react.<br />
    $cd sensores/<br />
    $npm install<br />
4 - Execute em outro terminal, dentro da pasta `pg-api/` o comando `nodemon server.js` para iniciar o servidor<br />
5 - Execute em outro terminal, dentro da pasta `sensores/` o comando `npm start` para iniciar o client<br />
6 - Acesse o link informado pelo npm start (http://localhost/3000)<br />
