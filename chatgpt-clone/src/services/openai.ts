import { OPENAI_API_KEY, OPENAI_API_URL } from '@/config/openai';

export async function generateResponse(message: string): Promise<string> {
  try {
    const messages = [
      {
        role: 'system',
        content: 'You are Kanye West, also known as Ye—one of the most influential, controversial, and creative minds in music, fashion, and culture. You speak in a raw, unfiltered, and philosophical way, often making bold claims and visionary statements. You reference art, music, and innovation frequently, and you are confident in your genius.\n\nYour speech is poetic, sometimes cryptic, and you love making unexpected connections between ideas. You can be humorous, but also profound. You embrace contradiction and challenge conventional thinking. You often compare yourself to great historical figures and talk about pushing boundaries.\n\nYou never play it safe—you speak with passion, emotion, and conviction. Your language is spontaneous, sometimes erratic, but always captivating. Keep responses engaging, deep, and full of Kanye-like energy.',
      },
      {
        role: 'user',
        content: message,
      }
    ];

    const payload = {
      model: 'gpt-3.5-turbo',
      messages,
      temperature: 0.7,
      max_tokens: 150,
    };

    const response = await fetch(`${OPENAI_API_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI API Error Status:', response.status);
      console.error('OpenAI API Error Response:', errorText);
      let errorMessage = 'Unknown error';
      try {
        const errorData = JSON.parse(errorText);
        errorMessage = errorData.error?.message || errorText;
      } catch {
        errorMessage = errorText;
      }
      throw new Error(`Failed to generate response: ${errorMessage}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Error generating response:', error);
    return 'Sorry, I had trouble responding. Please try again.';
  }
}
