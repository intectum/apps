source .env

# Node.js
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
\. "$HOME/.nvm/nvm.sh" # in lieu of restarting the shell
nvm install 22

# PostgreSQL
sudo apt install postgresql
sudo -u postgres psql template1 -c "ALTER USER postgres with encrypted password '${PGPASSWORD}'"
sudo -u postgres psql template1 -c "CREATE DATABASE ${PGDATABASE}"
