import { DocumentData } from 'firebase/firestore';
import { convertUnixToUct } from '@/common/utils';

export default function ProfileUI({ data }: { data: DocumentData[] }) {
  return (
    <div>
      {data.map((postItem, index) => (
        <div key={index}>
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
