export default function Page({ params }: { params: { id: string } }) {
  return <h1>Id stored: {params.id}</h1>;
}
