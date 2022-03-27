import { db } from "../firebase";
import { getDocs, collection } from "firebase/firestore";
import { useEffect, useState } from "react"

function DisplayBooks() {
  const [item, setItem] = useState(null);
  const [books, setBooks] = useState([]);

  useEffect(()=>{
    const booksRef = collection(db, "books");

    const getBooks = getDocs(booksRef).then((snapshot)=>{
      let result = [];
      snapshot.docs.map((doc) => {
        result.push({...doc.data(), id: doc.id});
      })
      setBooks(result);
    })
  },[])
  return (
    <div>
      {books && books.map(({id, img, title, price})=>(
        <div key={id} className="">
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
