import Groq from "groq-sdk";
{ //We establish a connection to the Groq API using the Groq SDK.
}
const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  dangerouslyAllowBrowser: true,
});
console.log("API Key loaded:", import.meta.env.VITE_GROQ_API_KEY ? "✅ Yes" : "❌ No");
{ //We create a function to extract text from an image or a file.
}
export async function imagetoText(imageUrl) {
    try {
        const response = await groq.chat.completions.create({
            "messages": [
                {
                    "role": "user",
                    "content": [
                        {
                            "type": "text",
                            "text": "Extract all the text in this image or file and try to be as accurate as you can and return only the extracted text."
                        },
                        {
                            "type": "image_url",
                            "image_url": {
                                "url": imageUrl
                            }
                        }
                    ]
                }
            ],
            "model": "meta-llama/llama-4-scout-17b-16e-instruct",
            "temperature": 1,
            "max_completion_tokens": 1024,
            "top_p": 1,
            "stream": false,
            "stop": null
        });
        return response.choices[0]?.message?.content || 'No text extracted. Try again.';
    } catch (error) {
        console.error("Error extracting text from image:", error);
        return 'Error extracting text. Please try again.';
    }
}
{//We create a function to summarize text.
}
export async function summarizeText(text) {
    try {
        const chatCompletion = await groq.chat.completions.create({
        "messages": [
            {
            "role": "user",
            "content": "You are an expert text summarizer. You provide concise and clear summaries of the given text.Just return the summary and be precise . Here is the text to summarize:\n\n" + text
            }
        ],
        "model": "meta-llama/llama-4-scout-17b-16e-instruct",
        "temperature": 1,
        "max_completion_tokens": 1024,
        "top_p": 1,
        "stream": false,
        "stop": null
        });

        return chatCompletion.choices[0]?.message?.content || 'No summary generated. Try again.';
    } catch (error) {
        console.error("Error summarizing text:", error);
        return 'Error generating summary. Please try again.';
    }
}
{//We create a function to generate quiz questions from text.
}
export async function generateQuizQuestions(text) {
    try {
        const chatCompletion = await groq.chat.completions.create({
        "messages": [
            {
            "role": "user",
            "content": "You are an expert quiz generator. You create engaging and effective quiz questions based on the provided text. Here is the text to generate quiz questions from. You have to return only the json array of questions, choices and correct answer's index:\n\n" + text
            }
        ],
        "model": "meta-llama/llama-4-scout-17b-16e-instruct",
        "temperature": 1,
        "max_completion_tokens": 1024,
        "top_p": 1,
        "stream": true,
        "stop": null
        });

        return chatCompletion.choices[0]?.message?.content || 'No quiz questions generated. Try again.';
    } catch (error) {
        console.error("Error generating quiz questions:", error);
        return 'Error generating quiz questions. Please try again.';
    }
}
{//We create a function to generate flashcards from text.
}
export async function generateFlashcards(text) {
    try {
        const chatCompletion = await groq.chat.completions.create({
        "messages": [
            {
            "role": "user",
            "content": "You are an expert flashcard generator. You create concise and informative flashcards based on the provided text. Here is the text to generate flashcards from. You have to return only the json array of question and answer pairs:\n\n" + text
            }
        ],
        "model": "meta-llama/llama-4-scout-17b-16e-instruct",
        "temperature": 1,
        "max_completion_tokens": 1024,
        "top_p": 1,
        "stream": true,
        "stop": null
        });

        return chatCompletion.choices[0]?.message?.content || 'No flashcards generated. Try again.';
    } catch (error) {
        console.error("Error generating flashcards:", error);
        return 'Error generating flashcards. Please try again.';
    }
}
export async function reformulateText(text) {
    try {
        const chatCompletion = await groq.chat.completions.create({
        "messages": [
            {
            "role": "user",
            "content": "You are an expert text reformulator.You reformulate the given text while preserving its original meaning. Here is the text to reformulate:\n\n" + text
            }
        ],
        "model": "meta-llama/llama-4-scout-17b-16e-instruct",
        "temperature": 1,
        "max_completion_tokens": 1024,
        "top_p": 1,
        "stream": false,
        "stop": null
        });

        return chatCompletion.choices[0]?.message?.content || 'No reformulated text generated. Try again.';
    } catch (error) {
        console.error("Error reformulating text:", error);
        return 'Error generating reformulated text. Please try again.';
    }
}
export async function explainText(text) {
    try {
        const chatCompletion = await groq.chat.completions.create({
        "messages": [
            {
            "role": "user",
            "content": "You are an study assistant.You have to explain the given text while giving real examples.Return the explanation in a clear and concise manner with good formatting(bullet points, headings, etc.). Here is the text to explain:\n\n" + text
            }
        ],
        "model": "meta-llama/llama-4-scout-17b-16e-instruct",
        "temperature": 1,
        "max_completion_tokens": 1024,
        "top_p": 1,
        "stream": false,
        "stop": null
        });

        return chatCompletion.choices[0]?.message?.content || 'No reformulated text generated. Try again.';
    } catch (error) {
        console.error("Error explaining text:", error);
        return 'Error explaining text. Please try again.';
    }
}
export async function generateArticles(text) {
    try {
        const chatCompletion = await groq.chat.completions.create({
        "messages": [
            {
            "role": "user",
            "content": "You are an study assistant.).You have to find relevant articles based on the given text.Return them to me with their titles and links clickable using markdown  and a quick summary.Make sure the links are valid and available. Here is the text to explain:\n\n" + text
            }
        ],
        "model": "meta-llama/llama-4-scout-17b-16e-instruct",
        "temperature": 1,
        "max_completion_tokens": 1024,
        "top_p": 1,
        "stream": false,
        "stop": null
        });

        return chatCompletion.choices[0]?.message?.content || 'No articles found. Try again.';
    } catch (error) {
        console.error("Error finding articles:", error);
        return 'Error finding articles. Please try again.';
    }
}

export default groq;