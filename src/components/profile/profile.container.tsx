import { DocumentData } from 'firebase/firestore';
import ProfileUI from './profile.presenter';

export default function Profile({ data }: { data: DocumentData[] }) {
  return <ProfileUI data={data} />;
}
