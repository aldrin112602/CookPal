import React, { useRef, useState } from "react";
import { IonHeader, IonToolbar, IonIcon } from "@ionic/react";
import { search, closeOutline } from "ionicons/icons";
import { useHistory } from "react-router-dom";
import CookPalDesign from "../../assets/images/CookPal Design.webp";

interface HomeHeaderProps {
  user: any;
  handleSearchInput: (e: any) => void;
  isFocus: boolean;
  setIsFocus: (focus: boolean) => void;
  searchInputRef: React.RefObject<HTMLInputElement>;
  recipes: any[];
  setFilteredRecipes: (recipes: any[]) => void;
}

const BASE_URL_API =
  import.meta.env?.VITE_BASE_URL_API ??
  "https://lavender-armadillo-802676.hostingersite.com/api";

const HomeHeader: React.FC<HomeHeaderProps> = ({
  user,
  handleSearchInput,
  isFocus,
  setIsFocus,
  searchInputRef,
  recipes,
  setFilteredRecipes,
}) => {
  const history = useHistory();

  return (
    <IonHeader style={{ boxShadow: "none" }}>
      <IonToolbar>
        <div className="flex items-center justify-between px-4 py-2">
          <div className="flex items-center justify-start gap-2">
            <img
              src={
                user && user.profile
                  ? `${BASE_URL_API.replace("api", "")}${user.profile}`
                  : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4YreOWfDX3kK-QLAbAL4ufCPc84ol2MA8Xg&s"
              }
              alt="Profile avatar"
              style={{ width: "50px", height: "50px" }}
              className="rounded-full border border-slate-400 cursor-pointer object-cover"
              onClick={() => history.push("/profile")}
            />
            {user && (
              <div style={{ lineHeight: "20px" }}>
                <span className="block font-semibold">{user.name}</span>
                <span className="block">{user.email}</span>
              </div>
            )}
          </div>
          <img
            src={CookPalDesign}
            alt="CookPal"
            className="logo"
            width={"50px"}
          />
        </div>
      </IonToolbar>

      <h1 className="caprasimo-bold px-5">
        Let's make
        <br />
        delicious food's.
      </h1>

      <div className="px-3" style={{ position: "relative" }}>
        <input
          type="search"
          onInput={handleSearchInput}
          onBlur={() => {
            setIsFocus(false);
          }}
          ref={searchInputRef}
          style={{ border: "1px solid #ccc" }}
          className="w-full rounded-full py-3 px-4 transition-all"
          placeholder="Search.."
        />
        {!isFocus && (
          <IonIcon
            icon={search}
            style={{
              position: "absolute",
              right: "30px",
              top: "50%",
              transform: "translateY(-50%)",
            }}
          />
        )}

        {isFocus && (
          <IonIcon
            icon={closeOutline}
            style={{
              position: "absolute",
              right: "30px",
              top: "50%",
              transform: "translateY(-50%)",
            }}
            onClick={() => {
              if (searchInputRef.current) {
                searchInputRef.current.value = "";
                setFilteredRecipes(recipes);
                setIsFocus(false);
              }
            }}
          />
        )}
      </div>
      <br />
    </IonHeader>
  );
};

export default HomeHeader;