# A *working* and easy to install fork of XSSHunter
## **Fork features**

**It works and it's simple to setup**: the current as of March 1, 2023 XSSHunter [repository](https://github.com/trufflesecurity/xsshunter) is not in a deploy-able state. This fork fixes that.

**Single user support and multi user support**: you can setup XSSHunter in either single user mode with only your account or in multi user mode using Google OAuth(allowing only the Gmail accounts you want to login). Compared, the original XSSHunter version only allows Google OAuth login and does not restrict the Gmail accounts allowed(all Gmail accounts can create an user and login).

**Full Trufflehog support**: Detect secrets on the page your payload fired. The original version implemented simple regex checks for AWS, GCP and Slack keys. This fork supports all the current ~750 detectors from [Trufflehog](https://github.com/trufflesecurity/trufflehog/).

**No blurred screenshots**

**Local Storage**: Read all data stored in Local Storage for the page the payload fired on

**Slack, Discord and custom notifications**: this fork will send notifications to Slack, Discord and to your custom HTTP hook when a XSS triggers. Compared, the original XSSHunter version only sends email notifications.


[![Twitter](https://img.shields.io/badge/-@rs__loves__bugs-%232B90D9?style=for-the-badge&logo=twitter&logoColor=white&label=twitter)](https://twitter.com/rs_loves_bugs)&nbsp;
[![Mastodon](https://img.shields.io/badge/-@rs__loves__bugs-%232B90D9?style=for-the-badge&logo=mastodon&logoColor=white&label=infosec.exchange)](https://infosec.exchange/@rs_loves_bugs)


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

### **Upgrading**

Upgrading should be as simple as running these 4 commands:

```bash
# change directory to xsshunter
cd xsshunter
# stop the containers
docker compose down
# pull the update from Github
git pull
# build and start the containers
docker compose up -d --build
```

---

### **Optional Setup**

Everytime you edit the `.env` you will need to restart the containers:
```bash
# edit the .env file in your favorite editor
nano .env 
# stop the containers
docker compose down
# start the containers
docker compose up -d
```

If you want email notifications(Discord/Slack notifications are better, Sendgrid is not really worth the trouble):
* `EMAIL_NOTIFICATIONS_ENABLED`: set this variable to `true`
* `EMAIL_FROM`: set this to the email address you want to send notifications from(one of your Sendgrid sender identity)
* `SENDGRID_API_KEY`: set this to your Sendgrid API key
---
If you want a multi panel users setup:
* `PANEL_USERPASS_LIST`: set this variable like this `["some_email@example.com:somepass", "another_email@another_example.com:anotherpass"]`
---
If you want a multi user setup with Google OAuth:
* `OAUTH_LOGIN`: set this variable to `true`
* `CLIENT_ID`: set this to your Google OAuth client id
* `CLIENT_SECRET`: set this to your Google OAuth client secret
* `GMAIL_ACCOUNTS`: set this to a list of Gmail addresses you allow to create accounts and login, you need at least one address here. If you want to allow anyone remove this variable from the .env file
---
If you already have a webserver running on the host where you want XSSHunter setup run this command to setup XSSHunter:

Run this command to setup XSSHunter:
```bash
# build and start the containers
docker compose up -d xsshunterexpress-db xsshunterexpress-service xsshunterexpress-trufflehog
```
You can use `apache.conf` or `nginx.conf` config files from this repository as guides to setup vhosts on your web server.

---

### **Credits**

* Truffle Security for keeping XSSHunter alive
* [@catmandx](https://github.com/catmandx) for sharing their experience trying to deploy
* [@mandatoryprogrammer](https://github.com/mandatoryprogrammer) for creating XSSHunter 