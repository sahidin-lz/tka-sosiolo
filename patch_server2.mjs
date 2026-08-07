import fs from 'fs';
let code = fs.readFileSync('server.ts', 'utf8');

code = code.replace(
  /exam\.total_questions/g,
  "exam.questions.length"
);

fs.writeFileSync('server.ts', code);
