import { useFetchDao } from "@daobox/use-aragon";

function FetchDaoTest() {
  const { data, isLoading, isError } = useFetchDao({
    // required
    daoAddressOrEns: "box.dao.eth",
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error!!!</div>;

  return (
    <div className="flex flex-col">
      <pre style={{ whiteSpace: "pre-wrap" }}>
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}

export default FetchDaoTest;
