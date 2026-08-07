import { Exam } from '../types';

export const TKA_EXAMS_MISSING: Exam[] = [
  {
    id: 'exam_latihan_bab_1',
    title: 'Latihan Bab 1: Sosiologi Sebagai Ilmu (10 Soal CBT)',
    grade_level: 12,
    category: 'Latihan Bab',
    duration_minutes: 40,
    total_questions: 10,
    description: 'Simulasi CBT Latihan Bab 1 Sosiologi: Hakikat, ciri-ciri, dan objek kajian sosiologi.',
    xp_reward: 300,
    passing_score: 75,
    questions: [
      {
        id: 'q_bab1_1',
        exam_id: 'exam_latihan_bab_1',
        number: 1,
        text: 'Sosiologi didasarkan pada hasil observasi, tidak spekulatif, dan menggunakan akal sehat. Hal ini menunjukkan bahwa sosiologi bersifat...',
        option_a: 'Empiris',
        option_b: 'Teoritis',
        option_c: 'Kumulatif',
        option_d: 'Non etis',
        option_e: 'Praktis',
        correct_answer: 'A',
        topic: 'Ciri-ciri Sosiologi',
        explanation: 'Empiris berarti didasarkan pada observasi (kenyataan akal sehat).'
      },
      {
        id: 'q_bab1_2',
        exam_id: 'exam_latihan_bab_1',
        number: 2,
        text: 'Sosiologi berusaha menyusun abstraksi dari hasil observasi, yang bertujuan untuk menjelaskan hubungan sebab akibat. Hal ini menunjukkan bahwa sosiologi bersifat...',
        option_a: 'Empiris',
        option_b: 'Teoritis',
        option_c: 'Kumulatif',
        option_d: 'Non etis',
        option_e: 'Kritis',
        correct_answer: 'B',
        topic: 'Ciri-ciri Sosiologi',
        explanation: 'Teoritis berarti sosiologi selalu berusaha menyusun abstraksi dari hasil observasi.'
      },
      {
        id: 'q_bab1_3',
        exam_id: 'exam_latihan_bab_1',
        number: 3,
        text: 'Teori-teori sosiologi dibentuk berdasarkan teori yang sudah ada, dalam arti memperbaiki, memperluas, dan memperhalus teori yang lama. Hal ini menunjukkan ciri...',
        option_a: 'Empiris',
        option_b: 'Teoritis',
        option_c: 'Kumulatif',
        option_d: 'Non etis',
        option_e: 'Objektif',
        correct_answer: 'C',
        topic: 'Ciri-ciri Sosiologi',
        explanation: 'Kumulatif berarti teori disusun atas dasar teori yang sudah ada sebelumnya.'
      },
      {
        id: 'q_bab1_4',
        exam_id: 'exam_latihan_bab_1',
        number: 4,
        text: 'Sosiologi tidak mempersoalkan baik buruknya suatu fakta, tetapi tujuannya adalah menjelaskan fakta tersebut secara analitis. Hal ini adalah ciri...',
        option_a: 'Empiris',
        option_b: 'Teoritis',
        option_c: 'Kumulatif',
        option_d: 'Non etis',
        option_e: 'Analitis',
        correct_answer: 'D',
        topic: 'Ciri-ciri Sosiologi',
        explanation: 'Non-etis artinya tidak menilai baik atau buruknya suatu fakta, melainkan menjelaskannya secara analitis.'
      },
      {
        id: 'q_bab1_5',
        exam_id: 'exam_latihan_bab_1',
        number: 5,
        text: 'Tokoh yang pertama kali menggunakan istilah sosiologi dan dikenal sebagai Bapak Sosiologi adalah...',
        option_a: 'Emile Durkheim',
        option_b: 'Max Weber',
        option_c: 'Auguste Comte',
        option_d: 'Karl Marx',
        option_e: 'Herbert Spencer',
        correct_answer: 'C',
        topic: 'Tokoh Sosiologi',
        explanation: 'Auguste Comte adalah bapak sosiologi yang pertama kali mencetuskan istilah sosiologi pada tahun 1838.'
      }
    ]
  },
  {
    id: 'exam_tka_2025_resmi',
    title: 'Tryout TKA Sosiologi SMA Tahun 2025',
    grade_level: 12,
    category: 'Tryout TKA',
    duration_minutes: 45,
    total_questions: 1,
    description: 'Simulasi Resmi Ujian Tes Kemampuan Akademik (TKA) Sosiologi SMA/MA/SMK Tahun 2025.',
    xp_reward: 400,
    passing_score: 75,
    questions: [
      {
        id: 'q_tka_1',
        exam_id: 'exam_tka_2025_resmi',
        number: 1,
        text: 'Manakah dari pernyataan berikut yang merupakan contoh perubahan sosial yang bersifat evolusi?',
        option_a: 'Peralihan masyarakat dari berburu ke agraris',
        option_b: 'Revolusi industri di Inggris',
        option_c: 'Reformasi politik tahun 1998 di Indonesia',
        option_d: 'Pemberontakan massa yang menggulingkan pemerintah',
        option_e: 'Kudeta militer di suatu negara',
        correct_answer: 'A',
        topic: 'Perubahan Sosial',
        explanation: 'Evolusi adalah perubahan lambat dan bertahap, seperti dari masyarakat berburu ke masyarakat agraris.'
      }
    ]
  }
];
