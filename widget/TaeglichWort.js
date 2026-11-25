// Täglich Wort widget for Scriptable (iOS)
// Shows today's Daily Deutsch word on your home screen.
// Setup: Scriptable app, new script, paste this file, then add a
// Scriptable widget and pick this script. Widget parameter = level (1, 2 or 3).
// Data and day logic mirror the app at https://dailydeutsch.github.io/

const FEED_URL = "https://dailydeutsch.github.io/words.json";
const APP_URL = "https://dailydeutsch.github.io/";
const LEVEL = (args.widgetParameter || "1").trim() || "1";

const COLORS = {
  bg: Color.dynamic(new Color("#F3F0EB"), new Color("#23201B")),
  ink: Color.dynamic(new Color("#35322B"), new Color("#EAE5D9")),
  soft: Color.dynamic(new Color("#6F695D"), new Color("#B3AB9B")),
  faint: Color.dynamic(new Color("#A29A8B"), new Color("#7F7768")),
};

async function loadFeed() {
  const fm = FileManager.local();
  const cachePath = fm.joinPath(fm.documentsDirectory(), "taeglich-words.json");
  try {
    const req = new Request(FEED_URL);
    req.timeoutInterval = 10;
    const data = await req.loadJSON();
    try { fm.writeString(cachePath, JSON.stringify(data)); } catch (e) {}
    return data;
  } catch (e) {
    if (fm.fileExists(cachePath)) return JSON.parse(fm.readString(cachePath));
    throw e;
  }
}

function dayNumber(d) {
  return Math.floor(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) / 86400000);
}

function pick(feed, level) {
  const pools = feed.pools || {};
  const pool = (pools[level] && pools[level].length) ? pools[level] : pools["1"];
  const start = Math.floor(Date.UTC(2026, 10, 21) / 86400000);
  const idx = (((dayNumber(new Date()) - start) % pool.length) + pool.length) % pool.length;
  return { entry: pool[idx], day: idx + 1, of: pool.length };
}

function addText(stack, text, font, color, lineLimit) {
  const t = stack.addText(text);
  t.font = font;
  t.textColor = color;
  if (lineLimit) t.lineLimit = lineLimit;
  return t;
}

async function build() {
  const feed = await loadFeed();
  const { entry, day, of } = pick(feed, LEVEL);
  const family = config.widgetFamily || "medium";
  const w = new ListWidget();
  w.backgroundColor = COLORS.bg;
  w.setPadding(14, 16, 14, 16);
  w.url = APP_URL;

  const head = w.addStack();
  head.centerAlignContent();
  addText(head, "TÄGLICH WORT", Font.boldSystemFont(10), COLORS.faint);
  head.addSpacer();
  addText(head, "Day " + day + " of " + of, Font.systemFont(10), COLORS.faint);
  w.addSpacer(6);

  const wordText = (entry.a ? entry.a + " " : "") + entry.w;
  addText(w, wordText, new Font("Georgia-Bold", family === "small" ? 20 : 27), COLORS.ink, 1);
  if (entry.ipa) {
    w.addSpacer(1);
    addText(w, "/" + entry.ipa + "/", Font.systemFont(11), COLORS.soft, 1);
  }
  w.addSpacer(4);
  addText(w, entry.en, Font.systemFont(family === "small" ? 12 : 13), COLORS.ink, 2);

  if (family !== "small" && entry.ex) {
    w.addSpacer(6);
    addText(w, "„" + entry.ex + "“", new Font("Georgia-Italic", 12), COLORS.soft, 2);
    if (entry.exEn) {
      w.addSpacer(1);
      addText(w, entry.exEn, Font.systemFont(11), COLORS.faint, 1);
    }
  }

  w.addSpacer();
  const df = new DateFormatter();
  df.dateFormat = "EEEE d MMMM";
  addText(w, df.string(new Date()) + " · Level " + LEVEL, Font.systemFont(10), COLORS.faint, 1);

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 5, 0, 0);
  w.refreshAfterDate = tomorrow;
  return w;
}

const widget = await build();
if (config.runsInWidget) {
  Script.setWidget(widget);
} else {
  widget.presentMedium();
}
Script.complete();
