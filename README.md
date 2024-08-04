# Receive GitLab Comments on WhatsApp Using Webhooks

This project demonstrates how to use GitLab webhooks to send notifications to WhatsApp using Node.js and the `whatsapp-web.js` library. This integration helps centralize communication and ensures timely responses to important GitLab activities.

## Features

- Listen for GitLab webhook events
- Send notifications to WhatsApp
- Automatically reply to WhatsApp messages using AI-generated responses


## Prerequisites

- Node.js and npm installed
- A GitLab account
- A WhatsApp account

## Setup

1. Clone the repository:

   ```sh
   git clone https://github.com/anis-marrouchi/whatsapp-gitlab-integration.git
   cd whatsapp-gitlab-integration
   ```

2. Install the required dependencies:

   ```sh
   npm install
   ```

3. Start the server:

   ```sh
   node index.js
   ```

4. Scan the QR code displayed in the terminal using your WhatsApp application to authenticate the session.

## Expose Local Server Using ngrok

To test the webhook locally, you can use ngrok to expose your local server to the internet.

1. Install ngrok:

   ```sh
   npm install -g ngrok
   ```

2. Start your local server:

   ```sh
   node index.js
   ```

3. Expose your local server:

   ```sh
   ngrok http 3000
   ```

4. Configure the webhook URL in GitLab settings using the public URL provided by ngrok.

## Running a Publicly Accessible Server with PM2

For a production setup, you can use PM2 to manage your server.

1. Install PM2:

   ```sh
   npm install -g pm2
   ```

2. Start the server with PM2:

   ```sh
   pm2 start index.js --name whatsapp-gitlab-integration
   ```

3. Monitor the server:

   ```sh
   pm2 monit
   ```

4. Set up PM2 to restart on server reboot:

   ```sh
   pm2 startup
   pm2 save
   ```

5. Configure the webhook URL in GitLab settings using your server's public URL.

## Project Structure

- `index.js`: Main server file that handles WhatsApp integration and GitLab webhook events.
- `contacts.js` (optional): File to manage contacts and companies information.

## Usage

- Customize the `contacts` and `companies` arrays in `index.js` with your own information.
- Ensure the `HANDLE` and `PHONE_NUMBER` constants are set to your GitLab handle and WhatsApp phone number.
- Start the server and configure GitLab webhooks to point to your server's URL.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your changes.

## License

This project is licensed under the MIT License.

## Author

Anis Marrouchi