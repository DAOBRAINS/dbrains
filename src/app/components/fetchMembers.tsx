import { useFetchMembers, SortDirection } from "@daobox/use-aragon";

export default function FetchMembers() {
  const { data, isLoading, isError } = useFetchMembers({
    // required
    pluginAddress: "0x74BebBdC74b454394A466444BC09Ab2A18666Df0",
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error!!!</div>;

  return (
    <pre style={{ whiteSpace: "pre-wrap" }}>
      if (data)
      {data!.map((member) => (
        <div key={member}>
          <p>{member}</p>
        </div>
      ))}
    </pre>
  );
}
