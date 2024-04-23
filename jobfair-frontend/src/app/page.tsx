export default async function Home() {
  return (
    <div className="text-rose-500 text-2xl">
      {process.env.BACKEND_URL}
    </div>
  );
}
