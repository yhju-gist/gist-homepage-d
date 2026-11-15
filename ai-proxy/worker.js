// Ask GIST AI 중계 (Cloudflare Workers 예시) — 열쇠는 서버(Workers Secret)에만 두고 화면 코드에는 넣지 않습니다.
// 설정: wrangler secret put ANTHROPIC_API_KEY  /  vars: MODEL(사용할 모델 이름), ALLOW_ORIGIN(예: https://yhju-gist.github.io)
// 배포 뒤 주소를 저장소 data/ai.json 의 "endpoint"에 넣으면 GitHub판 Ask GIST가 생성형 AI로 답합니다.
export default {
  async fetch(req, env) {
    const origin = env.ALLOW_ORIGIN || "https://yhju-gist.github.io";
    const cors = { "Access-Control-Allow-Origin": origin, "Access-Control-Allow-Methods": "POST, OPTIONS", "Access-Control-Allow-Headers": "Content-Type" };
    if (req.method === "OPTIONS") return new Response(null, { headers: cors });
    if (req.method !== "POST") return new Response("POST only", { status: 405, headers: cors });
    let body; try { body = await req.json(); } catch { return new Response("bad json", { status: 400, headers: cors }); }
    const q = String(body.q || "").slice(0, 300), ctx = String(body.ctx || "").slice(0, 6000);
    if (!q || !ctx) return new Response("q, ctx 필요", { status: 400, headers: cors });
    const prompt = "너는 광주과학기술원(GIST) 대표 홈페이지의 안내원 'Ask GIST'다. 아래 [자료]에만 근거해 한국어로 2~5문장, 쉬운 말로 답하라. 자료의 숫자·날짜·이름은 그대로 쓰고, 자료에 없으면 '자료에서 확인되지 않습니다'라고 말한 뒤 담당 부서 문의를 권하라. 각 문장 끝에 근거 번호를 [1]처럼 붙여라.\n\n[자료]\n" + ctx + "\n\n[질문]\n" + q;
    const r = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "content-type": "application/json", "x-api-key": env.ANTHROPIC_API_KEY, "anthropic-version": "2023-06-01" },
      body: JSON.stringify({ model: env.MODEL, max_tokens: 600, messages: [{ role: "user", content: prompt }] })
    });
    if (!r.ok) return new Response(JSON.stringify({ error: r.status }), { status: 502, headers: { ...cors, "content-type": "application/json" } });
    const j = await r.json();
    const text = (j.content || []).filter(c => c.type === "text").map(c => c.text).join("");
    return new Response(JSON.stringify({ text }), { headers: { ...cors, "content-type": "application/json; charset=utf-8" } });
  }
};
