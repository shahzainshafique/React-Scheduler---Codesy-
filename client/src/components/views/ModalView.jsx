import Modal from "react-modal";
import { useState } from "react";

import classes from "./Modal.module.css";
import { saveAgenda } from "../API Calls/Agenda/mentorAgenda";

import moment from "moment";

const ModalView = ({ modalIsOpen, setIsOpen, data }) => {
  //state to store user input for new event
  const [event, setevent] = useState({
    reason: "",
    start: "",
    end: "",
  });

  //function to save new event to database
  const scheduleMeeting = (event) => {
    event.preventDefault();

    saveAgenda(event).then((response) => {
      if (response && response.error) {
        console.log("Error Saving data => ", response.error);
      } else {
        console.log("Data saved successfully");
        alert("Data saved successfully");
      }
    });
  };

  Modal.setAppElement("#root");
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={() => setIsOpen(false)}
      overlayClassName={{
        base: `${classes.overlaybase}`,
        afterOpen: ` ${classes.overlayafter}`,
        beforeClose: ` ${classes.overlaybefore}`,
      }}
      className={{
        base: `${classes.contentbase}`,
        afterOpen: `${classes.contentafter}`,
        beforeClose: `${classes.contentbefore}`,
      }}
      closeTimeoutMS={10}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h3 className={`text-center my-2 ${classes.mainheading}`}>
          Agenda for the day
        </h3>
        <div className="flex justify-center items-center flex-col my-4">
          <div class="flex flex-col">
            <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                <div class="overflow-hidden">
                  <table class="min-w-full">
                    <thead class="bg-white border-b">
                      <tr>
                        <th
                          scope="col"
                          class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                        >
                          #
                        </th>
                        <th
                          scope="col"
                          class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                        >
                          Reason
                        </th>
                        <th
                          scope="col"
                          class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                        >
                          Start{" "}
                        </th>
                        <th
                          scope="col"
                          class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                        >
                          End{" "}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {data &&
                        data.map((item, index) => {
                          return (
                            <tr class="bg-white border-b">
                              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {index + 1}
                              </td>
                              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                {item.title}
                              </td>
                              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                {moment(item.start).format("h:mm:ss a")}
                              </td>
                              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                {moment(item.end).format("h:mm:ss a")}
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div class=" sm:-mx-6 lg:-mx-8">
              <h4 className="text-2xl my-1 ">Add Event</h4>
              <form onSubmit={scheduleMeeting}>
                <div class="mb-5 w-full">
                  <label
                    for="guest"
                    class="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    Reason for meeting?
                  </label>
                  <input
                    type="text"
                    onChange={(e) => {
                      setevent({ ...event, reason: e.target.value });
                    }}
                    name="reason"
                    class="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                </div>

                <div class="-mx-3 flex flex-wrap">
                  <div class="w-full px-3 sm:w-1/2">
                    <div class="mb-5">
                      <label
                        for="date"
                        class="mb-3 block text-base font-medium text-[#07074D]"
                      >
                        Start Time
                      </label>
                      <input
                        type="time"
                        name="starttime"
                        onChange={(e) => {
                          setevent({ ...event, start: e.target.value });
                        }}
                        class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                      />
                    </div>
                  </div>
                  <div class="w-full px-3 sm:w-1/2">
                    <div class="mb-5">
                      <label
                        for="time"
                        class="mb-3 block text-base font-medium text-[#07074D]"
                      >
                        End time
                      </label>
                      <input
                        type="time"
                        name="endtime"
                        onChange={(e) => {
                          setevent({ ...event, end: e.target.value });
                        }}
                        class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <button class="hover:shadow-form self-center rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ModalView;
