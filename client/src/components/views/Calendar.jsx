import React from "react";
import { useState } from "react";
import { useEffect } from "react";

import { getMentorAgenda } from "../API Calls/Agenda/mentorAgenda";
import ModalView from "./ModalView";
import Header from "./Header";

import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const CalendarPage = () => {
  const [timeslot, settimeslot] = useState([]); //state to store time slots from API
  const [mentor, setmentor] = useState([]); //state to store mentor information from API
  const [filtered, setfilter] = useState([]); //state to store selected date information from API
  const [modalIsOpen, setIsOpen] = useState(false); //state to store value for toggling modal view

  useEffect(() => {
    getMentorAgenda().then((data) => {
      if (data && data.error) {
        console.log("Error retrieving mentor agenda =>", data.error);
      } else {
        setmentor(data.mentor);
        settimeslot(data.calendar);
      }
    });
  }, []);

  //convert date to accepted format
  const convertedDates =
    timeslot &&
    timeslot.map((timeslot) => {
      return {
        title: "Reason",
        start: moment(timeslot.date_time).toDate(),
        end: moment(timeslot.date_time).add(1, "hour").toDate(),
      };
    });
  return (
    <div>
      <Header mentor={mentor} />
      <Calendar
        selectable
        localizer={localizer}
        defaultDate={new Date()}
        defaultView={"month"}
        onSelectSlot={(slotInfo) => {
          const { start, end } = slotInfo;
          const eventsForThisDay = convertedDates.filter(
            (event) => event.start >= start && event.start < end
          );
          setfilter(eventsForThisDay);
          setIsOpen(!modalIsOpen);
        }}
        events={convertedDates}
        style={{ height: "100vh" }}
      />

      {modalIsOpen && (
        <ModalView
          modalIsOpen={modalIsOpen}
          setIsOpen={setIsOpen}
          data={filtered}
        />
      )}
    </div>
  );
};

export default CalendarPage;
