ANUBIS Project

Overview

ANUBIS (Automated Natural User Bot and Intelligent System) is a conversational AI web app that interacts with users, providing automated responses based on user input. The app uses a generative AI model to generate content in response to user queries. The application allows users to input text, upload images, and interact with a chatbot-like interface. It is designed to provide a smooth user experience with a minimalistic, responsive layout.

Features

Generative AI: Uses Google's Gemini-1.5-flash model for natural language processing and content generation.

Image Upload: Users can upload images, which are processed and used in conjunction with text input for generating responses.

Responsive Design: The app is designed to work on both mobile and desktop devices, with a dynamic sidebar and flexible layout.

Chat History: Users can view their past queries and responses.

Sidebar Navigation: Includes a simple hamburger menu for mobile view.

Interactive UI: Easy-to-use interface with interactive elements like buttons and inputs.


Files

index.html: The main HTML file defining the structure of the app.

style.css: The CSS file for styling the web page, including responsive layouts.

script.js: JavaScript file to handle user interactions, AI model integration, and dynamic content rendering.


Setup

1. Clone the repository:

Clone this repository to your local machine.

git clone <repository-url>

2. Open index.html in your browser:

Simply open the index.html file in any modern web browser (Chrome, Firefox, etc.) to run the application.

3. Prerequisites:

The application uses the Google Generative AI API for processing the text and generating responses. You will need an API key for integration. To generate your own API key, follow these steps:

Go to Google Cloud Console.

Create a new project and enable the "Generative Language API".

Generate and use the API key in the script.js file.


4. Customize the API Key:

Replace the existing API key in script.js with your own key:

const genAI = new GoogleGenerativeAI("YOUR-API-KEY-HERE");

How It Works

1. Text Input: Users can type a message into the input field, and upon clicking the "submit" button, the message is sent to the generative AI model.


2. Image Upload: Users can upload images, which will be encoded in Base64 format and sent along with the text input to the AI model.


3. Generative AI Response: The AI model processes the input and returns a text response, which is displayed below the user's input.


4. Chat History: All previous interactions are saved and displayed in the sidebar for easy reference.


5. Sidebar Toggle: The sidebar can be toggled in mobile view via a hamburger menu for better navigation.



File Structure

ANUBIS/
│
├── index.html      # Main HTML file
├── script.js       # JavaScript functionality
├── style.css       # Styling for the web page
├── MonumentExtended-Regular.otf  # Custom font

Technologies Used

HTML5: Structure and content of the app.

CSS3: Styling, including responsive layout and animations.

JavaScript: Dynamic content updates and API integration.

Google Generative AI: AI model used for content generation.


Contributing

Feel free to fork the repository and submit pull requests for improvements. Contributions are always welcome!

License

This project is licensed under the MIT License - see the LICENSE file for details.

