"use client";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import React from "react";
import { useRouter } from "next/navigation";

export default function DynamicBreadcrumb() {
  const rawPathname = usePathname();
  const router = useRouter();
  const decodedPathname = decodeURIComponent(rawPathname);
  const pathSegments = decodedPathname.split("/").filter(Boolean);

  const getBreadcrumbName = (segment: string) =>
    segment.replace(/\b\w/g, (l) => l.toUpperCase());

  const lastIndex = pathSegments.length - 1;

  return (
    <Breadcrumb className="pb-4">
      <BreadcrumbList>
        <BreadcrumbItem>
          {pathSegments.length === 0 ? (
            <BreadcrumbPage>🚩 Home</BreadcrumbPage>
          ) : (
            <BreadcrumbLink href="/">🚩 Home</BreadcrumbLink>
          )}
        </BreadcrumbItem>

        {pathSegments.length > 1 && (
          <>
            {/* Mobile: Show only ellipsis */}
            <BreadcrumbSeparator className="sm:hidden" />
            <BreadcrumbItem className="sm:hidden">
              <BreadcrumbPage onClick={() => router.back()}>...</BreadcrumbPage>
            </BreadcrumbItem>

            {/* Desktop: Show full middle segments */}
            {pathSegments.slice(0, lastIndex).map((segment, index) => {
              const href =
                "/" +
                pathSegments
                  .slice(0, index + 1)
                  .map(encodeURIComponent)
                  .join("/");
              return (
                <React.Fragment key={href}>
                  <BreadcrumbSeparator className="hidden sm:inline-flex" />
                  <BreadcrumbItem className="hidden sm:inline-flex">
                    <BreadcrumbLink href={href}>
                      {getBreadcrumbName(segment)}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                </React.Fragment>
              );
            })}
          </>
        )}

        {pathSegments.length > 0 && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>
                {getBreadcrumbName(pathSegments[lastIndex])}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
