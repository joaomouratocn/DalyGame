async function getData(search: string) {
  console.log(search);
  try {
    const response = await fetch(
      `${process.env.NEXT_API_URL}/next-api/?api=game&title=${search}`
    );
    return response.json();
  } catch (error) {
    console.log(error);
  }
}

export default async function Search(props: { params: { search: string } }) {
  const { search } = props.params;
  const games = await getData(search);
  return (
    <div>
      <h1>Search Page</h1>
    </div>
  );
}
