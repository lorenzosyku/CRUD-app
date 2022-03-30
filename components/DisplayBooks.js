import { db } from "../firebase";
import { getDocs, collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { RefreshIcon, XCircleIcon } from "@heroicons/react/outline";

function DisplayBooks({books, deleteBook, item}) {
  /*const [item, setItem] = useState(null);
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
  };*/
  
  return (
    <div className="p-7">
      <div className="flex place-items-center justify-between py-5">
        <h2 className="text-xl font-bold underline-offset-4 decoration-1 text-gray-900">
          Our Latest Additions
        </h2>
        <h2 className="text-sm font-bold underline-offset-4 decoration-1 text-">
          View More
        </h2>
      </div>
      <div className="flex space-x-3">
        {books &&
          books.map(({ id, img, title, price }) => (
            <div key={id} className="p-2 shadow-md border">
              <div className="relative">
                <div className="relative w-full h-72 rounded-lg overflow-hidden">
                  <img
                    src={img}
                    alt="/"
                    className="w-full h-full object-center object-cover"
                  />
                </div>
                <div>
                  <h2>{title}</h2>
                </div>
                <div>
                  <h3>${price}</h3>
                </div>
              </div>
              <div className="flex w-1/2 space-x-1">
                      <button
                        disabled={item}
                        onClick={() => deleteBook(id)}
                        className={`mt-6 ${
                          item ? "cursor-not-allowed" : ""
                        } w-1/2`}
                      >
                        <span
                          href="/"
                          className={`relative flex ${
                            item ? "bg-red-400" : "bg-red-500 hover:bg-red-400"
                          } border border-transparent rounded-md py-2  items-center justify-center text-sm font-medium text-white`}
                        >
                          <XCircleIcon className="h-6 w-6" />
                        </span>
                      </button>
                      <button
                        disabled={item}
                        onClick={() => setBookId(id)}
                        className={`mt-6 ${
                          item ? "cursor-not-allowed" : ""
                        } w-1/2`}
                      >
                        <span
                          href="/"
                          className={`relative flex ${
                            item
                              ? "bg-green-400"
                              : "bg-green-500 hover:bg-green-400"
                          } border border-transparent rounded-md py-2 items-center justify-center text-sm font-medium text-white`}
                        >
                          <RefreshIcon className="h-6 w-6" />
                        </span>
                      </button>
                    </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default DisplayBooks;
