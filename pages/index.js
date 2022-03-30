import Head from "next/head";
import AddBooks from "../components/AddBooks";
import DisplayBooks from "../components/DisplayBooks";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import {
  collection,
  getDocs,
  onSnapshot,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { useEffect, useState } from "react";

export default function Home() {
  const [item, setItem] = useState(null);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const booksRef = collection(db, "books");

    const getBooks = onSnapshot(booksRef, (snapshot) => {
      let result = [];
      snapshot.docs.map((doc) => {
        result.push({ ...doc.data(), id: doc.id });
      });
      setBooks(result);
    });
    return () => getBooks();
  }, []);

  const deleteBook = async (id) => {
    const bookDoc = doc(db, "books", id);
    await deleteDoc(bookDoc);
  };

  const [newTitle, setNewTitle] = useState("");
  const [newPrice, setNewPrice] = useState(0);
  const [newImage, setNewImage] = useState("");

  const addBook = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "books"), {
      title: newTitle,
      price: Number(newPrice),
      img: newImage,
    });
    setNewTitle("");
    setNewPrice(0);
    setNewImage("");
  };

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <Header />
      <DisplayBooks books={books} deleteBook={deleteBook} />
      <AddBooks
        addBook={addBook}
        setNewTitle={setNewTitle}
        setNewPrice={setNewPrice}
        setNewImage={setNewImage}
      />
      <Footer />
    </div>
  );
}
