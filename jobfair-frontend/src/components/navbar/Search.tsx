'use client'

import { BiSearch } from "react-icons/bi"

const Search = () => {
    return(
        <div
            className="
                border-[1px]
                w-full
                md:w-auto
                py-2
                rounded-full
                shadow-lg
                hover:shadow-md
                transition
                cursor-pointer
            "
        >
            <div
                className="
                    flex
                    flex-row
                    items-center
                    justify-between
                "
        >
          <div
            className="
                        text-m
                        font-bold
                        px-4
                        
                    "
          >
            <MenuItem label="Companies" onClick={() => router.push("/")} />
          </div>
          <div
            className="
                        sm:block
                        text-sm
                        font-semibold
                        px-6
                        border-x-[1.5px]
                        flex-1
                        text-center
                    "
                >
                    Jobs
                </div>
                <div
                    className="
                        text-sm
                        pl-6
                        pr-2
                        text-gray-600
                        flex
                        flex-row
                        items-center
                        gap-3
                    "
                >
                    <div
                        className="
                            hidden
                            sm:block
                        "
            ></div>
            <div className="container">
              <input
                type="text"
                name="text"
                className="input"
                required
                placeholder="Type to search..."
              />
              <div className="icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="ionicon"
                  viewBox="0 0 512 512"
                >
                  <title>Search</title>
                  <path
                    d="M221.09 64a157.09 157.09 0 10157.09 157.09A157.1 157.1 0 00221.09 64z"
                    fill="none"
                    stroke="currentColor"
                    strokeMiterlimit="10"
                    strokeWidth="32"
                  ></path>
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeMiterlimit="10"
                    strokeWidth="32"
                    d="M338.29 338.29L448 448"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
    )
}

export default Search