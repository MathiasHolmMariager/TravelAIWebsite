import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: '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',
  dangerouslyAllowBrowser: true
});

export async function OpenAItest(prompt, conversationHistory = []) {
  const completion = await openai.chat.completions.create({
    messages: [
      { role: "system", content: "You are a helpful AI assistant" },
      ...conversationHistory,
      { role: "user", content: prompt }
    ],
    model: "gpt-3.5-turbo",
  });

  const assistantReply = completion.choices[0].message.content;
  conversationHistory.push({ role: "user", content: prompt });
  conversationHistory.push({ role: "assistant", content: assistantReply });

  return { assistantReply, conversationHistory };
}
