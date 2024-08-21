import express from 'express';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { OpenAI } from 'openai';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Manually define __dirname for ES module support
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(express.json());
app.use(cors());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY // Use API key from environment variable
});

let thread, assistant, run;

async function retrieveAssistant() {
    try {
        assistant = await openai.beta.assistants.retrieve(process.env.ASSISTANT_ID); // Use assistant ID from environment variable
        console.log(assistant);

        thread = await openai.beta.threads.create();
        console.log(thread);
    } catch (error) {
        console.error("Error:", error);
    }
}

async function sendMessage(userInput) {
    try {
        const message = await openai.beta.threads.messages.create(thread.id, {
            role: "user",
            content: userInput
        });
        console.log(message);
    } catch (error) {
        console.error("Error:", error);
    }
}

async function createRun() {
    try {
        run = await openai.beta.threads.runs.create(thread.id, { 
            assistant_id: assistant.id,
            instructions: assistant.instructions
        });
        console.log(run);
    } catch (error) {
        console.error("Error:", error);
    }
}

async function retrieveRun() {
    try {
        const runResult = await openai.beta.threads.runs.retrieve(thread.id, run.id);
        console.log(runResult);
        return runResult;
    } catch (error) {
        console.error("Error:", error);
    }
}

async function listMessages() {
    try {
        const messages = await openai.beta.threads.messages.list(thread.id);
        
        // Filter messages by the current run_id
        const assistantMessages = messages.body.data
            .filter(msg => msg.role === 'assistant' && msg.run_id === run.id)
            .map(msg => msg.content.map(c => c.text.value).join(' '));

        const latestUniqueMessage = assistantMessages.pop(); // Get the last unique message

        console.log(latestUniqueMessage);
        return latestUniqueMessage;
    } catch (error) {
        console.error("Error:", error);
    }
}

app.post('/send-message', async (req, res) => {
    const userInput = req.body.message;
    try {
        if (!thread || !assistant) {
            await retrieveAssistant();
        }
        await sendMessage(userInput);
        await createRun();

        let attempts = 0;
        const maxAttempts = 30;
        const delay = 2000;
        let result;

        while (attempts < maxAttempts) {
            await new Promise(resolve => setTimeout(resolve, delay));
            result = await retrieveRun();

            if (result.status === 'completed') {
                break;
            } else if (result.status === 'requires_action') {
                throw new Error("Run requires action and is waiting for input.");
            } else if (result.status === 'expired') {
                throw new Error("Run expired.");
            } else if (result.status === 'failed') {
                throw new Error(`Run failed: ${result.last_error ? result.last_error.message : "Unknown error"}`);
            }

            attempts++;
        }

        const response = await listMessages();
        res.json({ response });

    } catch (error) {
        console.error("Error in OpenAI API call:", error.message || error);
        res.status(500).json({ error: "Failed to process message" });
    }
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
