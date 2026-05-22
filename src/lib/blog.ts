import fs from "fs";
import path from "path";

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  readingTime: number;
  keywords: string[];
}

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");

function parseFrontmatter(content: string): { data: Record<string, unknown>; body: string } {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { data: {}, body: content };

  const data: Record<string, unknown> = {};
  const frontmatter = match[1];
  const body = match[2];

  frontmatter.split("\n").forEach((line) => {
    const colonIndex = line.indexOf(":");
    if (colonIndex === -1) return;
    const key = line.slice(0, colonIndex).trim();
    const rawValue = line.slice(colonIndex + 1).trim();

    if (rawValue.startsWith('"') && rawValue.endsWith('"')) {
      data[key] = rawValue.slice(1, -1);
    } else if (rawValue.startsWith("[")) {
      const items = rawValue
        .slice(1, -1)
        .split(",")
        .map((s) => s.trim().replace(/"/g, ""));
      data[key] = items;
    } else if (!isNaN(Number(rawValue))) {
      data[key] = Number(rawValue);
    } else {
      data[key] = rawValue;
    }
  });

  return { data, body };
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"));

  return files
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const content = fs.readFileSync(path.join(BLOG_DIR, file), "utf-8");
      const { data } = parseFrontmatter(content);

      return {
        slug,
        title: String(data.title ?? ""),
        description: String(data.description ?? ""),
        date: String(data.date ?? ""),
        category: String(data.category ?? ""),
        readingTime: Number(data.readingTime ?? 5),
        keywords: Array.isArray(data.keywords) ? (data.keywords as string[]) : [],
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): (BlogPost & { content: string }) | null {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, body } = parseFrontmatter(raw);

  return {
    slug,
    title: String(data.title ?? ""),
    description: String(data.description ?? ""),
    date: String(data.date ?? ""),
    category: String(data.category ?? ""),
    readingTime: Number(data.readingTime ?? 5),
    keywords: Array.isArray(data.keywords) ? (data.keywords as string[]) : [],
    content: body,
  };
}
