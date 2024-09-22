import React, { useState,useEffect } from "react";
import Header from "../components/Header";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);


function VCalendar() {
  const [events, setEvents] = useState([]);
  

  useEffect(() => {
    const storedEvents = localStorage.getItem("events");
    console.log("String value", storedEvents);
    if (storedEvents) {
      console.log("Stored events:", storedEvents);
      try {
        const parsedEvents = JSON.parse(storedEvents);
        console.log("JSON value", parsedEvents);
        console.log("Retrieved events from local storage:", parsedEvents);
        const formattedEvents = parsedEvents.map((event) => ({
          ...event,
          start: new Date(event.start),
          end: new Date(event.end),
        }));
        setEvents(formattedEvents);
      } catch (error) {
        console.error("Error parsing retrieved events:", error);
      }
    } else {
      console.log("No events found in local storage.");
    }
  }, []);

 

  return (
    <>
    <Header />
    <div style={{ height: "500px" }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ margin: "50px" }}
        selectable={true}
       
      />

     
    </div>
    </>
  );
};

export default VCalendar;