import React, { useState, useMemo } from 'react';
import { User, ExamSession } from '../types';
import { Download, Search, Filter, GraduationCap, Award, FileSpreadsheet } from 'lucide-react';
import * as XLSX from 'xlsx';
import { INITIAL_STUDENT_USERS } from '../data/studentsData';

interface AdminRecapViewProps {
  users: User[];
  examSessions: ExamSession[];
}

const AdminRecapView: React.FC<AdminRecapViewProps> = ({ users, examSessions }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState<string>('all');

  // Filter out non-siswa and combine with INITIAL_STUDENT_USERS
  const studentUsers = useMemo(() => {
    const fromProps = users.filter((u) => u.role === 'siswa');
    const existingIds = new Set(fromProps.map(u => u.id));
    const toAdd = INITIAL_STUDENT_USERS.filter(u => !existingIds.has(u.id));
    return [...fromProps, ...toAdd];
  }, [users]);

  // Extract unique classes
  const classes = useMemo(() => {
    const classSet = new Set<string>();
    studentUsers.forEach((u) => {
      if (u.group_name) classSet.add(u.group_name);
    });
    return Array.from(classSet).sort();
  }, [studentUsers]);

  const filteredStudents = useMemo(() => {
    return studentUsers.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (user.nisn && user.nisn.includes(searchTerm));
      const matchesClass = selectedClass === 'all' || user.group_name === selectedClass;

      return matchesSearch && matchesClass;
    }).map(user => {
      // Calculate average score and total completed exams
      const userSessions = examSessions.filter(s => s.user_id === user.id && s.is_completed);
      const totalExams = userSessions.length;
      const averageScore = totalExams > 0 
        ? userSessions.reduce((acc, curr) => acc + curr.score, 0) / totalExams 
        : 0;

      return {
        ...user,
        totalExams,
        averageScore
      };
    });
  }, [studentUsers, examSessions, searchTerm, selectedClass]);

  const handleDownloadExcel = () => {
    // Determine which students to export (all filtered students)
    if (filteredStudents.length === 0) {
      alert('Tidak ada data siswa untuk didownload pada filter ini.');
      return;
    }

    const data = filteredStudents.map(student => ({
      'Nama Lengkap': student.name,
      'Kelas/Rombel': student.group_name || '-',
      'Username (NISN)': student.nisn || '-',
      'Password': student.nisn || '-' // Password is same as NISN
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    
    // Auto fit columns
    const objectMaxLength = []; 
    data.forEach(item => {
      Object.entries(item).forEach(([key, value], idx) => {
        const valueStr = value !== null && value !== undefined ? String(value) : '';
        const keyLength = key.length;
        const valLength = valueStr.length;
        const max = Math.max(keyLength, valLength);
        objectMaxLength[idx] = Math.max(objectMaxLength[idx] || 0, max);
      });
    });

    worksheet['!cols'] = objectMaxLength.map(w => ({ width: w + 2 }));

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Data Akun Siswa');
    
    const fileName = selectedClass !== 'all' 
      ? `Data_Akun_Siswa_${selectedClass.replace(/[^a-zA-Z0-9]/g, '_')}.xlsx`
      : 'Data_Akun_Siswa_Semua_Kelas.xlsx';
      
    XLSX.writeFile(workbook, fileName);
  };

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-800 flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-indigo-500" />
            Rekapitulasi Siswa & Unduh Akun
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Kelola data siswa, pantau rata-rata nilai, dan unduh kredensial akses CBT.
          </p>
        </div>
        
        <button
          onClick={handleDownloadExcel}
          className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-bold transition-all shadow-sm hover:shadow-emerald-200 disabled:opacity-50"
        >
          <FileSpreadsheet className="w-4 h-4" />
          Download Data Akun (Excel)
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-slate-400" />
          </div>
          <input
            type="text"
            placeholder="Cari nama atau NISN..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="sm:w-64 relative">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Filter className="h-4 w-4 text-slate-400" />
          </div>
          <select
            className="w-full pl-10 pr-10 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent appearance-none cursor-pointer"
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
          >
            <option value="all">Semua Rombel/Kelas</option>
            {classes.map((cls) => (
              <option key={cls} value={cls}>
                {cls}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-slate-200">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="p-4 text-xs font-black text-slate-500 uppercase tracking-wider">Nama Siswa</th>
              <th className="p-4 text-xs font-black text-slate-500 uppercase tracking-wider">NISN</th>
              <th className="p-4 text-xs font-black text-slate-500 uppercase tracking-wider">Rombel/Kelas</th>
              <th className="p-4 text-xs font-black text-slate-500 uppercase tracking-wider text-center">Ujian Selesai</th>
              <th className="p-4 text-xs font-black text-slate-500 uppercase tracking-wider text-center">Rata-rata Skor</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-slate-50/80 transition-colors group">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img 
                        src={student.avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${student.id}`} 
                        alt="Avatar" 
                        className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200"
                      />
                      <span className="font-bold text-slate-800 text-sm">{student.name}</span>
                    </div>
                  </td>
                  <td className="p-4 text-sm font-medium text-slate-600">
                    {student.nisn || '-'}
                  </td>
                  <td className="p-4 text-sm font-medium text-slate-600">
                    <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded-md text-xs font-bold border border-slate-200">
                      {student.group_name || '-'}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <span className="inline-flex items-center justify-center bg-indigo-50 text-indigo-600 font-black text-sm w-8 h-8 rounded-full border border-indigo-100">
                      {student.totalExams}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      <Award className={`w-4 h-4 ${student.averageScore >= 75 ? 'text-amber-500' : 'text-slate-400'}`} />
                      <span className={`font-bold text-sm ${student.averageScore >= 75 ? 'text-slate-800' : 'text-slate-500'}`}>
                        {Math.round(student.averageScore)}
                      </span>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="p-8 text-center text-slate-500 font-medium">
                  Tidak ada data siswa yang cocok dengan filter pencarian.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminRecapView;
