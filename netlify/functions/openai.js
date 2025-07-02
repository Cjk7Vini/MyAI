// netlify/functions/openai.js

import fetch from 'node-fetch';

export async function handler(event, context) {
  const body = JSON.parse(event.body);
  const query = body.query;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer jsk-proj-jQ-wGiV9-veb4-q5Zefjn2uPi2mWEyUA03eaaT-hhdhuCtnaaUtOPSI3rNCN6w4qEdW0VaOtg4T3BlbkFJLPqhMNPrbSXPMDOmnP7kP4eDmMwcToeSdy7vf8H9ZIDHjHWOcyHdFnYR5LWz4C_YFz-4RbmkgA`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: query }],
      }),
    });

    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify({ answer: data.choices[0].message.content }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
}
