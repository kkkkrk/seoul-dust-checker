import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

async function checkSeoulDust() {
  const now = new Date().toLocaleString("ko-KR", { timeZone: "Asia/Seoul" });
  console.log(`\n🕐 실행 시각: ${now}\n`);

  const response = await client.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 1000,
    tools: [{ type: "web_search_20250305", name: "web_search" }],
    messages: [
      {
        role: "user",
        content: `지금 서울시 미세먼지(PM10)와 초미세먼지(PM2.5) 현황을 알려줘.
구별로 수치와 등급(좋음/보통/나쁨/매우나쁨)을 포함해서 간단하게 정리해줘.`,
      },
    ],
  });

  const text = response.content
    .filter((block) => block.type === "text")
    .map((block) => block.text)
    .join("\n");

  console.log("📊 서울 미세먼지 현황");
  console.log("=".repeat(40));
  console.log(text);
  console.log("=".repeat(40));
}

checkSeoulDust().catch(console.error);
