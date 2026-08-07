import {
  collection,
  doc,
  getDocs,
  setDoc,
  deleteDoc,
  onSnapshot,
  getDocFromServer,
  writeBatch
} from 'firebase/firestore';
import { db } from './firebase';

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: null,
      email: null,
    },
    operationType,
    path
  };
  console.error('Firestore Error [LMS Sosiologi]:', JSON.stringify(errInfo));
  return errInfo;
}

// Check Firestore connection on boot
export async function testFirestoreConnection() {
  try {
    await getDocFromServer(doc(db, 'lms_sosiologi_status', 'ping'));
    console.log('Firebase Firestore LMS Sosiologi connected successfully.');
  } catch (err) {
    console.warn('Firestore offline or initial ping error, fallback active:', err);
  }
}

// Sync helper for collections
export async function saveDocument(collectionName: string, docId: string, data: any) {
  try {
    await setDoc(doc(db, collectionName, docId), data, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `${collectionName}/${docId}`);
  }
}

export async function deleteDocument(collectionName: string, docId: string) {
  try {
    await deleteDoc(doc(db, collectionName, docId));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `${collectionName}/${docId}`);
  }
}

export async function fetchCollection<T>(collectionName: string): Promise<T[]> {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const items: T[] = [];
    querySnapshot.forEach((docSnap) => {
      items.push({ id: docSnap.id, ...docSnap.data() } as T);
    });
    return items;
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, collectionName);
    return [];
  }
}

export function subscribeToCollection<T>(
  collectionName: string,
  onUpdate: (items: T[]) => void
) {
  return onSnapshot(
    collection(db, collectionName),
    (snapshot) => {
      const items: T[] = [];
      snapshot.forEach((docSnap) => {
        items.push({ id: docSnap.id, ...docSnap.data() } as T);
      });
      if (items.length > 0) {
        onUpdate(items);
      }
    },
    (error) => {
      handleFirestoreError(error, OperationType.GET, collectionName);
    }
  );
}

export async function batchSaveDocuments(collectionName: string, documents: any[]) {
  try {
    const CHUNK_SIZE = 450;
    const batchPromises = [];
    
    for (let i = 0; i < documents.length; i += CHUNK_SIZE) {
      const chunk = documents.slice(i, i + CHUNK_SIZE);
      const batch = writeBatch(db);
      
      chunk.forEach(data => {
        const docRef = doc(db, collectionName, data.id);
        batch.set(docRef, data, { merge: true });
      });
      
      batchPromises.push(batch.commit());
    }
    
    await Promise.all(batchPromises);
    console.log(`Batch write kilat ${documents.length} dokumen ke koleksi ${collectionName}`);
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `${collectionName} (batch)`);
    throw error;
  }
}

export async function seedInitialStudentsToFirestore(students: any[]) {
  return batchSaveDocuments('users', students);
}
