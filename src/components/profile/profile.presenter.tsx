import { DocumentData } from 'firebase/firestore';
import dayjs from 'dayjs';

export default function ProfileUI({ data }: { data: DocumentData[] }) {
  return (
    <div>
      {data.map((postItem, index) => (
        <div key={index}>
          <ul>
            <li>{postItem.title}</li>
            <li>{postItem.contents}</li>
            {dayjs.unix(postItem.createdAt.seconds).format('YYYY-MM-DD')}
          </ul>
        </div>
      ))}
    </div>
  );
}
