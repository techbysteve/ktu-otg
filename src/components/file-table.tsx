"use client";

import { FileType } from "@/app/enums";
import { File } from "@/app/types";
import { formatBytesToKBorMB } from "@/app/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Copy, Download, FileQuestion, FileText, Folder } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

type FileTableProps = {
  files: Array<File>;
};

const getFileIcon = (type: string) => {
  if (type === FileType.FILE) return <FileText size={20} />;
  else if (type === FileType.DIR) return <Folder size={20} />;
  return <FileQuestion size={20} />; // Default icon
};

const FileTable: React.FC<FileTableProps> = ({ files }) => {
  const router = useRouter();

  const handleRowClick = async (file: File) => {
    if (file.type === FileType.DIR) {
      const encodedPath = encodeURIComponent(file.path);
      router.push(`/${encodedPath}`);
    } else if (file.type === FileType.FILE) {
      window.open(file.download_url);
    } else {
      return;
    }
  };

  const handleCopyClick = (file: File) => {
    if (file.type === FileType.DIR) {
      const encodedFileName = encodeURIComponent(file.name);
      const filePath = `${window.location.href}/${encodedFileName}`;
      navigator.clipboard.writeText(filePath);
    } else {
      navigator.clipboard.writeText(file.download_url);
    }
    toast.info("Permalink copied to clipboard.");
  };

  const handleDownloadClick = (file: File) => {
    if (file.download_url) {
      toast.info("Download initiated successfully.");
      window.open(file.download_url);
    }
    return;
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="select-none">NAME</TableHead>
          <TableHead className="hidden md:table-cell">TYPE</TableHead>
          <TableHead className="hidden md:table-cell">SIZE</TableHead>
          <TableHead className="hidden md:table-cell text-right">
            ACTIONS
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {files.map((file) => (
          <TableRow key={file.sha}>
            <TableCell
              className="flex items-center gap-1.5 px-3 mt-1 cursor-pointer w-full max-w-[90vw] md:max-w-[60vw] lg:max-w-[40vw]"
              onClick={() => handleRowClick(file)}
            >
              {getFileIcon(file.type)}
              <span className="mt-0.5 max-w-full flex-1 text-base select-none truncate">
                {file.name}
              </span>
            </TableCell>
            <TableCell className="hidden md:table-cell">
              <span className="text-base leading-none ml-1">{file.type}</span>
            </TableCell>
            <TableCell className="hidden md:table-cell">
              {file.size !== 0 ? (
                <span className="text-base leading-none">
                  {formatBytesToKBorMB(file.size)}
                </span>
              ) : (
                <span className="text-base ml-3">-</span>
              )}
            </TableCell>
            <TableCell className="text-right hidden md:table-cell">
              <div className="flex justify-end items-center">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleCopyClick(file)}
                >
                  <Copy size={15} />
                </Button>
                {file.type === "file" && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDownloadClick(file)}
                  >
                    <Download size={15} />
                  </Button>
                )}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default FileTable;
