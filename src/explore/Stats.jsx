export function StatsCards({ className, scheduleMap, today }) {
  const todayDate = new Date();
  const todaySchedule = scheduleMap[todayDate.toLocaleDateString()].filter(
    (schedule) => {
      const date = new Date(schedule.date);
      return date.toLocaleDateString() === todayDate.toLocaleDateString();
    }
  );

  let stats;
  if (today) {
    stats = {
      booked: scheduleMap ? todaySchedule.length : 18,
      cancelled: scheduleMap ? 0 : 18,
      completed: scheduleMap ? todaySchedule.length : 13,
    };
  } else {
    stats = {
      booked: scheduleMap.length,
      cancelled: 0,
      completed: scheduleMap.length,
    };
  }

  return (
    <div id="stats-card-wrapper" className={className}>
      <div className="stats-card">
        <div className="stats-card-text">No. of appointment booked</div>
        <span className="stats-card-number">{stats.booked}</span>
      </div>
      <div className="stats-card">
        <div className="stats-card-text">No. of appointment cancelled</div>
        <span className="stats-card-number">{stats.cancelled}</span>
      </div>
      <div className="stats-card">
        <div className="stats-card-text">No. of appointment completed</div>
        <span className="stats-card-number">{stats.completed}</span>
      </div>
    </div>
  );
}

export default function Stats({ scheduleMap }) {
  return (
    <div className="card stats min-h-0">
      <div id="stats-header">Today statistics</div>
      <StatsCards className="flex-1 min-h-0" scheduleMap={scheduleMap} today />
    </div>
  );
}
