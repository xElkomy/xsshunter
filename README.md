# A *working* and easy to install fork of XSSHunter
## **Fork features**

**It works and it's simple to setup**: the current as of March 1, 2023 XSSHunter [repository](https://github.com/trufflesecurity/xsshunter) is not in a deploy-able state. This fork fixes that.

**Single user support and multi user support**: you can setup XSSHunter in either single user mode with only your account or in multi user mode using Google OAuth(allowing only the Gmail accounts you want to login). Compared, the original XSSHunter version only allows Google OAuth login and does not restrict the Gmail accounts allowed(all Gmail accounts can create an user and login).

**Slack, Discord and custom notifications**: this fork will send notifications to Slack, Discord and to your custom HTTP hook when a XSS triggers. Compared, the original XSSHunter version only sends email notifications.

**No blurred screenshots**

[![Twitter Follow](https://img.shields.io/twitter/follow/rs_loves_bugs?style=flat-square)](https://twitter.com/rs_loves_bugs)

---

### **Requirements**
* A server with `git`, `docker` and `docker compose` plugin installed. I'm using Ubuntu 22.04 LTS, you can follow [these instructions](https://docs.docker.com/engine/install/ubuntu/) to get `docker` and `docker compose` plugin on it
* Two hostnames(for example `admin.example.com` and `xss.example.com`) you pointed to your server's ip address 
* *[Optional for multi user login]* Google OAuth client id and client secret
* *[Optional for email notifications]* Sendgrid API key
* *[Optional for cloud storage]* Google Cloud Storage setup on the server 

---

### **Setup**
Login as root on your server and run these commands:
```bash
# clone the repository
git clone https://github.com/rs-loves-bugs/xsshunter
# enter the directory
cd xsshunter
# enabled the environment variables file
cp env.example .env
```
Edit the following variables in the `.env` file:
* `SESSION_SECRET_KEY`: set this to a long random string
* `HOSTNAME`: set this to the hostname you want the admin panel on(for example admin.example.com)
* `XSS_HOSTNAME`: set this to the hostname you want the xss probe on(for example xss.example.com)
* `PANEL_USERNAME`: set the admin panel username, it has to be an email address(if you setup and enable email notification they'll be sent there)
* `PANEL_PASSWORD`: set the password for the admin panel username

Run this command to setup XSSHunter:
```bash
# build and start the containers
docker compose up -d
```
When this finishes you can login on `https://admin.example.com` with the panel username and password. Go ahead and setup notifications and other settings in Settings.

Have fun!

---

### **Optional Setup**
If you want email notifications(Discord/Slack notifications are better, Sendgrid is not really worth the trouble):
* `EMAIL_NOTIFICATIONS_ENABLED`: set this variable to `true`
* `EMAIL_FROM`: set this to the email address you want to send notifications from(one of your Sendgrid sender identity)
* `SENDGRID_API_KEY`: set this to your Sendgrid API key
---
If you want a multi user setup:
* `OAUTH_LOGIN`: set this variable to `true`
* `CLIENT_ID`: set this to your Google OAuth client id
* `CLIENT_SECRET`: set this to your Google OAuth client secret
* `GMAIL_ACCOUNTS`: set this to a list of Gmail addresses you allow to create accounts and login, you need at least one address here. If you want to allow anyone remove this variable from the .env file
---
If you already have a webserver running on the host where you want XSS Hunter setup run this command to setup XSS Hunter:

Run this command to setup XSS Hunter:
```bash
# build and start the containers
docker compose up -d xsshunterexpress-db xsshunterexpress-service
```
You can use `apache.conf` or `nginx.conf` as guides to setup vhosts on your web server.

### **Credits**

* Truffle Security for keeping XSS Hunter alive
* [@catmandx](https://github.com/catmandx) for sharing their experience trying to deploy
* [@mandatoryprogrammer](https://github.com/mandatoryprogrammer) for creating XSS Hunter 