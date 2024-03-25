import axios from 'axios';
import type { DiaryEntry, DiaryEntryNoId } from '../types';

export async function getEntries() {
  const response = await axios.get<DiaryEntry[]>('http://localhost:3000/api/diaries');
  return response.data;
}

export async function addEntry(entry: DiaryEntryNoId) {
  const response = await axios.post('http://localhost:3000/api/diaries', entry);
  return response;
}
