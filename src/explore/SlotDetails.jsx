import { useState } from "react";

export default function SlotDetails({ showSlot }) {
  const [showCancelPrompt, setShowCancelPrompt] = useState(false);
  console.log("outside", showSlot);

  const DetailsCard = () => {
    console.log("inside", showSlot);
    return (
      <>
        <div id="details-time">{showSlot.time}</div>
        <div id="booking-code-box" className="card">
          <div>Booking code</div>
          <div id="booking-code">{showSlot.bookingCode}</div>
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
          <div id="details-card-column-left">
            <div>{showSlot.name}</div>
            <div>{showSlot.contact}</div>
            <div>{showSlot.remarks}</div>
          </div>
          <div id="details-card-column-right">
            <div>{showSlot.type}</div>
            <div>{showSlot.price}</div>
            <button className="border-button">Assign service provider</button>
            <div>{showSlot.discount}</div>
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
    function submit() {
      // TODO: submit cancelation
    }

    return (
      <div id="cancel-prompt">
        <div id="prompt-card" className="card">
          <form onSubmit={submit}>
            <div id="prompt-card-text">
              Please provide a reason for canceling
            </div>
            <input type="text" name="reason" id="cancel-reason" />
            <button>confirm</button>
          </form>

          <button onClick={() => setShowCancelPrompt(false)}>cancel</button>
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
