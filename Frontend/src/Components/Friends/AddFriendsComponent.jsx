import { useEffect, useState } from "react";
import axios from "axios";
import { debounce } from "lodash";
import { searchFriends } from "../../HandleApi/FriendsApiHandler";
import SearchResultCard from "./SearchResultCard";

export default function AddFriendsComponent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSearchResults = async () => {
      setLoading(true);
      try {
        if (!searchQuery) {
          setSearchResults([]);
          return;
        }

        const response = await searchFriends(searchQuery);
        setSearchResults(response.data);
      } catch (error) {
        console.error("Error searching friends:", error);
      }
      setLoading(false);
    };

    const debouncedFetchSearchResults = debounce(fetchSearchResults, 300);

    debouncedFetchSearchResults();

    return () => {
      // Cancel the debounced function on component unmount
      debouncedFetchSearchResults.cancel();
    };
  }, [searchQuery]);

  return (
    <div>
      <h1 className="text-3xl font-bold">Add Friends</h1>
      <h4 className="text-gray-300">
        Search for users by their username and add them to your friends list.
      </h4>
      <div className="mt-6 flex w-full items-center justify-center">
        <input
          onChange={(e) => setSearchQuery(e.target.value)}
          className="h-10 w-full max-w-xl flex-1 rounded-lg bg-slate-800/50 px-3 text-white placeholder:py-2 focus:outline-dashed focus:outline-slate-600"
          placeholder="Search username"
        />
      </div>
      <div className="mx-auto my-8 max-w-2xl space-y-2">
        {searchQuery
          ? searchResults.length > 0
            ? searchResults.map((result) => (
                <SearchResultCard user={result} key={result._id} />
              ))
            : !loading && <h3>No users found!</h3>
          : null}
      </div>
    </div>
  );
}
