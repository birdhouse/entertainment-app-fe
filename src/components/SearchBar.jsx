const SearchBar = ({ searchTerm, setSearchTerm, mediaType }) => {
  return (
    <div>
      <input
        type="text"
        placeholder={`Search ${mediaType.txt}`}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
