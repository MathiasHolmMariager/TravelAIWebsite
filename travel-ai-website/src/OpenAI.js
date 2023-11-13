import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: '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',
  dangerouslyAllowBrowser: true});

export async function OpenAItest(prompt) {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: "You are a helpfull AI assisantant"},{ role: "user", content: prompt}],
    model: "gpt-3.5-turbo",
  }); 

  const testtest = completion.choices[0].message.content;

  return testtest;
}