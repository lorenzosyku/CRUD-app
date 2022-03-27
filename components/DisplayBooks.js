import { db } from "../firebase";
import { getDocs, collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react"

function DisplayBooks() {
  const [item, setItem] = useState(null);
  const [books, setBooks] = useState([]);

  useEffect(()=>{
    const booksRef = collection(db, "books");

    const getBooks = onSnapshot(booksRef, (snapshot)=>{
      let result = [];
      snapshot.docs.map((doc) => {
        result.push({...doc.data(), id: doc.id});
      })
      setBooks(result);
    });
    return () => getBooks();
  },[])
  return (
    <div className="flex space-x-3">
      {books && books.map(({id, img, title, price})=>(
        <div key={id} className="p-2 shadow-md border">
          <div className="relative">
            <div><img src={img} alt="/" /></div>
            <div><h2>{title}</h2></div>
            <div><h3>${price}</h3></div>
          </div>
          
        </div>
      ))}
    </div>
  )
}

export default DisplayBooks
