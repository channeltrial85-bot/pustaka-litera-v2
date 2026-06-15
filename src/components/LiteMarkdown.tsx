import React from "react";

interface LiteMarkdownProps {
  content: string;
}

export default function LiteMarkdown({ content }: LiteMarkdownProps) {
  if (!content) return null;

  // Split content by lines to reconstruct paragraphs, headers, and bullet points
  const lines = content.split("\n");

  return (
    <div className="space-y-3 text-slate-700 leading-relaxed text-sm">
      {lines.map((line, idx) => {
        const trimmed = line.trim();

        if (!trimmed) {
          return <div key={idx} className="h-2" />;
        }

        // Subheaders
        if (trimmed.startsWith("###")) {
          const headerText = trimmed.replace(/^###\s*/, "");
          return (
            <h4 key={idx} className="text-base font-bold text-slate-800 mt-4 mb-1 font-sans tracking-tight">
              {parseBoldText(headerText)}
            </h4>
          );
        }

        if (trimmed.startsWith("##")) {
          const headerText = trimmed.replace(/^##\s*/, "");
          return (
            <h3 key={idx} className="text-lg font-extrabold text-slate-900 mt-5 mb-2 font-sans tracking-tight">
              {parseBoldText(headerText)}
            </h3>
          );
        }

        // Bullet lists
        if (trimmed.startsWith("-") || trimmed.startsWith("*")) {
          const listText = trimmed.replace(/^[-*]\s*/, "");
          return (
            <ul key={idx} className="list-disc list-outside pl-5 space-y-1">
              <li className="text-slate-600">{parseBoldText(listText)}</li>
            </ul>
          );
        }

        // Standard Paragraph with inline bold parsing
        return (
          <p key={idx} className="text-slate-600 text-justify">
            {parseBoldText(trimmed)}
          </p>
        );
      })}
    </div>
  );
}

// Inline Bold parsing helper: converts **text** to <strong>text</strong>
function parseBoldText(text: string) {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      const clean = part.slice(2, -2);
      return (
        <strong key={index} className="font-semibold text-slate-900">
          {clean}
        </strong>
      );
    }
    return part;
  });
}
