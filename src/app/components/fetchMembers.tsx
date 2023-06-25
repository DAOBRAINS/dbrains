import {
  useFetchMembers,
  TransferType,
  TransferSortBy,
  SortDirection,
} from "@daobox/use-aragon";

function App() {
  const { data, isLoading, isError } = useFetchMembers({
    // required
    pluginAddress: "0x13c6e4f17bbe606fed867a5cd6389a504724e805",
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error!!!</div>;

  return (
    <pre style={{ whiteSpace: "pre-wrap" }}>
      {data.map((member) => (
        <div key={member}>
          <p>{member}</p>
        </div>
      ))}
    </pre>
  );
}
