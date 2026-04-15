"use client";
import React, { useState, useEffect } from "react";
import { Trash2, Edit3, UserPlus, Users, Loader2, X, BookOpen, CheckCircle2 } from "lucide-react";

export default function UserManager() {
  const [users, setUsers] = useState([]);
  const [availableCourses, setAvailableCourses] = useState([]); // 👈 Courses ki list ke liye
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  // Form States
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("STUDENT");
  const [selectedCourses, setSelectedCourses] = useState([]); // 👈 Selected IDs yahan jayengi

  // Users aur Courses dono fetch karein
  const fetchData = async () => {
    try {
      const [userRes, courseRes] = await Promise.all([
        fetch("/api/admin/get-users"),
        fetch("/api/course") // 👈 Aapki courses wali API
      ]);
      
      const userData = await userRes.json();
      const courseData = await courseRes.json();

      if (userData.success) setUsers(userData.users);
      if (courseData.success) setAvailableCourses(courseData.data);
      
      setLoading(false);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchData(); }, []);

  // Course select/unselect logic
  const toggleCourse = (courseId) => {
    setSelectedCourses(prev => 
      prev.includes(courseId) 
        ? prev.filter(id => id !== courseId) 
        : [...prev, courseId]
    );
  };

  const handleCreateOrUpdate = async (e) => {
    e.preventDefault();
    const url = editingUser ? "/api/admin/update-user" : "/api/admin/create-user";
    const method = editingUser ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        id: editingUser?._id, 
        username: username.toLowerCase(), 
        password, 
        role,
        courses: selectedCourses // 👈 Yeh array backend ko bhej rahe hain
      }),
    });

    if (res.ok) {
      fetchData();
      closeModal();
    }
  };

  const closeModal = () => {
    setShowAddModal(false);
    setEditingUser(null);
    setUsername("");
    setPassword("");
    setRole("STUDENT");
    setSelectedCourses([]); // 👈 Reset selection
  };

  if (loading) return <div className="flex justify-center p-20"><Loader2 className="animate-spin text-cyan-500" size={40} /></div>;

  return (
    <div className="space-y-6">
      {/* Header logic same rahegi... */}
      <div className="flex justify-between items-center bg-[#0D1117] p-6 rounded-3xl border border-white/5">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-cyan-500/10 rounded-2xl text-cyan-500"><Users size={24} /></div>
          <div>
            <h3 className="text-white font-black uppercase text-sm tracking-widest">Total Students</h3>
            <p className="text-cyan-500 font-black text-2xl">{users.length}</p>
          </div>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-cyan-500 text-black px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-white transition-all flex items-center gap-2"
        >
          <UserPlus size={16} /> Add New User
        </button>
      </div>

      {/* Table logic same rahegi... */}
      <div className="bg-[#0D1117] rounded-3xl border border-white/5 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white/5 text-[9px] uppercase font-black tracking-[0.2em] text-slate-500">
              <th className="p-5">Credential ID</th>
              <th className="p-5">Access Role</th>
              <th className="p-5 text-right">Operation</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {users.map((user) => (
              <tr key={user._id} className="hover:bg-white/[0.02] transition-colors group">
                <td className="p-5">
                   <p className="text-white font-bold uppercase tracking-wider">{user.username}</p>
                   <p className="text-[8px] text-slate-600 mt-1 uppercase">UID: {user._id.slice(-8)}</p>
                </td>
                <td className="p-5">
                  <span className={`px-3 py-1 rounded-lg text-[9px] font-black tracking-tighter ${user.role === "ADMIN" ? "bg-orange-500/10 text-orange-500" : "bg-cyan-500/10 text-cyan-500"}`}>
                    {user.role}
                  </span>
                </td>
                <td className="p-5 text-right">
                  <div className="flex justify-end gap-2">
                    <button onClick={() => { 
                        setEditingUser(user); 
                        setUsername(user.username); 
                        setRole(user.role); 
                        setSelectedCourses(user.enrolledCourses || []); // 👈 Edit ke waqt purane courses load honge
                        setShowAddModal(true); 
                    }} className="p-2.5 bg-white/5 rounded-xl text-slate-400 hover:text-cyan-500 transition-colors">
                      <Edit3 size={16} />
                    </button>
                    {/* Delete button logic... */}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for Add/Edit */}
      {showAddModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-[#0D1117] border border-white/10 w-full max-w-lg rounded-[2.5rem] p-10 relative shadow-2xl my-auto">
            <button onClick={closeModal} className="absolute top-6 right-6 text-slate-500 hover:text-white"><X size={24}/></button>
            
            <h2 className="text-2xl font-black italic uppercase text-white mb-6">
              {editingUser ? "Edit" : "Register"} <span className="text-cyan-500">Access.</span>
            </h2>

            <form onSubmit={handleCreateOrUpdate} className="space-y-4">
              {/* Username & Password inputs same rahenge... */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                    <label className="text-[9px] font-black text-slate-500 uppercase ml-2">Username</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full bg-[#010409] border border-white/10 rounded-2xl p-4 text-white font-bold outline-none focus:border-cyan-500/50" placeholder="TRADER_ID" required />
                </div>
                <div className="space-y-1">
                    <label className="text-[9px] font-black text-slate-500 uppercase ml-2">Secret Key</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-[#010409] border border-white/10 rounded-2xl p-4 text-white font-bold outline-none focus:border-cyan-500/50" placeholder="••••" required={!editingUser} />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[9px] font-black text-slate-500 uppercase ml-2">Protocol Level</label>
                <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full bg-[#010409] border border-white/10 rounded-2xl p-4 text-white font-bold outline-none appearance-none">
                  <option value="STUDENT">STUDENT ACCESS</option>
                  <option value="ADMIN">ADMIN ACCESS</option>
                </select>
              </div>

              {/* 👇 Course Selection Area */}
              <div className="space-y-2">
                <label className="text-[9px] font-black text-slate-500 uppercase ml-2">Assign Courses Access</label>
                <div className="bg-[#010409] border border-white/10 rounded-2xl p-4 max-h-48 overflow-y-auto space-y-2 custom-scrollbar">
                  {availableCourses.map((course) => (
                    <div 
                      key={course._id} 
                      onClick={() => toggleCourse(course._id)}
                      className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all border ${selectedCourses.includes(course._id) ? "bg-cyan-500/10 border-cyan-500/50 text-white" : "bg-white/5 border-transparent text-slate-400 hover:bg-white/10"}`}
                    >
                      <div className="flex items-center gap-3">
                        <BookOpen size={14} className={selectedCourses.includes(course._id) ? "text-cyan-500" : "text-slate-600"} />
                        <span className="text-[11px] font-bold uppercase tracking-wider">{course.courseName}</span>
                      </div>
                      {selectedCourses.includes(course._id) && <CheckCircle2 size={16} className="text-cyan-500" />}
                    </div>
                  ))}
                  {availableCourses.length === 0 && <p className="text-[10px] text-slate-600 text-center py-4 italic">No courses available in database.</p>}
                </div>
              </div>

              <button type="submit" className="w-full bg-cyan-500 text-black py-4 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-white transition-all shadow-xl mt-4">
                {editingUser ? "Update Protocol" : "Initialize Access"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}