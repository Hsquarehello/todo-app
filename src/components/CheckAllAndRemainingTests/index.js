import React from "react";
import { useState } from "react";


export default function CheckAllAndRemainingTests({remaining_count,checkAll}) {
  return (
    <div className="check-all-container">
      <div>
        <div className="button" onClick={checkAll}>Check All</div>
      </div>

      <span>{remaining_count} item{remaining_count > 1 ? 's': ''} remaining</span>
    </div>
  );
}
