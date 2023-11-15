const OpenAI = require("openai");
const dotenv = require('dotenv'); //dotenv使うときはコメントアウト外してください
dotenv.config();

const apiKey = process.env.OPENAI_API_KEY || 'copy paste'

const openai = new OpenAI({apiKey})

const main = async () => {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: "You are a helpful assistant." }],
    model: "gpt-3.5-turbo-1106",
  });
  console.log(completion.choices[0]);
}

main();