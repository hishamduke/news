import Link from "next/link";
export default function Profile() {
  return (
    <>
      <Link href="/">click</Link>
    </>
  );
}

Profile.getLayout = function getLayout(page) {
  return <Profile />;
};
