#!/bin/bash
echo "[INFO] Instalando PostgreSQL"
sudo apt-get install -y postgresql postgresql-contrib
service postgresql start

echo "[INFO] Configurando banco de dados"
read -p "Nome para novo banco de dados: " database
read -p "Usuário PostgreSQL (dica: postgres): " user
read -p "Senha: " password
read -p "Host (dica: localhost): " host
read -p "Port (dica: 5432): " port

cat <<- EOF > settings.json
{
    "database": {
        "database" : "$database",
        "user"     : "$user",
        "password" : "$password",
        "host"     : "$host",
        "port"     : "$port",
        "max"      : 100
    }
}
EOF

echo "[INFO] Criando banco de dados"
createdb -h $host -p $port -U $user $database --password

echo "[INFO] Carregando dados iniciais"
psql     -h $host -p $port -U $user -d $database --password -f database.sql
