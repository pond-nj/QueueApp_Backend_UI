import { useState } from "react";

export default function SlotDetails({ showSlot }) {
  const [showCancelPrompt, setShowCancelPrompt] = useState(false);
  function DetailsCard() {
    return (
      <div id="details-card">
        <div>{showSlot?.name}</div>
        <div>{showSlot?.contact}</div>
        <button onClick={() => setShowCancelPrompt(true)}>cancel</button>
      </div>
    );
  }

  function CancelPrompt() {
    function submit() {
      // TODO: submit cancelation
    }

    return (
      <div id="cancel-prompt">
        <div id="card">
          <form onSubmit={submit}>
            <p>Please provide a reason for canceling</p>
            <input type="text" name="reason" />
            <button>confirm</button>
          </form>

          <button onClick={() => setShowCancelPrompt(false)}>cancel</button>
        </div>
        <div id="background-prompt"></div>
      </div>
    );
  }
  return (
    <div id="details">
      <h2>Details</h2>
      {showSlot === null ? <div>Loading</div> : <DetailsCard />}
      {showCancelPrompt ? <CancelPrompt /> : null}
    </div>
  );
}
