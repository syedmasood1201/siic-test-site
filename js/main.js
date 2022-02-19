document.addEventListener("DOMContentLoaded", () => {
  window.db
    .collection("machineType")
    .get()
    .then((data) => {
      data.docs.map((doc) => {
        window.db
          .collection(`machineType/${doc.id}/machines`)
          .get()
          .then((machines) => {
            let root = document.getElementById("slotData");
            let html = "";
            console.log("fetched machines");
            machines.docs.map((machineDoc) => {
              html += `<div class="d-flex p-2 bd-highlight machine" id="${
                machineDoc.id
              }">
      <br>
      <h5> <a href="#" class="text-dark">${
        machineDoc.data().machineType
      }</a></h6>&nbsp;&nbsp;
        <p class="small text-muted mb-0">#${machineDoc.id}</p>`;
              let slotsHTML = `<div class="row" id="machineHealthBox">`;
              window.db
                .collection(
                  `machineType/${doc.id}/machines/${machineDoc.id}/timeSlots`
                )
                .get()
                .then((slots) => {
                  slots.docs.map((slot) => {
                    slotsHTML += `<!-- Gallery item -->
          <div class="col-xl-3 col-lg-4 col-md-6 mb-4">
            <div class="bg-white rounded shadow-sm">
              <div class="p-4">
                  <h6> <a href="#" class="text-dark">${
                    slot.data().slot
                  }</a></h6>
                  <br>
                  <a href="#" id="${slot.data().status==="available"?"healthButton":"healthButton1"}">${slot.data().status}</a>
              </div>
            </div>
          </div>
          <!-- End -->`;
                  });
                }).finally(() => {
                  document.getElementById(machineDoc.id).innerHTML += slotsHTML+"</div>";
                });
              html += `</div>
    </div>`;
            });
            root.innerHTML = html;
          });
      });
    });
});
