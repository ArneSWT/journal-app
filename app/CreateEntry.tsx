import { useState } from 'react';
import { useRouter } from 'next/navigation';
import pb from '../services/pocketbase';

export const dynamic = "auto",
  dynamicParams = true,
  revalidate = 0,
  fetchCache = "auto",
  runtine = "nodejs",
  preferredRegion = "auto"

export default function CreateEntry() {

    const [text, setText] = useState('');
    const router = useRouter();

    const create = async (event: React.FormEvent) => {
        event.preventDefault();

        console.log('Text before create:', text); // Debug log

        try {
            const response = await pb.collection('entry').create({
                text: text,
            });

            console.log('Database response:', response); // Log the response from the database

        } catch (error) {
            console.error('Error creating entry:', error); // Log any errors that occur
        }

        console.log('Text after create:', text); // Debug log

        setText('');
        router.refresh();
    }

    return (
        <form onSubmit={create}>
            <textarea
                placeholder='Write something...'
                value={text}
                onChange={(e) => {
                    console.log('Text changed:', e.target.value); // Debug log
                    setText(e.target.value);
                }}
            />
            <button type="submit">Create</button>
        </form>
    );
}