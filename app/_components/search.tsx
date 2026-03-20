"use client";

import { SearchIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Search = () => {
  const [search, setSearch] = useState<string>("");
  const [error, setError] = useState<string>("");

  const router = useRouter();

  function handleSearch(e: React.SyntheticEvent) {
    e.preventDefault();

    if (search.trim() === "") {
      return setError("Digite algo para buscar!");
    }

    router.push(`/products?name=${search}`)
  }

  return (
    <form onSubmit={handleSearch}>
      <div className="flex h-8.5 gap-2">
        <Input
          placeholder="Digite algo pra pesquisarmos."
          className="bg-white"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setError("");
          }}
        />
        <Button className="h-full bg-amber-500" type="submit">
          <SearchIcon />
        </Button>
      </div>
      {error && <p className="pl-2 mt-2 text-yellow-600">{error}</p>}
    </form>
  );
};

export default Search;
