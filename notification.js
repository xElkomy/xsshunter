const sendgrid = require('@sendgrid/mail')
const fetch = require('node-fetch');
sendgrid.setApiKey(process.env.SENDGRID_API_KEY)
const mustache = require('mustache');
const fs = require('fs');

const XSS_PAYLOAD_FIRE_EMAIL_TEMPLATE = fs.readFileSync(
	'./templates/xss_email_template.htm',
	'utf8'
);

async function send_email_notification(xss_payload_fire_data, email) {
	const notification_html_email_body = mustache.render(
		XSS_PAYLOAD_FIRE_EMAIL_TEMPLATE, 
		xss_payload_fire_data
	);

    const fire_location = (!xss_payload_fire_data.encrypted ? xss_payload_fire_data.url : 'With An Encryption Key');

	const msg = {
		from: process.env.EMAIL_FROM,
		to: email,
		subject: `[XSS Hunter Express] XSS Payload Fired On ${fire_location}`,
		text: "Only HTML reports are available, please use an email client which supports this.",
		html: notification_html_email_body,
		asm: {
			groupId: parseInt(process.env.SENDGRID_UNSUBSRIBE_GROUP_ID),
			groupsToDisplay: [
				parseInt(process.env.SENDGRID_UNSUBSRIBE_GROUP_ID)
			]
		},		
	}
	response = await sendgrid
	.send(msg)
	.catch((error) => {
		console.error(error);
	})

	console.debug("Message emailed with status %d", response[0].statusCode);
	return true;
}

async function send_discord_notification(xss_payload_fire_data, discord_webhook) {
	const fire_location = (!xss_payload_fire_data.encrypted ? xss_payload_fire_data.url : 'With An Encryption Key');
	fetch(
		discord_webhook,
		{
		  method: 'post',
		  headers: {
			'Content-Type': 'application/json',
		  },
		  body: JSON.stringify({
			username: 'XSS Hunter',
			content: `XSS triggered on ${fire_location}`,
		  }),
		}
	  );
	  return true;
}

async function send_slack_notification(xss_payload_fire_data, slack_webhook) {
	const fire_location = (!xss_payload_fire_data.encrypted ? xss_payload_fire_data.url : 'With An Encryption Key');
	fetch(
		slack_webhook,
		{
		  method: 'post',
		  headers: {
			'Content-Type': 'application/json',
		  },
		  body: JSON.stringify({
			text: `XSS triggered on ${fire_location}`,
		  }),
		}
	  );	
	return true;
}

async function send_custom_notification(xss_payload_fire_data, custom_webhook) {
	const fire_location = (!xss_payload_fire_data.encrypted ? xss_payload_fire_data.url : 'With An Encryption Key');
	fetch(
		custom_webhook,
		{
		  method: 'post',
		  headers: {
			'Content-Type': 'application/json',
		  },
		  body: JSON.stringify({
			sender: 'XSS Hunter',
			content: `XSS triggered on ${fire_location}`,
		  }),
		}
	  );	
	return true;
}

async function send_telegram_notification(xss_payload_fire_data, telegram_webhook, telegram_chat_id) {
	const fire_location = (!xss_payload_fire_data.encrypted ? xss_payload_fire_data.url : 'With An Encryption Key');
	fetch(
		telegram_webhook,
		{
		  method: 'post',
		  headers: {
			'Content-Type': 'application/json',
		  },
		  body: JSON.stringify({
		    chat_id: telegram_chat_id,
			text: `XSS triggered on ${fire_location}`,
		  }),
		}
	  );
	return true;
}

module.exports = {
	send_email_notification,
	send_discord_notification,
	send_slack_notification,
	send_custom_notification,
	send_telegram_notification
 }
