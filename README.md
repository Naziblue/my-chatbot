# Customizable AI Assistant Chatbot

This project is a customizable AI assistant chatbot built using Node.js and OpenAI's API. It allows you to create a personal assistant that can respond to user queries based on instructions you provide during the training phase. The assistant is designed to answer questions in a specific domain (e.g., math) or according to your custom instructions.

- [Features](##features) 
- [Prerequisites](##Prerequisites)
- [Installation](##Installation)
- [Environment Variables](##Environment_variables)
- [Training Your Assistant](##Training_Your_Assistant)
- [Project Structure](##Project_Structure) 

## Features

-	**Customizable Assistant**: Users can train their own assistant tailored to specific needs.
-	**Interactive Chat**: The assistant can be interacted with through a simple web interface.
-	**Real-Time Responses**: The assistant processes user queries and responds in real-time, leveraging OpenAI's GPT-3.5-turbo model

## Prerequisites

Before you begin, ensure you have met the following requirements:

-	**Node.js**: Version 14.x or higher.
-	**npm**: Node package manager, typically installed with Node.js.
- 	**OpenAI API Key**: You must have an API key from OpenAI.
- 	**OpenAI Assistant ID**: You need to create and train your own assistant using the OpenAI platform.

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Naziblue/my-chatbot.git
cd my-chatbot

```

### 2.Install Dependencies


```bash
npm install 
```
### 3.Create a .env File

- In the root directory of the project, create a .env - - file and add your OpenAI API key and Assistant ID.


``` env
OPENAI_API_KEY=your-openai-api-key-here
ASSISTANT_ID=your-assistant-id-here

```


### 4 . Start the Server

```bash
node server.js

```

- The server will start running on http://localhost:3000.

### 5. Access the Chatbot

- Open your browser and navigate to http://localhost:3000. You can start chatting with your customized AI assistant directly through the web interface.


##Environment Variables

- OPENAI_API_KEY: Your OpenAI API key used to authenticate requests to the OpenAI API.
- ASSISTANT_ID: The ID of the assistant you have trained and configured in the OpenAI dashboard.

## Training Your Assistant

To create your own assistant:

1. Sign in to the OpenAI platform: Go to the OpenAI Platform and sign in.
2. Create a new assistant: Follow the documentation to train your assistant by providing it with specific instructions.
3. Obtain the Assistant ID: Once the assistant is trained, note down its Assistant ID.
4. Integrate with this chatbot: Update the .env file with your Assistant ID and API Key to use your custom-trained assistant in this chatbot application.


## Project Structure 

```
.
├── public
│   ├── index.html      # The main HTML file for the chat interface
│   ├── index.js        # JavaScript to handle client-side interactions
│   └── styles.css      # Basic styling for the chat interface
├── server.js           # The main server file that handles the backend logic
├── package.json        # Project metadata and dependencies
├── .env                # Environment variables (not included in the repository)
└── README.md           # Project documentation (you are here)

```



