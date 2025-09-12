"use client"
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ApiError } from "@/utils/ApiError";
import Link from "next/link";


export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    async function checkUser() {
      try{
        const res = await fetch("api/v1/users/current")
        // console.log(res)

        if(!res.ok){
          throw new ApiError(401, "Unauthorized")
        }
        const data = await res.json()
        const user = await data.data.user;
        // console.log(user)
        if(user.role !== "admin"){
          router.push("/"); // redirect non admin user to home
        }
        else{
          setLoading(false);
        }
      }catch(error){
        router.push("/login"); // redirect unauthenticated users to login
      }
    }
    checkUser();
  }, [router]);

  if (loading) {
    return <div>Loading...</div>;
  }


  return (
    <div className="flex">
      {/* Sidebar */}
      <aside className="w-60 bg-gray-100 min-h-screen p-4">
        <div className="logo px-3 inline-block">
          <Link href="/"><Image src="/logo.png" width={70} height={70} alt='logo'/></Link>
        </div>
        <ul className="flex flex-col gap-3 ml-2">

          <li
            className={`flex gap-2 items-center cursor-pointer px-2 py-1 ${
              activeTab === "dashboard" && "font-bold bg-white rounded-lg text-lg" 
            }`}
            onClick={() => setActiveTab("dashboard")}
          >
            <Image
              src={
                activeTab === "dashboard"
                  ? "/admin/dashboard-dark.png" // active icon
                  : "/admin/dashboard-bright.png"   // inactive icon
              }
              width={17}
              height={17}
              alt="dashboard-image"
            />
            <span>Dashboard</span>
          </li>

          <li
            className={`flex gap-2 items-center cursor-pointer px-2 py-1 ${
              activeTab === "bookings" && "font-bold bg-white rounded-lg text-lg"
            }`}
            onClick={() => setActiveTab("bookings")}
          >
            <Image
              src={
                activeTab === "bookings"
                  ? "/admin/booking-dark.png" // active icon
                  : "/admin/booking-bright.png"   // inactive icon
              }
              width={17}
              height={17}
              alt="booking-image"
            />
            <span>Bookings</span>
          </li>

          <li
            className={`flex gap-2 items-center cursor-pointer px-2 py-1 ${
              activeTab === "users" && "font-bold  bg-white rounded-lg text-lg"
            }`}
            onClick={() => setActiveTab("users")}
          >
            <Image
              src={
                activeTab === "users"
                  ? "/admin/users-dark.png" // active icon
                  : "/admin/users-bright.png"   // inactive icon
              }
              width={17}
              height={17}
              alt="user-image"
            />
            <span>Users</span>
          </li>

          <li
            className={`flex gap-2 items-center cursor-pointer px-2 py-1 ${
              activeTab === "destinations" && "font-bold  bg-white rounded-lg text-lg"
            }`}
            onClick={() => setActiveTab("destinations")}
          >
            <Image
              src={
                activeTab === "destinations"
                  ? "/admin/destination-dark.png" // active icon
                  : "/admin/destination-bright.png"   // inactive icon
              }
              width={17}
              height={17}
              alt="destination-image"
            />
            <span>Destinations</span>
          </li>

          <li
            className={`flex gap-2 items-center cursor-pointer px-2 py-1 ${
              activeTab === "update" && "font-bold  bg-white rounded-lg text-lg"
            }`}
            onClick={() => setActiveTab("update")}
          >
            <Image
              src={
                activeTab === "update"
                  ? "/admin/package-dark.png" // active icon
                  : "/admin/package-bright.png"   // inactive icon
              }
              width={17}
              height={17}
              alt="update-image"
            />
            <span>Update</span>
          </li>

          <li
            className={`flex gap-2 items-center cursor-pointer px-2 py-1 ${
              activeTab === "settings" && "font-bold  bg-white rounded-lg text-lg"
            }`}
            onClick={() => setActiveTab("settings")}
          >
            <Image
              src={
                activeTab === "settings"
                  ? "/admin/setting-dark.png" // active icon
                  : "/admin/setting-bright.png"   // inactive icon
              }
              width={17}
              height={17}
              alt="setting-image"
            />
            <span>Settings</span>
          </li>

          <li
            className={`flex gap-2 items-center cursor-pointer px-2 py-1 ${
              activeTab === "cancelations" && "font-bold  bg-white rounded-lg text-lg"
            }`}
            onClick={() => setActiveTab("cancelations")}
          >
            <Image
              src={
                activeTab === "cancelations"
                  ? "/admin/cancel-dark.png" // active icon
                  : "/admin/cancel-bright.png"   // inactive icon
              }
              width={17}
              height={17}
              alt="cancelations-image"
            />
            <span>Cancelations</span>
          </li>

        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {activeTab === "dashboard" && <Dashboard/>}
        {activeTab === "bookings" && <Bookings/>}
        {activeTab === "users" && <Users/>}
        {activeTab === "destinations" && <Destinations/>}
        {activeTab === "update" && <Update/>}
      </main>
    </div>
  );
}


function Dashboard() {
  return (
    <h1 className="text-2xl font-bold">📊 Dashboard Overview</h1>
    
  )
}

function Bookings() {
  return <h1 className="text-2xl font-bold">📑 Manage Bookings</h1>;
}

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    async function fetchUsers() {
      try {
        const res = await fetch("/api/v1/users/all");

        if (!res.ok) throw new Error("Failed to fetch users");

        const data = await res.json();

        setUsers(data.users);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);
  if (loading) return <p>Loading users...</p>;
  if (error) return <p className="text-red-600">Error: {error}</p>;
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr>
            <th className="border px-4 py-2">Username</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Role</th>
            <th className="border px-4 py-2">Created At</th>
          </tr>
        </thead>
        <tbody>{users.map((user) => (
            <tr key={user._id}>
              <td className="border px-4 py-2">{user.username}</td>
              <td className="border px-4 py-2">{user.email}</td>
              <td className="border px-4 py-2">{user.role}</td>
              <td className="border px-4 py-2">{new Date(user.createdAt).toLocaleString()}</td>
            </tr>
          ))}</tbody>
       </table>
    </div>
  );
}

function Destinations() {

  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    async function fetchDestinations() {
      try{
        const res = await fetch("api/destination/all")

        if(!res.ok){ throw new ApiError(400, "Failed to fetch destinations")}

        const data = await res.json();

        setDestinations(data.destinations);
      }catch(error){
        setError(error.message)
      }finally{
        setLoading(false)
      }
    }
    fetchDestinations();
  }, [])

  if(loading) return <p>Loading destinations...</p>
  if(error) return <p className="text-red-600">Error: {error}</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Destinations</h1>
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr>
            <th className="border px-4 py-2">Title</th>
            <th className="border px-4 py-2">Description</th>
            <th className="border px-4 py-2">Price</th>
            <th className="border px-4 py-2">Days</th>
           
          </tr>
        </thead>
        <tbody>{destinations.map((destination) => (
            <tr key={destination._id}>
              <td className="border px-4 py-2">{destination.title}</td>
              <td className="border px-4 py-2">{destination.description}</td>
              <td className="border px-4 py-2">{destination.price}</td>
              <td className="border px-4 py-2">{destination.days}</td>

            </tr>
          ))}</tbody>
       </table>
    </div>
  );
  
}

function Update() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [days, setDays] = useState("")
  const [coverImage, setCoverImage] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [dots, setDots] = useState("");

  const fileInputRef = useRef(null);

  // Animate dots while loading
  useEffect(() => {
    if (loading) {
      let count = 0;
      const interval = setInterval(() => {
        count = (count + 1) % 4;
        setDots(".".repeat(count));
      }, 500);
      const timeout = setTimeout(() => {
        clearInterval(interval);
      }, 2000);
      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
        setDots("");
      };
    } else {
      setDots("");
    }
  }, [loading]);

  function isFormValid ({title, description, price, days, coverImage}) {
    if (!title || title.trim() === "") return false;
    if (!description || description.trim() === "") return false;
    // Convert price and days to numbers for validation
    const priceNum = Number(price);
    const daysNum = Number(days);
    if (isNaN(priceNum) || priceNum <= 0) return false;
    if (isNaN(daysNum) || daysNum <= 0) return false;
    if (!coverImage) return false;
    return true;
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    setError(null)
    setSuccess(null)

    // validate before submitting
    if (!isFormValid({title, description, price, days, coverImage})) {
      setError("Please fill in all fields correctly.");
      setLoading(false);
      return;
    }
    try{
      
      const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("price", price);
        formData.append("days", days);
        formData.append("coverImage", coverImage);

      const res = await fetch("api/destination/upload", {
        method: "POST",
        body: formData,
      })

      if(!res.ok){
        const errorData = await res.json();
        throw new ApiError(res.status, errorData.message || "Failed to upload destination");
      }

      setSuccess("Updation Scuucessful ")
      setLoading(false)
      setTitle("")
      setDescription("")
      setPrice("")
      setDays("")
      setCoverImage(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = ""; // Clear the file input
      }

      // setTimeout(() => {

      // }, 2000);

    }catch(error){
      setError(error.message || "Failed to update destination")
    }finally{
      setLoading(false)
    }  
  
  }

  const formValid = isFormValid({ title, description, price, days, coverImage });

  return (
    <div>

      <div className="flex flex-col items-center justify-center h-full"> 
        <h1 className="text-2xl font-bold mb-6">Update Destination</h1>

        <form onSubmit={handleSubmit} className="w-full flex flex-col items-center">
          <div>
            <label htmlFor="title" className="block text-medium font-medium text-gray-800">Title</label>
            <div className="mt-1">
              <input value={title} 
                onChange={(e) => setTitle(e.target.value)}
                type="text" id="title" name="title" required
                className='block w-[40vw] px-3 py-1.5 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none '/>  
            </div>
          </div>
          <div>
            <label htmlFor="description" className="block text-medium font-medium text-gray-800">Description</label>
            <div className="mt-1">
              <input value={description} 
                onChange={(e) => setDescription(e.target.value)}
                type="text" id="description" name="description" required
                className='block w-[40vw] px-3 py-1.5 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none '/>  
            </div>
          </div>
          <div>
            <label htmlFor="price" className="block text-medium font-medium text-gray-800">Price</label>
            <div className="mt-1">
              <input value={price} 
                onChange={(e) => setPrice(e.target.value)}
                type="number" id="price" name="price" required
                className='block w-[40vw] px-3 py-1.5 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none '/>  
            </div>
          </div>
          <div>
            <label htmlFor="days" className="block text-medium font-medium text-gray-800">Days</label>
            <div className="mt-1 ">
              <input value={days} 
                onChange={(e) => setDays(e.target.value)}
                type="number" id="days" name="days" required
                className='block w-[40vw] px-3 py-1.5 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none '/>  
            </div>
          </div>
          <div>
            <label htmlFor="coverImage" className="block text-medium font-medium text-gray-800">Cover Image</label>
            <div className="mt-1 ">
              <input 
                onChange={(e) => setCoverImage(e.target.files[0])}
                type="file" id="coverImage" name="coverImage" required
                ref={fileInputRef}
                className='block w-[40vw] px-3 py-1.5 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none '/>  
            </div>
          </div>
          <div className='mt-3 w-[40vw]'>
            <button type='submit' 
              disabled={loading || !formValid}
              className={`w-[40vw] cursor-pointer flex justify-center py-2 px-4 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 ${loading || !formValid ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`} >{loading ? `Updating${dots}` : "Update"}
            </button>
          </div>
        </form>
        {error && (
          <div className='mt-5 p-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800'>
          {error} </div>
        )}
        {success && (
          <div className='mt-5 p-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800'>
          {success} </div>
        )}
      </div>
    </div>

  )
}

