import type { Metadata } from "next";
import { hasAdminSession } from "@/lib/admin/auth";
import AdminApp from "./AdminApp";
import "./admin.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Portfolio Admin · Afonso Caboz",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  return <AdminApp initiallyAuthenticated={await hasAdminSession()} />;
}

