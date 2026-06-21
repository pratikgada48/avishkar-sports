import EventCard from "./EventCard";

function EventGrid({ events }) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {events.map((event) => (
        <EventCard
          key={event.id}
          event={event}
        />
      ))}
    </div>
  );
}

export default EventGrid;