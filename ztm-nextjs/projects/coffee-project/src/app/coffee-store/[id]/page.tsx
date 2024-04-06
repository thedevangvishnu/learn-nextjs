import Link from "next/link";

export default function Page({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1>Id stored: {params.id}</h1>
      <div className="mb-2 mt-24 text-lg font-bold">
        <Link href="/">← Back to home</Link>
      </div>
    </div>
  );
}
