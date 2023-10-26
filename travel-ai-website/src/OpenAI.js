import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: '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'});

export async function OpenAItest() {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: "Who won the 1992 European Championship in football?" }],
    model: "gpt-3.5-turbo",
  });

  const testtest = completion.choices[0].message.content;

  return testtest;
}