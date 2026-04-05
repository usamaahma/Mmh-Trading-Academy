import "../globals.css"; 

export const metadata = {
  title: "MMH Admin Terminal",
  description: "Internal Control Center",
};

export default function AdminLayout({ children }) {
  return (
    // HTML aur BODY tags yahan se khatam kar diye hain
    // Sirf wrapper div rakhein jo admin area ko style kare
    <div className="min-h-screen bg-[#010409] text-white overflow-x-hidden">
        {children}
    </div>
  );
}