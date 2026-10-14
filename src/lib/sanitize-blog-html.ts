import DOMPurify from "isomorphic-dompurify";

const BLOG_HTML_OPTIONS = {
  ALLOWED_TAGS: [
    "a",
    "blockquote",
    "br",
    "code",
    "del",
    "em",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "hr",
    "img",
    "li",
    "ol",
    "p",
    "pre",
    "s",
    "span",
    "strong",
    "u",
    "ul",
  ],
  ALLOWED_ATTR: [
    "alt",
    "height",
    "href",
    "rel",
    "src",
    "style",
    "target",
    "title",
    "width",
  ],
  ALLOW_DATA_ATTR: false,
};

export function sanitizeBlogHtml(content: string): string {
  return DOMPurify.sanitize(content, BLOG_HTML_OPTIONS);
}
