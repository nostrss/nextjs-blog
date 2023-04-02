import EditPost from '@/components/editPost/editPost.container';
import { firebaseDb } from 'firebase.config';
import { doc, getDoc } from 'firebase/firestore';

export default function EditPostPage({ data }: any) {
  return <EditPost data={data} />;
}

export async function getServerSideProps(context: any) {
  const { postId } = context.params;

  const fetchPost = async (
    fDb: any,
    firebaseColID: string,
    firebaseDocID: string,
  ) => {
    const postData = await getDoc(doc(fDb, firebaseColID, firebaseDocID));
    return JSON.stringify(postData.data());
  };

  const data = await fetchPost(firebaseDb, 'post', postId).then((res) => {
    return {
      postId,
      ...JSON.parse(res),
    };
  });

  return {
    props: {
      data,
    },
  };
}
