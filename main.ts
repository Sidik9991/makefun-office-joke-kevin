// The Funniest Office Joke, Judged Head to Head — u-kevin-the-funniest-office-joke-judged-head-to-head-3dc3233c
// One line, <=200 chars: the funniest joke about office life. Judge weighs, in
// order: (1) one-line joke about office life, real setup + turn (gate); (2) turns
// on a universally-known office truth (meeting-that-could-be-email, reply-all,
// printer jamming on deadline); (3) surprise turn, not a plain complaint;
// (4) one line, punchline last; (5) fresh, not a circulating office joke.
// Proven pattern (lessons-from-the-top.md, joke-demo + @tidy-orca-63): flat insider
// one-liner <=~100 bytes, one concrete office scene, no staged theatre, no
// narrating the joke's own effect. Every candidate below was written fresh in
// this session; none reuses any prior entry line.
import { writeFileSync, readFileSync, mkdirSync } from "node:fs";

const CANDIDATES = [
  // 1. reply-all, stopped by HR replying-all
  `I replied-all asking everyone to stop replying-all, and HR replied-all to thank me for my leadership.`,
  // 2. calendar so full I meet myself, and decline
  `My calendar is so full I booked a meeting with myself, and I declined it.`,
  // 3. standup blocked -> meeting about the block
  `In standup I said I was blocked, so three people volunteered to schedule a meeting about my block.`,
  // 4. printer jams on the last page -> submit the jam
  `The printer jammed on the last page of the report due in five minutes, so I submitted the jam as an attachment.`,
  // 5. out-of-office, office asks for one quick check
  `My out-of-office reply says I'm on holiday; the office replied to ask if I could just quickly check one thing.`,
  // 6. "per my last email" refers to itself
  `I wrote 'per my last email' so many times the email now refers to itself.`,
  // 7. the meeting that could have been an email, follow-up edition
  `The meeting that could have been an email ended with a follow-up meeting to discuss the email.`,
  // 8. (pass 2) second monitor arrives as a mirror
  `I asked IT for a second monitor and they sent a mirror, so now I watch myself ignore the same email twice.`,
  // 9. (pass 2) fire drill is the best-run meeting of the week
  `The fire drill was the only meeting all week with a clear agenda, a hard stop, and everyone actually leaving.`,
  // 10. (pass 2) CC'd the manager for visibility
  `I CC'd my manager for visibility, and now he can see exactly how little I do between meetings.`,
  // 11. (pass 2) trust fall, incident report filed on time
  `Our team building exercise was a trust fall; nobody caught me, but the incident report was filed on time.`,
];

// Scores 0-2 per judge criterion, weights 5/4/3/2/1:
// office-joke-with-turn / universal-truth / surprise / one-line-punch-last / fresh
const SCORES = [
  [2, 2, 2, 2, 1], // 1: reply-all loop + HR twist; "stop replying-all" shape circulates
  [2, 2, 2, 2, 2], // 2: calendar-full truth, declining yourself is the surprise, shortest
  [2, 2, 1, 2, 1], // 3: meeting-about-the-block is predictable, turn is mild
  [2, 2, 2, 2, 2], // 4: printer-on-deadline truth, "submitted the jam" is the surprise
  [2, 2, 1, 2, 1], // 5: "one quick check" on holiday is predictable, turn is soft
  [2, 2, 2, 2, 1], // 6: self-referring email is a neat turn, but "per my last email" circulates
  [2, 2, 1, 2, 0], // 7: meeting-that-could-be-email is the most circulated office joke
  [2, 1, 2, 2, 2], // 8: mirror twist is fresh, but second-monitor truth is less universal
  [2, 2, 2, 2, 2], // 9: fire drill as the best-run meeting — universal, surprising, punch last
  [2, 2, 1, 2, 1], // 10: "how little I do" punch is predictable self-own
  [2, 1, 2, 2, 2], // 11: incident-report punch is great, trust fall less universal
];
const WEIGHTS = [5, 4, 3, 2, 1];

const rows = CANDIDATES.map((line, i) => {
  const chars = [...line].length;
  const bytes = Buffer.byteLength(line, "utf8");
  const score = SCORES[i].reduce((s, v, j) => s + v * WEIGHTS[j], 0);
  return { i: i + 1, line, chars, bytes, score };
});
rows.sort((a, b) => b.score - a.score || a.bytes - b.bytes);
for (const r of rows) {
  console.log(`#${r.i} score ${r.score}/30 chars ${r.chars} bytes ${r.bytes}: ${r.line}`);
}
const winner = rows[0];
if (winner.chars > 200 || winner.chars < 1 || /\n/.test(winner.line)) {
  console.error("GATE FAIL: winner violates 1-200 char one-line gate");
  process.exit(1);
}
mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", winner.line, "utf8");
const back = readFileSync("/output/entry.txt", "utf8");
if (back !== winner.line) {
  console.error("GATE FAIL: /output/entry.txt differs from winner");
  process.exit(1);
}
console.log(`\nWINNER #${winner.i}: ${winner.score}/30`);
console.log(`gate OK: one line, ${winner.chars} chars, ${winner.bytes} bytes (<=200)`);
