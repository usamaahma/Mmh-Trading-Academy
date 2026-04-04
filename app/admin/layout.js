import "../globals.css"; // CSS lazmi import karo taake Tailwind chale

export const metadata = {
  title: "MMH Admin Terminal",
  description: "Internal Control Center",
};

export default function AdminLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#010409] text-white">
        <div className="min-h-screen overflow-x-hidden">
          {children}
        </div>
      </body>
    </html>
  );
}