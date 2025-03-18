import { useState, useRef } from "react";

const useSearch = (recipes: any[]) => {
  const [filteredRecipes, setFilteredRecipes] = useState(recipes);
  const [isFocus, setIsFocus] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleSearchInput = (e: any) => {
    setIsFocus(true);
    const searchTerm = e.target.value.trim().toLowerCase();

    if (!searchTerm) {
      setFilteredRecipes(recipes);
    } else {
      handleSearchTerm(searchTerm);
    }
  };

  const handleSearchTerm = (searchTerm: string) => {
    const filteredItems = recipes.filter((recipe) =>
      recipe.title.toLowerCase().includes(searchTerm)
    );
    setFilteredRecipes(filteredItems);
  };

  return {
    filteredRecipes,
    setFilteredRecipes,
    isFocus,
    setIsFocus,
    searchInputRef,
    handleSearchInput,
  };
};

export default useSearch;