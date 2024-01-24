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

  return { assistantReply, conversationHistory};
}