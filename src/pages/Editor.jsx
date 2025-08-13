import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db } from "../config/firebase";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
const Editor = () => {
  const { id: noteId } = useParams();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNote = async () => {
      if (noteId === "new") {
        setLoading(false);
        return;
      }
      if (!currentUser) {
        navigate("/login");
        return;
      }

      try {
        const noteRef = doc(db, "users", currentUser.uid, "notes", noteId);
        const docSnap = await getDoc(noteRef);

        if (docSnap.exists()) {
          const noteData = docSnap.data();
          setTitle(noteData.title);
          setContent(noteData.content);
        } else {
          console.log("No such document.");
          navigate("/");
        }
      } catch (error) {
        console.error("Something went wrong fetching note", error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchNote();
  }, [noteId, currentUser, navigate]);

  const handleSave = async () => {
    if (!currentUser) {
      navigate("/login");
      return;
    }
    if (!title) {
      alert("Please enter a title.");
      return;
    }
    if (!content) {
      alert("Please add some content.");
      return;
    }
    try {
      //CREATE
      let noteRef;
      const dataToSave = {
        title,
        content,
        updatedAt: serverTimestamp(),
      };
      if (noteId === "new") {
        dataToSave.createdAt = serverTimestamp();
        const notesCollectionRef = collection(
          db,
          "users",
          currentUser.uid,
          "notes"
        );
        noteRef = await addDoc(notesCollectionRef, dataToSave);
        navigate(`/note/${noteRef.id}`);
      } else {
        //UPDATE EXISTING NOTE
        noteRef = doc(db, "users", currentUser.uid, "notes", noteId);
        await setDoc(noteRef, dataToSave);
      }
    } catch (error) {
      console.error("[handleSave error] Error saving note", error.message);
      alert("Failed to save note.");
    }
  };

  const handleDelete = async () => {
    if (
      noteId === "new" ||
      !window.confirm("Are you sure you want to delete note?")
    ) {
      return;
    }
    if (!currentUser) {
      navigate("/login");
      return;
    }

    try {
      const noteRef = doc(db, "users", currentUser.uid, "notes", noteId);
      await deleteDoc(noteRef);
      navigate("/");
    } catch (error) {
      console.error("[handleDelete] Error deleting note", error.message);
      alert("Error deleting note.");
    }
  };

  if (loading) {
    return <div className="text-center mt-10">Loading Editor...</div>;
  }

  return (
    <div className="flex flex-col h-[calc(100vh-6rem)]">
      {/* HEADER WITH TITLE AND SAVE BUTTON */}
      <div className="flex items-center justify-between gap-2 p-4 border-b dark:border-gray-700">
        <input
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          placeholder="Note Title"
          type="text"
          className="text-2x w-full focus:outline-none bg-transparent"
        />
        <button
          className="bg-blue-400 hover:bg-blue-600 font-bold rounded py-2 px-4 cursor-pointer text-white"
          onClick={handleSave}
        >
          Save
        </button>
        {noteId !== "new" && (
          <button
            className="bg-red-400 hover:bg-red-600 cursor-pointer text-white font-bold py-2 px-4 rounded"
            onClick={handleDelete}
          >
            Delete
          </button>
        )}
      </div>
      {/* EDITOR */}
      <div className="flex-grow grid grid-cols-1 md:grid-cols-2">
        <div className="h-full">
          <textarea
            className=" w-full h-full p-4 resize-none bg-gray-50 dark:bg-gray-800 focus:outline-none text-base"
            placeholder="Write your note in markdown."
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
          />
        </div>
        <div className="h-full overflow-y-auto p-4 border-1 dark:border-gray-700">
          <article className="prose dark:prose-invert max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
          </article>
        </div>
      </div>
    </div>
  );
};

export default Editor;
