"use client";
import DeltaArticle from "@/components/pages/Article";
export default function Page({ params }) {
  return <DeltaArticle slug={params.slug} />;
}
