import React from "react";
import { useState } from "react";
import { useEffect } from "react";

import { getMentorAgenda } from "../API Calls/Agenda/mentorAgenda";

import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const CalendarPage = () => {
  const [timeslot, settimeslot] = useState([]); //state to store time slots from API
  const [mentor, setmentor] = useState([]); //state to store mentor information from API

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
      <h3>{mentor.name}</h3>
      <h3>{mentor.time_zone}</h3>
      <Calendar
        selectable
        localizer={localizer}
        defaultDate={new Date()}
        defaultView="month"
        events={convertedDates}
        style={{ height: "100vh" }}
      />
    </div>
  );
};

export default CalendarPage;
