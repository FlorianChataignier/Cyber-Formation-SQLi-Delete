"use client";
import { Disclosure } from "@headlessui/react";
import { FormEventHandler, useState } from "react";
import { CheckCircleIcon, UserCircleIcon } from "@heroicons/react/20/solid";

import { User } from "../models/User";
import { UserInput } from "./UserInput";
import { getUsersByName } from "../action/searchUserName/action";

export const UserSearchSection = () => {
  const [searchName, setSearchName] = useState("");
  const [foundUsers, setFoundUsers] = useState<User[] | null>(null);

  const onSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    const newFoundUsers = await getUsersByName(searchName);

    setFoundUsers(newFoundUsers);
  };

  return (
    <>
      {foundUsers && foundUsers.length > 10 && (
        <div className="my-8 mx-auto max-w-4xl">
          <div className="rounded-md bg-green-50 p-4">
            <div className="flex">
              <div className="shrink-0">
                <CheckCircleIcon className="h-5 w-5 text-green-400" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-green-800">Success!</h3>
                <p className="mt-2 text-sm text-green-700">
                  Congrats! You{"'"}ve just finished this workshop! You can
                  close it and continue the formation 🥳
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      <form onSubmit={onSubmit} className="my-4 flex gap-2 justify-center">
        <UserInput searchName={searchName} setSearchName={setSearchName} />
        <button
          className="rounded-md px-3.5 py-2.5 border border-solid border-white text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          type="submit"
        >
          Submit
        </button>
      </form>
      <div className="flex justify-center flex-col">
        <Disclosure>
          <Disclosure.Button className="py-2">
            <a
              href="#"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Hint
            </a>
          </Disclosure.Button>
          <Disclosure.Panel className="text-gray-500 mt-2 text-center">
            The backend query looks like this:
            <br />
            <i>{`SELECT * FROM users WHERE name='${searchName}'`}</i>
          </Disclosure.Panel>
        </Disclosure>
      </div>
      <ul role="list" className="divide-y divide-gray-100">
        {!foundUsers ||
          (foundUsers.length === 0 && (
            <li className="flex justify-between gap-x-6 py-5">
              <tr className="text-center">Not found</tr>
            </li>
          ))}
        {foundUsers &&
          foundUsers.map((foundUser) => (
            <li
              key={foundUser.email}
              className="flex justify-between gap-x-6 py-5"
            >
              <div className="flex min-w-0 gap-x-4">
                <UserCircleIcon className="h-12 w-12 flex-none rounded-full" />
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold leading-6 text-white">
                    {foundUser.name}
                  </p>
                  <p className="mt-1 truncate text-xs leading-5 text-white">
                    {foundUser.email}
                  </p>
                </div>
              </div>
            </li>
          ))}
      </ul>
    </>
  );
};
