function AddBooks() {
  return (
    <div className="bg-slate-300">
      <div className="relative space-y-3">
        <form type="submit">
          <div className="p-5">
            <input placeholder="title" className="p-2 text-sm" type="text" />
          </div>
          <div className="p-5">
            <input placeholder="price" className="p-2 text-sm" type="number" />
          </div>
          <div className="p-5">
            <input placeholder="image url" className="p-2 text-sm" type="text" />
          </div>
          <button className="m-5 p-2 text-white bg-slate-800">ADD</button>
        </form>
      </div>
    </div>
  );
}

export default AddBooks;
