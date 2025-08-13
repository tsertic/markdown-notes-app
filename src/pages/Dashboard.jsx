import { getAuth, signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  QuerySnapshot,
} from "firebase/firestore";
import { db } from "../config/firebase";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const auth = getAuth();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { currentUser } = useAuth();

  useEffect(() => {
    if (!currentUser) {
      setLoading(false);
      return;
    }
    const notesCollectionRef = collection(
      db,
      "users",
      currentUser.uid,
      "notes"
    );

    const q = query(notesCollectionRef, orderBy("updatedAt", "desc"));

    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const notesData = [];
        querySnapshot.forEach((doc) => {
          notesData.push({ id: doc.id, ...doc.data() });
        });
        setNotes(notesData);
        setLoading(false);
      },
      (err) => {
        console.error(err);
        setError("Failed to fetch notes.");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [currentUser]);

  if (loading) {
    return <div className="text-center mt-10 ">Loading your notes..</div>;
  }
  if (error) {
    return <div className="text-center text-red-500 mt-10">{error}</div>;
  }
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Your Notes</h1>
        <Link
          to="/note/new"
          className="bg-green-400 hover:bg-green-600 text-white font-bold py-2 px-3 rounded cursor-pointer transition-colors duration-200"
        >
          {" "}
          + New Note
        </Link>
      </div>
      {notes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {notes.map((note) => {
            return (
              <Link to={`/note/${note.id}`} key={note.id}>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow hover:shadow-lg  hover:scale-105 transition-all duration-200 cursor-pointer">
                  <h2 className="text-2xl font-semibold truncate mb-2">
                    {note.title}
                  </h2>
                  <p className="text-gray-400 dark:text-gray-500 text-sm h-12 overflow-hidden">
                    {note.content.substring(0, 100)}
                  </p>
                  <div className="text-gray-400 dark:text-gray-500 text-xs mt-4">
                    Last updated :{" "}
                    {new Date(note.updatedAt?.toDate()).toLocaleString()}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="text-center p-8 mt-10 bg-white dark:bg-gray-800 rounded-lg shadow">
          <h2 className="text-xl font-semibold">No notes yet!</h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            {" "}
            Click the 'New Note' button to get started.
          </p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
