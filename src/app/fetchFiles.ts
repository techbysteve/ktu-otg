import { File } from "@/app/types";
import { FileType } from "./enums";
import { notFound } from "next/navigation";

export async function fetchFiles(filePath = ""): Promise<File[]> {
  const res = await fetch(
    `https://codeberg.org/api/v1/repos/steve-cse/ktu-onthego-masters/contents/${filePath}`, {cache: "force-cache" });

  if (!res.ok) notFound()

  const files:File |File[]  = await res.json();

  if (!Array.isArray(files)) notFound()

  return files.sort((a, b) => {
    // If 'a' is a directory and 'b' is a file, 'a' should come first
    if (a.type === FileType.DIR && b.type === FileType.FILE) return -1;
    // If 'a' is a file and 'b' is a directory, 'b' should come first
    if (a.type === FileType.FILE && b.type === FileType.DIR) return 1;
    // If both are the same type (both dirs or both files), preserve their order
    return 0;
  });
}
