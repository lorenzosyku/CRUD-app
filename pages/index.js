import Head from "next/head";
import AddBooks from "../components/AddBooks";
import DisplayBooks from "../components/DisplayBooks";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import UpdateForm from "../components/UpdateForm";
import {
  collection,
  onSnapshot,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

export default function Home() {
  const [item, setItem] = useState(null);
  const [books, setBooks] = useState([]);

  const [bookId, setBookId] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

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

  useEffect(() => {
    if (bookId != null) setIsUpdating(true);
  }, [bookId]);

  const updateBook = async () => {
    const bookDoc = doc(db, "books", bookId);
    await updateDoc(bookDoc, {
      title: newTitle,
      price: Number(newPrice),
      img: newImage,
    });
    setBookId(null);
    setNewTitle("");
    setNewPrice(0);
    setNewImage("");
    setIsUpdating(false);
  };

  const resetBookId = () => {
    setBookId(null);
  };

  console.log(item)

  const createCheckoutSession = async () => {
    // WAIT FOR STRIPE PROMISE TO LOAD
    const stripe = await stripePromise;

    //CREATE THE CHECKOUT SESSION & SET UP BACK END
    const checkoutSession = await axios.post("/api/checkout_session", {
      item,
    });

    // GET THE CHECKOUT SESSION ID BACK FROM ENDPOINT AND REDIRECT USER TO STRIPE CHECKOUT
    const result = await stripe.redirectToCheckout({
      // SESSION ID IS TAKEN FROM CHECKOUT SESSION
      sessionId: checkoutSession.data.id,
    });

    // IF THERE IS AN ERROR WITH REDIRECTING USER TO STRIPE SHOW IT
    if (result) alert(result.error.message);
  };

  useEffect(() => {
    if (item != null) {
      createCheckoutSession();
    }
  }, [item]);

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <Header />
      {isUpdating ? (
        <UpdateForm
          updateBook={updateBook}
          resetBookId={resetBookId}
          setNewTitle={setNewTitle}
          setNewPrice={setNewPrice}
          setNewImage={setNewImage}
          newTitle={newTitle}
          newPrice={newPrice}
          newImage={newImage}
          isUpdating={isUpdating}
          setIsUpdating={setIsUpdating}
        />
      ) : null}
      <DisplayBooks
        books={books}
        deleteBook={deleteBook}
        setBookId={setBookId}
        setItem={setItem}
        item={item}
      />
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
