import pb from '../services/pocketbase';

export const getEntries = async () => {
  try {
    const res = await fetch('http://127.0.0.1:8090/api/collections/entry/records?page=1&perPage=30', { cache: 'no-store' });

    if (!res.ok) {
      console.error('Fetch error:', res.statusText);
      return [];
    }

    const data = await res.json();
    console.log('Fetched data:', data);
    return data?.items as any[];
  } catch (error) {
    console.error('Fetch error:', error);
    return [];
  }
};

export const updateEntry = async (id: string, text: string) => {
  await pb.collection('entry').update(id, { text });
};