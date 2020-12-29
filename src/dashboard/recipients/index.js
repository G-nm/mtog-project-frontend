import React from "react";

import { Fileuploadcomponent } from "./fileuploadcomponent";
import { Recipientsform } from "./recipientsform";
import { Recipientstable } from "./Recipientstable";

export const Recipient = (props) => {
  return (
    <section className="  rounded-2xl  p-2 flex flex-col">
      <article className="w-full row-span-2 ">
        <Fileuploadcomponent />
      </article>

      <article className="pt-2 ">
        <Recipientsform />
      </article>
      <article>
        <section className="float-right">
          <input
            type="text"
            placeholder="Search"
            className="border border-black  pl-2"
          />
        </section>
      </article>
      <article className="p-4 relative">
        <Recipientstable />
      </article>
    </section>
  );
};

//Drag and drop to add recipients
// Manual form to add recipients
//A table to see the recipients
//Buttons to delete a recipient or edit their data
// View a recipients current balance
