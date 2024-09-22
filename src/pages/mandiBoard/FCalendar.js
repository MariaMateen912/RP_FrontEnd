import React, { useState, useEffect } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import axios from "axios";
import Header from "../components/Header";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";

const localizer = momentLocalizer(moment);

function MyCalendar() {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [eventTitle, setEventTitle] = useState("");
  const [selectEvent, setSelectEvent] = useState(null);

  useEffect(() => {
    const storedEvents = localStorage.getItem("events");
    if (storedEvents) {
      try {
        const parsedEvents = JSON.parse(storedEvents);
        const formattedEvents = parsedEvents.map((event) => ({
          ...event,
          start: new Date(event.start),
          end: new Date(event.end),
        }));
        setEvents(formattedEvents);
      } catch (error) {
        console.error("Error parsing retrieved events:", error);
      }
    }
  }, []);

  const handleSelectSlot = (slotInfo) => {
    setShowModal(true);
    setSelectedDate(slotInfo.start);
    setSelectEvent(null);
  };

  const handleSelectedEvent = (event) => {
    setShowModal(true);
    setSelectEvent(event);
    setEventTitle(event.title);
  };

  const saveEvent = async () => {
    if (eventTitle && selectedDate) {
      let updatedEvents;
      if (selectEvent) {
        const updatedEvent = { ...selectEvent, title: eventTitle };
        updatedEvents = events.map((event) =>
          event === selectEvent ? updatedEvent : event
        );
        setEvents(updatedEvents);
      } else {
        const newEvent = {
          title: eventTitle,
          start: selectedDate,
          end: moment(selectedDate).add(1, "hours").toDate(),
        };
        const existingEvents = JSON.parse(localStorage.getItem("events")) || [];
        updatedEvents = [...existingEvents, newEvent];
        localStorage.setItem("events", JSON.stringify(updatedEvents));
        setEvents(updatedEvents);
      }
      setShowModal(false);
      setEventTitle("");
      setSelectEvent(null);
    }

    const eventData = {
      title: eventTitle,
      start: selectedDate,
    };
    const response = await axios.post(
      "http://localhost:5000/api/auth/events",
      eventData
    );
    console.log(response.data.event._id);
  };

  return (
    <>
      <Header />
      <div style={{ height: "500px", marginTop: "30px" }}>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ margin: "50" }}
          selectable={true}
          onSelectSlot={handleSelectSlot}
          onSelectEvent={handleSelectedEvent}
        />
        <Dialog
          open={showModal}
          onClose={() => {
            setShowModal(false);
            setEventTitle("");
            setSelectEvent(null);
          }}
        >
          <DialogTitle>
            {selectEvent ? "Edit Event" : "Add Event Name"}
          </DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Event Title"
              fullWidth
              variant="outlined"
              value={eventTitle}
              onChange={(e) => setEventTitle(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            {selectEvent && (
              <Button
                color="error"
                onClick={() => {
                  // deleteEvent(); Uncomment this when you implement deleteEvent
                }}
              >
                Delete Event
              </Button>
            )}
            <Button
              onClick={() => {
                setShowModal(false);
                setEventTitle("");
                setSelectEvent(null);
              }}
            >
              Cancel
            </Button>
            <Button
              color="primary"
              variant="contained"
              onClick={saveEvent}
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}

export default MyCalendar;
