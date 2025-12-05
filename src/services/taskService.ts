import { db } from '@/lib/firebase';
import { Task, TaskFormData } from '@/types/task';
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  orderBy,
  serverTimestamp,
  Timestamp
} from 'firebase/firestore';

const TASKS_COLLECTION = 'tasks';

export const taskService = {
  async createTask(taskData: TaskFormData, userEmail: string): Promise<Task> {
    try {
      const docRef = await addDoc(collection(db, TASKS_COLLECTION), {
        ...taskData,
        userEmail,
        completed: false,
        createdAt: serverTimestamp()
      });

      return {
        id: docRef.id,
        ...taskData,
        userEmail,
        completed: false
      };
    } catch (error) {
      console.error('Error creating task:', error);
      throw new Error('Failed to create task');
    }
  },

  async getTasks(userEmail: string): Promise<Task[]> {
    try {
      const q = query(
        collection(db, TASKS_COLLECTION),
        where('userEmail', '==', userEmail),
        orderBy('createdAt', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...(doc.data() as Omit<Task, 'id'>)
      }));
    } catch (error) {
      console.error('Error getting tasks:', error);
      throw new Error('Failed to get tasks');
    }
  },

  async updateTask(taskId: string, updates: Partial<Task>): Promise<void> {
    try {
      const taskRef = doc(db, TASKS_COLLECTION, taskId);
      await updateDoc(taskRef, updates);
    } catch (error) {
      console.error('Error updating task:', error);
      throw new Error('Failed to update task');
    }
  },

  async deleteTask(taskId: string): Promise<void> {
    try {
      await deleteDoc(doc(db, TASKS_COLLECTION, taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
      throw new Error('Failed to delete task');
    }
  },

  async toggleTaskComplete(taskId: string, completed: boolean): Promise<void> {
    try {
      const taskRef = doc(db, TASKS_COLLECTION, taskId);
      await updateDoc(taskRef, { completed });
    } catch (error) {
      console.error('Error toggling task completion:', error);
      throw new Error('Failed to update task completion');
    }
  }
};