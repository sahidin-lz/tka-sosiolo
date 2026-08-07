import { collection, getDocs, deleteDoc, doc, setDoc } from 'firebase/firestore';
import { db } from './src/lib/firebase';
import { INITIAL_STUDENT_USERS, TEACHER_USER } from './src/data/studentsData';

async function seed() {
  console.log('Fetching existing users...');
  const usersRef = collection(db, 'users');
  const snap = await getDocs(usersRef);
  
  console.log(`Deleting ${snap.size} existing users...`);
  let count = 0;
  for (const d of snap.docs) {
    await deleteDoc(doc(db, 'users', d.id));
    count++;
    if (count % 50 === 0) console.log(`Deleted ${count}...`);
  }
  
  console.log(`Seeding ${INITIAL_STUDENT_USERS.length + 1} new users...`);
  count = 0;
  for (const user of INITIAL_STUDENT_USERS) {
    await setDoc(doc(db, 'users', user.id), user);
    count++;
    if (count % 50 === 0) console.log(`Seeded ${count}...`);
  }
  await setDoc(doc(db, 'users', TEACHER_USER.id), TEACHER_USER);
  
  console.log('Done!');
  process.exit(0);
}

seed().catch(console.error);
