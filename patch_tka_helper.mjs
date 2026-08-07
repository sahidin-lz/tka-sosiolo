import fs from 'fs';
let code = fs.readFileSync('src/utils/tkaQuestionHelper.ts', 'utf8');

code = code.replace(
  "export function detectTkaType(q: Question): TkaType {\n  if (q.question_type) {",
  "export function detectTkaType(q: Question | undefined): TkaType {\n  if (!q) return 'pilihan_ganda';\n  if (q.question_type) {"
);

code = code.replace(
  "export function getTkaTypeDetails(q: Question): TkaTypeDetails {",
  "export function getTkaTypeDetails(q: Question | undefined): TkaTypeDetails {"
);

code = code.replace(
  "export function getOptionText(q: Question, key: 'A' | 'B' | 'C' | 'D' | 'E'): string {",
  "export function getOptionText(q: Question | undefined, key: 'A' | 'B' | 'C' | 'D' | 'E'): string {\n  if (!q) return '';"
);

fs.writeFileSync('src/utils/tkaQuestionHelper.ts', code);
