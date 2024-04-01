import Navbar from "@/components/Navbar";
import NotePreview from "@/components/NotePreview";
import { Button } from "@/components/ui/button";
import AuthProvider, { useAuthContext } from "@/context/AuthContext";
import { Note } from "@/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  const user = useAuthContext();
  console.log(user);
  const getNotes = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/notes", {
        withCredentials: true,
      });
      return response.data;
    } catch (err) {
      console.log(err);
    }
  };
  const notes = useQuery<Note[]>({ queryKey: ["notes"], queryFn: getNotes });
  const createNotes = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/notes/",
        {
          title: "New Note",
          text: "Start Editing...",
        },
        {
          withCredentials: true,
        }
      );
      navigate(`/${response?.data?.data?._id}?create=true`);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Lato,wght@1,900&display=swap"
          rel="stylesheet"
        />
      </head>

      <div className="bg-gray-400 h-screen overflow-scroll">
        <Navbar />
        <main className="max-w-[80%] lg:max-w-[1000px] mx-auto">
          <div className="flex mb-12">
            <Button
              className="w-fit text-lg font-700 mx-auto"
              onClick={() => {
                createNotes();
              }}
            >
              Create +
            </Button>
          </div>

          <div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
            {notes?.data?.map((note) => {
              return <NotePreview note={note} key={note?._id} />;
            })}
          </div>
        </main>
      </div>
    </>
  );
};

const AuthHome = () => {
  return (
    <>
      <AuthProvider>
        <Home />
      </AuthProvider>
    </>
  );
};

export default AuthHome;
