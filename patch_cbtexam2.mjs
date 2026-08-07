import fs from 'fs';
let code = fs.readFileSync('src/components/CbtExamView.tsx', 'utf8');

code = code.replace(
  /exam\.total_questions/g,
  "exam.questions.length"
);

fs.writeFileSync('src/components/CbtExamView.tsx', code);
