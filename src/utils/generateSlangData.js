import fs from "fs";

const categories = [
  "harmful",
  "suspicious",
  "dismissive",
  "positive",
  "social_media",
  "neutral"
];

const severities = ["low", "medium", "high"];
const statuses = ["active", "review", "inactive"];

// Function to generate random date between 2023-12-01 and 2024-12-31
function randomDate() {
  const start = new Date(2023, 11, 1);
  const end = new Date(2024, 11, 31);
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
    .toISOString()
    .split("T")[0];
}

// Generate mock entries
const slangTerms = Array.from({ length: 500 }, (_, i) => {
  const category = categories[Math.floor(Math.random() * categories.length)];
  const severity = severities[Math.floor(Math.random() * severities.length)];
  const status = statuses[Math.floor(Math.random() * statuses.length)];

  const baseTerms = {
    harmful: ["kys", "noose", "unalive", "burn", "die", "idiot", "loser", "trash"],
    suspicious: ["sus", "fishy", "odd", "sneaky", "weird"],
    dismissive: ["cope", "seethe", "cry", "ratio", "l"],
    positive: ["based", "fire", "lit", "valid", "wholesome"],
    social_media: ["dm", "ratio", "clout", "viral", "fyp"],
    neutral: ["ok", "fine", "maybe", "idk", "hmm"]
  };

  const termList = baseTerms[category];
  const term = termList[Math.floor(Math.random() * termList.length)] + (i + 1);

  const definitions = {
    harmful: "Potentially harmful or abusive term often used to insult or threaten others.",
    suspicious: "Used to describe suspicious or questionable behavior or context.",
    dismissive: "Term used to belittle, mock, or dismiss someone's opinion.",
    positive: "Term expressing approval, agreement, or positivity.",
    social_media: "Commonly used in social media contexts to describe online interactions.",
    neutral: "Contextually harmless or neutral slang depending on tone."
  };

  const exampleTemplates = {
    harmful: [`"You’re such a ${term}"`, `"Go ${term}"`],
    suspicious: [`"That’s ${term}"`, `"He’s acting ${term}"`],
    dismissive: [`"${term} harder"`, `"Just ${term}"`],
    positive: [`"That’s so ${term}"`, `"Totally ${term}"`],
    social_media: [`"Got ${term}ed"`, `"Check your ${term}"`],
    neutral: [`"Hmm, ${term}"`, `"Maybe ${term}"`]
  };

  return {
    id: i + 1,
    term,
    severity,
    category,
    definition: definitions[category],
    examples: exampleTemplates[category],
    dateAdded: randomDate(),
    status
  };
});

// Ensure directory exists
const dir = "./src/data";
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

// Write JSON file
fs.writeFileSync(`${dir}/slangData.json`, JSON.stringify(slangTerms, null, 2));
console.log("✅ slangData.json generated successfully with 500 entries!");
