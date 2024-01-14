import {
  Note,
  Percent,
  Phone,
  Seal,
  Storefront,
  Tag,
  User,
} from "@phosphor-icons/react";
import { useState } from "react";
import { style } from "../style";

export default function SlotDetails({ showSlot }) {
  const [showCancelPrompt, setShowCancelPrompt] = useState(false);

  const DetailsCard = () => {
    return (
      <>
        <div id="details-time">{showSlot.time}</div>
        <div id="booking-code-box" className="card">
          <div>Booking code</div>
          <div id="booking-code" className="tracking-[4rem]">
            {showSlot.bookingCode}
          </div>
          <div id="cancel-booking-wrap" className="footer-wrapper">
            <button
              onClick={() => setShowCancelPrompt(true)}
              id="cancel-booking"
              className="hover-underline"
            >
              Cancel booking
            </button>
          </div>
        </div>
        <div id="details-card-column">
          <div id="details-card-column-left" className="space-y-2">
            <div className="flex flex-row space-x-2 items-center">
              <User size="1.5rem" color={style.lightSubColor} weight="fill" />
              <div>{showSlot.name}</div>
            </div>

            <div className="flex flex-row space-x-2 items-center">
              <Phone size="1.5rem" color={style.lightSubColor} weight="fill" />
              <div>{showSlot.contact}</div>
            </div>

            <div className="flex flex-row space-x-2 items-center">
              <Note size="1.5rem" color={style.lightSubColor} weight="fill" />
              <div>{showSlot.remarks}</div>
            </div>
          </div>
          <div id="details-card-column-right" className="space-y-2">
            <div className="flex flex-row space-x-2 items-center">
              <Seal size="1.5rem" color={style.lightSubColor} weight="fill" />
              <div>{showSlot.type}</div>
            </div>

            <div className="flex flex-row space-x-2 items-center">
              <Tag size="1.5rem" color={style.lightSubColor} weight="fill" />
              <div>{showSlot.price}</div>
            </div>

            <div className="flex flex-row space-x-2 items-center">
              <Storefront
                size="1.5rem"
                color={style.lightSubColor}
                weight="fill"
              />
              <button className="border-button">Assign service provider</button>
            </div>

            <div className="flex flex-row space-x-2 items-center">
              <Percent
                size="1.5rem"
                color={style.lightSubColor}
                weight="fill"
              />
              <div>{showSlot.discount}</div>
            </div>
          </div>
        </div>

        <div className="footer-wrapper">
          <button id="no-show-button">No show</button>
          <button>Check in</button>
        </div>
      </>
    );
  };

  const CancelPrompt = () => {
    const [text, setText] = useState("");

    function submit() {
      // TODO: submit cancelation
    }

    function textAreaAdjust(element) {
      element.style.height = "1px";
      element.style.height = 25 + element.scrollHeight + "px";
    }

    return (
      <div id="cancel-prompt">
        <div id="prompt-card" className="card">
          <form onSubmit={submit}>
            <div id="prompt-card-text">
              Please provide a reason for canceling
            </div>
            <div className="py-4">
              <textarea
                type="text"
                name="reason"
                id="cancel-reason"
                value={text}
                onChange={(event) => {
                  setText(event.target.value);
                }}
                onKeyUp={(event) => {
                  textAreaAdjust(event.target);
                }}
                className="text-black resize-none"
              />
            </div>

            <div className="flex flex-row space-x-2 justify-end">
              <button>confirm</button>
              <div
                onClick={() => setShowCancelPrompt(false)}
                className="button"
              >
                cancel
              </div>
            </div>
          </form>
        </div>
        <div id="background-prompt"></div>
      </div>
    );
  };

  return (
    <div id="slot-details" className="card">
      {showSlot === null ? <div>Loading</div> : <DetailsCard />}
      {showCancelPrompt ? <CancelPrompt /> : null}
    </div>
  );
}
