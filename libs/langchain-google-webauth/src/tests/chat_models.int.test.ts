import { test } from "@jest/globals";
import {
  AIMessage,
  AIMessageChunk,
  BaseMessage,
  BaseMessageChunk,
  HumanMessage,
  MessageContentComplex,
  MessageContentText,
  SystemMessage,
} from "@langchain/core/messages";
import { BaseLanguageModelInput } from "@langchain/core/language_models/base";
import { ChatPromptValue } from "@langchain/core/prompt_values";
import { GoogleAISafetySetting } from "@langchain/google-common";
import { ChatGoogle } from "../chat_models.js";

describe("Google APIKey Chat", () => {
  test("invoke", async () => {
    const model = new ChatGoogle();
    try {
      const res = await model.invoke("What is the answer to life the universe and everything? Answer briefly.");
      expect(res).toBeDefined();
      expect(res._getType()).toEqual("ai");

      const aiMessage = res as AIMessageChunk;
      expect(aiMessage.content).toBeDefined();
      expect(aiMessage.content.length).toBeGreaterThan(0);
      expect(aiMessage.content[0]).toBeDefined();

      const content = aiMessage.content[0] as MessageContentComplex;
      expect(content).toHaveProperty("type");
      expect(content.type).toEqual("text");

      const textContent = content as MessageContentText;
      expect(textContent.text).toBeDefined();
      expect(textContent.text).toEqual("42");
    } catch (e) {
      console.error(e);
      throw e;
    }
  });

  test("generate", async () => {
    const safetySettings: GoogleAISafetySetting[] = [
      {
        "category": "HARM_CATEGORY_HARASSMENT",
        "threshold": "BLOCK_ONLY_HIGH"
      },
      {
        "category": "HARM_CATEGORY_HATE_SPEECH",
        "threshold": "BLOCK_ONLY_HIGH"
      },
      {
        "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
        "threshold": "BLOCK_ONLY_HIGH"
      },
      {
        "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
        "threshold": "BLOCK_ONLY_HIGH"
      },
    ];
    const model = new ChatGoogle({safetySettings});
    try {
      const messages: BaseMessage[] = [
        new SystemMessage(
          "You will reply to all requests to toss a coin with either H, indicating heads, or T, indicating tails."
        ),
        new HumanMessage("Toss the coin"),
        new AIMessage("T"),
        new HumanMessage("Toss the coin again"),
      ];
      const res = await model.predictMessages(messages);
      expect(res).toBeDefined();
      expect(res._getType()).toEqual("ai");

      const aiMessage = res as AIMessageChunk;
      expect(aiMessage.content).toBeDefined();
      expect(aiMessage.content.length).toBeGreaterThan(0);
      expect(aiMessage.content[0]).toBeDefined();

      const content = aiMessage.content[0] as MessageContentComplex;
      expect(content).toHaveProperty("type");
      expect(content.type).toEqual("text");

      const textContent = content as MessageContentText;
      expect(textContent.text).toBeDefined();
      expect(["H", "T"]).toContainEqual(textContent.text);
    } catch (e) {
      console.error(JSON.stringify(e,null,1));
      throw e;
    }
  });

  test("stream", async () => {
    const safetySettings: GoogleAISafetySetting[] = [
      {
        "category": "HARM_CATEGORY_HARASSMENT",
        "threshold": "BLOCK_ONLY_HIGH"
      },
      {
        "category": "HARM_CATEGORY_HATE_SPEECH",
        "threshold": "BLOCK_ONLY_HIGH"
      },
      {
        "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
        "threshold": "BLOCK_ONLY_HIGH"
      },
      {
        "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
        "threshold": "BLOCK_ONLY_HIGH"
      },
    ];
    const model = new ChatGoogle({safetySettings});
    try {
      const input: BaseLanguageModelInput = new ChatPromptValue([
        new SystemMessage(
          "You will reply to all requests to flip a coin with either H, indicating heads, or T, indicating tails."
        ),
        new HumanMessage("Flip the coin"),
        new AIMessage("T"),
        new HumanMessage("Flip the coin again"),
      ]);
      const res = await model.stream(input);
      const resArray: BaseMessageChunk[] = [];
      for await (const chunk of res) {
        resArray.push(chunk);
      }
      expect(resArray).toBeDefined();
      expect(resArray.length).toBeGreaterThanOrEqual(1);

      const lastChunk = resArray[resArray.length - 1];
      expect(lastChunk).toBeDefined();
      expect(lastChunk._getType()).toEqual("ai");
      const aiChunk = lastChunk as AIMessageChunk;
      console.log(aiChunk);

      console.log(JSON.stringify(resArray, null, 2));
    } catch (e) {
      console.error(JSON.stringify(e,null,1));
      throw e;
    }
  });
});

describe("Google Webauth Chat", () => {
  test("invoke", async () => {
    const model = new ChatGoogle();
    try {
      const res = await model.invoke("What is 1 + 1?");
      expect(res).toBeDefined();
      expect(res._getType()).toEqual("ai");

      const aiMessage = res as AIMessageChunk;
      expect(aiMessage.content).toBeDefined();
      expect(aiMessage.content.length).toBeGreaterThan(0);
      expect(aiMessage.content[0]).toBeDefined();

      const content = aiMessage.content[0] as MessageContentComplex;
      expect(content).toHaveProperty("type");
      expect(content.type).toEqual("text");

      const textContent = content as MessageContentText;
      expect(textContent.text).toBeDefined();
      expect(textContent.text).toEqual("2");
    } catch (e) {
      console.error(e);
      throw e;
    }
  });

  test("generate", async () => {
    const model = new ChatGoogle();
    try {
      const messages: BaseMessage[] = [
        new SystemMessage(
          "You will reply to all requests to flip a coin with either H, indicating heads, or T, indicating tails."
        ),
        new HumanMessage("Flip it"),
        new AIMessage("T"),
        new HumanMessage("Flip the coin again"),
      ];
      const res = await model.predictMessages(messages);
      expect(res).toBeDefined();
      expect(res._getType()).toEqual("ai");

      const aiMessage = res as AIMessageChunk;
      expect(aiMessage.content).toBeDefined();
      expect(aiMessage.content.length).toBeGreaterThan(0);
      expect(aiMessage.content[0]).toBeDefined();

      const content = aiMessage.content[0] as MessageContentComplex;
      expect(content).toHaveProperty("type");
      expect(content.type).toEqual("text");

      const textContent = content as MessageContentText;
      expect(textContent.text).toBeDefined();
      expect(["H", "T"]).toContainEqual(textContent.text);
    } catch (e) {
      console.error(e);
      throw e;
    }
  });

  test("stream", async () => {
    const model = new ChatGoogle();
    try {
      const input: BaseLanguageModelInput = new ChatPromptValue([
        new SystemMessage(
          "You will reply to all requests to flip a coin with either H, indicating heads, or T, indicating tails."
        ),
        new HumanMessage("Flip it"),
        new AIMessage("T"),
        new HumanMessage("Flip the coin again"),
      ]);
      const res = await model.stream(input);
      const resArray: BaseMessageChunk[] = [];
      for await (const chunk of res) {
        resArray.push(chunk);
      }
      expect(resArray).toBeDefined();
      expect(resArray.length).toBeGreaterThanOrEqual(1);

      const lastChunk = resArray[resArray.length - 1];
      expect(lastChunk).toBeDefined();
      expect(lastChunk._getType()).toEqual("ai");
      const aiChunk = lastChunk as AIMessageChunk;
      console.log(aiChunk);

      console.log(JSON.stringify(resArray, null, 2));
    } catch (e) {
      console.error(e);
      throw e;
    }
  });
});
