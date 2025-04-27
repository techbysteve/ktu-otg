import FileTable from "@/components/file-table";
import { fetchFiles } from "./fetchFiles";

export default async function Home() {
  const files = await fetchFiles();

  return (
    <>
      <FileTable files={files} />
      <div className="mt-4 border p-3 rounded-xs">
        <p>
          <em>
            “It&apos;s not about how hard you hit. It&apos;s about how hard you
            can get hit and keep moving forward. How much you can take and keep
            moving forward.” — Sylvester Stallone
          </em>
        </p>
        <p className="font-semibold">B.Tech Notes:</p>
        <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
          <li>Semester 1 (Complete)</li>
          <li>Semester 2 (Complete)</li>
          <li>Semester 3 (Complete)</li>
          <li>Semester 4 (Complete)</li>
          <li>Semester 5 (Complete)</li>
          <li>Semester 6 (Complete)</li>
          <li>Semester 7 (Complete)</li>
          <li>Semester 8 (Complete)</li>
        </ul>
        <p className="font-semibold">M.Tech Notes:</p>
        <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
          <li>Semester 1 (Complete)</li>
          <li>Semester 2 (Complete)</li>
          <li>Semester 3 (Complete)</li>
          <li>Semester 4 (Complete)</li>
        </ul>
        <p className="text-sm font-semibold">
          DISCLAIMER - The ownership rights to all content on this website
          belong to their respective owners.
        </p>
      </div>
    </>
  );
}
