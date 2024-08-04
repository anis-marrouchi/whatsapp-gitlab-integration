const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const express = require('express');
const bodyParser = require('body-parser');
const puppeteer = require('puppeteer');
const { generateText } = require('ai');
const { openai } = require('@ai-sdk/openai');
// const { contacts, companies } = require('./contacts'); // Import your contacts and companies arrays
const contacts = [
    { phoneNumber: '21624309128@c.us', name: 'Anis Marrouchi', company: 'NOQTA', role: 'Founder' }
    // Add more contacts as needed
];

const companies = [
    {
        name: 'NOQTA',
        description: 'NOQTA is a AI centered web agency, based in Tunisia. We provide web & mobile development, AI & Automation, Cybersecurity, Consulting and IT Maintenance & support services.',
        projects: [
            `Let's us build your next project together.`,
        ],
        latestInteraction: ''
    }
];
const app = express();
app.use(bodyParser.json());

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        executablePath: puppeteer.executablePath(),
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        timeout: 60000 // Increase timeout to 60 seconds
    }
});

client.on('qr', (qr) => {
    console.log('QR event received, generating QR code...');
    qrcode.generate(qr, { small: true });
    console.log('QR code generated, scan it using WhatsApp');
});

client.on('ready', () => {
    console.log('WhatsApp client is ready!');
});

client.on('message', async (msg) => {
    console.log('Message received:', msg.body);

    const contact = contacts.find(contact => contact.phoneNumber === msg.from);
    console.log(msg.from)
    if (contact) {
        const company = companies.find(company => company.name === contact.company);
        const description = company ? company.description : '';
        const projects = company ? company.projects.join(', ') : '';
        const latestInteraction = company ? company.latestInteraction : '';

        try {
            // Generate a response using Vercel AI SDK
            const { text } = await generateText({
                model: openai('gpt-4o'), // Use the appropriate model from Vercel AI
                system: `You are an AI assistant for a web agency, and your role is to reply to client messages in a professional manner. You provide clear, concise, and helpful responses based on the client's message and the company's context. if the client is my wife, you should reply with a lovely message. Always use the language of the sender.`,
                prompt: `Company: ${contact.company}\nDescription: ${description}\nProjects: ${projects}\nLatest Interaction: ${latestInteraction}\nMessage: ${msg.body}`
            });

            // Send the generated response back to the user
            msg.reply(text);
        } catch (error) {
            console.error('Error generating response:', error);
            msg.reply('Sorry, I encountered an error while generating a response.');
        }
    } else {
        console.log('Contact not found in the contacts array.');
    }
});

client.initialize();

// Endpoint to handle GitLab webhooks
app.post('/webhook', (req, res) => {
    const mentionEvent = req.body;
    const mentionText = mentionEvent.object_attributes.note;

    // Extract the mentioned user and message details
    const mentionedUser = mentionEvent.user.name;
    // if the mentionText contains the handle of the user marrouchi, then send a message to the phone number
    // include the url of the issue or merge request in the message
    if (mentionText.includes('marrouchi')) {
        // Use your phone number for testing
    const message = `You were mentioned in a GitLab note: "${mentionText}" \n ${mentionEvent.object_attributes.url}`;


    // Use your phone number for testing
    const phoneNumber = '21624309128@c.us';

    // Send message via WhatsApp
    client.sendMessage(phoneNumber, message)
        .then(response => {
            console.log('Message sent:', response);
            res.status(200).send('Message sent successfully');
        })
        .catch(err => {
            console.error('Failed to send message:', err);
            res.status(500).send('Failed to send message');
        });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
