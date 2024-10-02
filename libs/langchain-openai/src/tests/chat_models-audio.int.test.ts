import { test } from "@jest/globals";
import * as fs from "node:fs/promises";
import { fileURLToPath } from "node:url";
import * as path from "node:path";
import { ChatOpenAI } from "../chat_models.js";

test("Test ChatOpenAI completions with audio input", async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const audioData = await fs.readFile(
    path.join(__dirname, "/data/gettysburg10.wav")
  );
  const chat = new ChatOpenAI({
    modelName: "gpt-4o-realtime-preview-2024-10-01",
    maxTokens: 1024,
  });
  const message = {
    role: "user",
    content: [
      {
        type: "text",
        text: "Translate the following audio into German.",
      },
      {
        type: "input_audio",
        input_audio: {
          data: `data:audio/wav;base64,${audioData.toString("base64")}`,
          format: "wav",
        },
      },
    ],
  };
  const res = await chat.invoke([message]);
  console.log(res);
});
