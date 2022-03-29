import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";

function AddBooks() {
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
    <div className="bg-slate-300">
      <div className="relative space-y-3 w-3/4">
        <form type="submit">
          <div className="p-5 flex flex-grow">
            <input
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="title"
              className="p-2 text-sm flex-grow"
              type="text"
            />
          </div>
          <div className="p-5 flex flex-grow">
            <input
              value={newPrice}
              onChange={(e) => setNewPrice(e.target.value)}
              placeholder="price"
              className="p-2 text-sm flex-grow"
              type="number"
            />
          </div>
          <div className="p-5 flex flex-grow">
            <input
              value={newImage}
              onChange={(e) => setNewImage(e.target.value)}
              placeholder="image url"
              className="p-2 text-sm flex-grow"
              type="text"
            />
          </div>
          <button onClick={addBook} className="m-5 p-2 text-white bg-slate-800">
            ADD
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddBooks;
