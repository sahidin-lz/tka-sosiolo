import fs from 'fs';
let code = fs.readFileSync('src/components/CbtExamView.tsx', 'utf8');

code = code.replace(
  "const currentQuestion: Question = exam.questions[currentQuestionIndex];",
  `const currentQuestion: Question | undefined = exam.questions[currentQuestionIndex];

  if (!currentQuestion) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50">
        <div className="bg-white p-8 rounded-2xl shadow-xl text-center space-y-4 max-w-md w-full">
          <AlertTriangle className="w-12 h-12 text-red-500 mx-auto" />
          <h2 className="text-xl font-bold text-slate-800">Error Memuat Soal</h2>
          <p className="text-sm text-slate-600">Soal tidak ditemukan atau data korup. Silakan kembali ke dashboard.</p>
          <button
            onClick={onCancelExam}
            className="px-6 py-2 bg-slate-900 text-white rounded-xl text-sm font-bold shadow hover:bg-slate-800 transition-all"
          >
            Kembali ke Dashboard
          </button>
        </div>
      </div>
    );
  }`
);

fs.writeFileSync('src/components/CbtExamView.tsx', code);
