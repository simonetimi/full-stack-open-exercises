import axios from 'axios';
import type { DiaryEntry } from '../types';

export async function getEntries() {
  const response = await axios.get<DiaryEntry[]>('http://localhost:3000/api/diaries');
  return response.data;
}
