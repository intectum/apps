source .env

# Node.js
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
\. "$HOME/.nvm/nvm.sh"
nvm install 22

# PostgreSQL
sudo apt install postgresql -y
sudo -u postgres psql template1 -c "ALTER USER postgres with encrypted password '${PGPASSWORD}'"
sudo -u postgres psql template1 -c "CREATE DATABASE ${PGDATABASE}"
