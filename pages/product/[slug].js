import { useRouter } from "next/router";

const post = () => {
  const router = useRouter();
  const { slug } = router.query;
  return <p>The slug is : {slug}</p>;
};

export default post;
