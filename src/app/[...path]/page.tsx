import FileTable from "@/components/file-table";
import { fetchFiles } from "../fetchFiles";

export default async function BrowseFile({
  params,
}: {
  params: Promise<{ path?: string[] }>;
}) {
  const { path } = await params;

  const filePath = path?.join("/") || "";

  const files = await fetchFiles(filePath);

  return (
    <>
      <FileTable files={files} />
    </>
  );
}
