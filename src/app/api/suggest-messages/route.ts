const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const randomThemes = [
  "hobbies",
  "travel",
  "personal growth",
  "entertainment",
  "coding",
  "programming",
  "future goals",
  "books",
  "relationships",
  "cricket",
  "memes",
  "personal questions"
];

export async function GET() {
  try {
    const randomTheme =
      randomThemes[Math.floor(Math.random() * randomThemes.length)];

    const prompt = `Create a list of three unique and short question words range 10-15, open-ended, and engaging questions focusing on the theme of "${randomTheme}". Each question should be separated by '||'. These questions are for an anonymous social messaging platform like Qooh.me. Avoid personal or sensitive topics, and ensure the questions encourage interaction, curiosity, and positivity.`;

    const result = await model.generateContent(prompt);

    console.log("result is here", result);

    return Response.json(
      {
        success: true,
        message: result.response.text(),
      },
      { status: 200 }
    );

  } catch (error) {
    console.log("error is here", error)
    return Response.json(
      {
        success: true,
        message: "Error while generating the messages!",
      },
      { status: 501 }
    );
  }
}
