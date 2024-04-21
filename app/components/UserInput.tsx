import React, { Dispatch, SetStateAction } from "react";

export const UserInput: React.FC<{
  searchName: string;
  setSearchName: Dispatch<SetStateAction<string>>;
}> = ({ searchName, setSearchName }) => (
  <>
    <input
      className="text-black rounded-md"
      value={searchName}
      onChange={(e) => setSearchName(e.target.value)}
      placeholder="Search user name..."
    />
  </>
);
