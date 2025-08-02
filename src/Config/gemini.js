
const apiKey = 'AIzaSyC7CZNZphq2Radr7mxscbUgBG27C1EjfZY';
const model = 'gemini-2.5-pro';
const api = 'streamGenerateContent';
const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:${api}?key=${apiKey}`;

async function runChat(userPrompt) {
  const payload = {
    contents: [
      {
        role: 'user',
        parts: [
          {
            text: userPrompt
          }
        ]
      }
    ],
    generationConfig: {
      thinkingConfig: {
        thinkingBudget: -1
      },
      responseMimeType: 'text/plain'
    },
    tools: [
      {
        googleSearch: {}
      }
    ]
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const responseText = await response.text();

    const chunks = JSON.parse(responseText);
    var responseString="";
    for (const chunk of chunks) {
      responseString += chunk.candidates[0].content.parts[0].text;
      //console.log(chunk.candidates[0].content.parts[0].text);
    }

    return responseString;
  } catch (error) {
    console.error('Error:', error);
  }
}


export default runChat;
