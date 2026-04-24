import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const TARGET_FILES = [".cursorrules", "spec.md"];

function normalizeLeadingFrontmatterBlocks(input) {
  let cursor = 0;
  const blocks = [];

  while (input.slice(cursor).startsWith("---")) {
    const start = cursor;
    cursor += 3;
    if (input[cursor] === "\r") cursor += 1;
    if (input[cursor] === "\n") cursor += 1;

    const closingIdx = input.indexOf("\n---", cursor);
    if (closingIdx === -1) break;

    const content = input.slice(cursor, closingIdx);
    cursor = closingIdx + 4; // skip "\n---"
    if (input[cursor] === "\r") cursor += 1;
    if (input[cursor] === "\n") cursor += 1;

    // Skip extra empty lines between duplicated blocks.
    while (input[cursor] === "\r" || input[cursor] === "\n") cursor += 1;
    blocks.push({ start, end: cursor, content });
  }

  if (blocks.length <= 1) return input;

  const meaningful = blocks.find((b) => b.content.trim().length > 0);
  const afterBlocks = input.slice(blocks.at(-1).end);

  if (!meaningful) {
    return afterBlocks;
  }

  const normalizedContent = meaningful.content.replace(/\s+$/g, "");
  return `---\n${normalizedContent}\n---\n\n${afterBlocks.replace(/^\s+/, "")}`;
}

async function normalizeFile(filePath) {
  const absolutePath = resolve(filePath);
  try {
    const before = await readFile(absolutePath, "utf8");
    const after = normalizeLeadingFrontmatterBlocks(before);
    if (before !== after) {
      await writeFile(absolutePath, after, "utf8");
      console.log(`normalized: ${filePath}`);
    } else {
      console.log(`unchanged: ${filePath}`);
    }
  } catch (error) {
    if (error && error.code === "ENOENT") {
      console.log(`skipped (missing): ${filePath}`);
      return;
    }
    throw error;
  }
}

await Promise.all(TARGET_FILES.map(normalizeFile));
