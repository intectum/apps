source .env

# Node.js
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
\. "$HOME/.nvm/nvm.sh"
nvm install 22

# PostgreSQL
sudo apt install postgresql -y
sudo -u postgres psql template1 -c "ALTER USER postgres with encrypted password '${PGPASSWORD}'"
sudo -u postgres psql template1 -c "CREATE DATABASE ${PGDATABASE}"

# Certbot (Hostinger does not support snap)
sudo apt update
sudo apt install python3 python3-venv libaugeas0 -y
sudo python3 -m venv /opt/certbot/
sudo /opt/certbot/bin/pip install --upgrade pip
sudo /opt/certbot/bin/pip install certbot
sudo ln -s /opt/certbot/bin/certbot /usr/bin/certbot

# Certbot auto-renew
echo "0 0,12 * * * root /opt/certbot/bin/python -c 'import random; import time; time.sleep(random.random() * 3600)' && sudo certbot renew -q" | sudo tee -a /etc/crontab > /dev/null

# Certbot renewal hook
echo -e "systemctl stop homa-and-mukto\nsystemctl start homa-and-mukto" > /etc/letsencrypt/renewal-hooks/deploy/restart.sh
chmod +x /etc/letsencrypt/renewal-hooks/deploy/restart.sh
