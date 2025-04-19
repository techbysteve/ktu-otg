import FileTable from "@/components/file-table";
import { fetchFiles } from "./fetchFiles";

export default async function Home() {
  const files = await fetchFiles();

  return <FileTable files={files} />;
}
