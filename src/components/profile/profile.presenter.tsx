import { DocumentData } from 'firebase/firestore';
import { convertUnixToUct } from '@/common/utils';
import { v4 as uuidv4 } from 'uuid';

export default function ProfileUI({ data }: { data: DocumentData[] }) {
  return (
    <div>
      {data.map((postItem) => (
        <div key={uuidv4()}>
          <ul>
            <li>{postItem.title}</li>
            <li>{postItem.contents}</li>
            {convertUnixToUct(postItem.createdAt.seconds)}
          </ul>
        </div>
      ))}
    </div>
  );
}
