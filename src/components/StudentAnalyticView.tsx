import React, { useMemo } from 'react';
import { Exam, ExamSession } from '../types';
import { Target, CheckCircle2, XCircle, TrendingUp, AlertTriangle } from 'lucide-react';

interface StudentAnalyticViewProps {
  session: ExamSession;
  exam: Exam;
}

interface TopicAnalysis {
  topic: string;
  total: number;
  correct: number;
  percentage: number;
}

const StudentAnalyticView: React.FC<StudentAnalyticViewProps> = ({ session, exam }) => {
  const analysis = useMemo(() => {
    const topicMap = new Map<string, { total: number; correct: number }>();

    exam.questions.forEach((q) => {
      const topic = q.topic || 'General';
      if (!topicMap.has(topic)) {
        topicMap.set(topic, { total: 0, correct: 0 });
      }

      const stat = topicMap.get(topic)!;
      stat.total += 1;

      const userAnswer = session.answers[q.id]?.selected_option;
      if (userAnswer === q.correct_answer) {
        stat.correct += 1;
      }
    });

    const result: TopicAnalysis[] = [];
    topicMap.forEach((stat, topic) => {
      result.push({
        topic,
        total: stat.total,
        correct: stat.correct,
        percentage: Math.round((stat.correct / stat.total) * 100),
      });
    });

    return result.sort((a, b) => b.percentage - a.percentage);
  }, [session, exam]);

  const masteredTopics = analysis.filter((t) => t.percentage >= 75);
  const reviewTopics = analysis.filter((t) => t.percentage < 75);

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-8">
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-800 flex items-center gap-2">
            <Target className="w-6 h-6 text-indigo-500" />
            Analisis Hasil Evaluasi
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            {exam.title} • {session.total_questions} Soal
          </p>
        </div>
        <div className="bg-indigo-50 px-4 py-2 rounded-xl border border-indigo-100 flex items-center gap-3">
          <div className="text-right">
            <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider">Skor Akhir</p>
            <p className="text-xl font-black text-indigo-700">{Math.round(session.score)}/100</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Mastered Topics */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-emerald-600 mb-4">
            <CheckCircle2 className="w-5 h-5" />
            <h3 className="font-bold text-slate-800">Topik yang Sudah Dikuasai</h3>
          </div>
          
          {masteredTopics.length > 0 ? (
            <div className="space-y-4">
              {masteredTopics.map((item, idx) => (
                <div key={idx} className="bg-emerald-50/50 p-4 rounded-2xl border border-emerald-100">
                  <div className="flex justify-between items-end mb-2">
                    <p className="font-bold text-slate-700 text-sm">{item.topic}</p>
                    <span className="text-xs font-black text-emerald-600 bg-emerald-100 px-2 py-1 rounded-lg">
                      {item.percentage}%
                    </span>
                  </div>
                  <div className="w-full bg-emerald-100 rounded-full h-2">
                    <div
                      className="bg-emerald-500 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                  <p className="text-[10px] text-emerald-600 mt-2 font-medium">
                    Benar {item.correct} dari {item.total} soal
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-8 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
              <TrendingUp className="w-8 h-8 text-slate-300 mb-2" />
              <p className="text-sm text-slate-500 font-medium text-center">
                Belum ada topik yang dikuasai sepenuhnya. Terus semangat belajar!
              </p>
            </div>
          )}
        </div>

        {/* Topics to Review */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-rose-500 mb-4">
            <AlertTriangle className="w-5 h-5" />
            <h3 className="font-bold text-slate-800">Topik yang Perlu Dievaluasi</h3>
          </div>

          {reviewTopics.length > 0 ? (
            <div className="space-y-4">
              {reviewTopics.map((item, idx) => (
                <div key={idx} className="bg-rose-50/50 p-4 rounded-2xl border border-rose-100">
                  <div className="flex justify-between items-end mb-2">
                    <p className="font-bold text-slate-700 text-sm">{item.topic}</p>
                    <span className="text-xs font-black text-rose-600 bg-rose-100 px-2 py-1 rounded-lg">
                      {item.percentage}%
                    </span>
                  </div>
                  <div className="w-full bg-rose-100 rounded-full h-2">
                    <div
                      className="bg-rose-500 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                  <p className="text-[10px] text-rose-600 mt-2 font-medium">
                    Benar {item.correct} dari {item.total} soal
                  </p>
                </div>
              ))}
            </div>
          ) : (
             <div className="flex flex-col items-center justify-center p-8 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
              <CheckCircle2 className="w-8 h-8 text-emerald-300 mb-2" />
              <p className="text-sm text-slate-500 font-medium text-center">
                Luar biasa! Tidak ada topik yang memerlukan evaluasi khusus.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentAnalyticView;
