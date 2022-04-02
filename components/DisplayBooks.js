import { RefreshIcon, XCircleIcon } from "@heroicons/react/outline";

function DisplayBooks({ books, deleteBook, item, setBookId, setItem }) {
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
              <button
                onClick={() => setItem([{ title, price, img }])}
                disabled={item}
                className={`mt-6 ${item ? "cursor-not-allowed" : ""} w-full`}
              >
                <span
                  href="/"
                  className={`relative flex ${
                    item ? "bg-gray-200" : "bg-gray-100 hover:bg-gray-200"
                  } border border-transparent rounded-md py-2 px-8 h-full items-center justify-center text-sm font-medium text-gray-900 `}
                >
                  {!item ? "Buy now" : "Loading..."}
                  <span className="sr-only">, {title}</span>
                </span>
              </button>
              <div className="flex w-1/2 space-x-1">
                <button
                  disabled={item}
                  onClick={() => deleteBook(id)}
                  className={`mt-6 ${item ? "cursor-not-allowed" : ""} w-1/2`}
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
                  className={`mt-6 ${item ? "cursor-not-allowed" : ""} w-1/2`}
                >
                  <span
                    href="/"
                    className={`relative flex ${
                      item ? "bg-green-400" : "bg-green-500 hover:bg-green-400"
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
