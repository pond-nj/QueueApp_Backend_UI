export function StatsCards({ className }) {
  return (
    <div id="stats-card-wrapper" className={className}>
      <div className="stats-card">
        <div className="stats-card-text">No. of appointment booked</div>
        <span className="stats-card-number">18</span>
      </div>
      <div className="stats-card">
        <div className="stats-card-text">No. of appointment cancelled</div>
        <span className="stats-card-number">5</span>
      </div>
      <div className="stats-card">
        <div className="stats-card-text">No. of appointment completed</div>
        <span className="stats-card-number">13</span>
      </div>
    </div>
  );
}

export default function Stats() {
  return (
    <div className="card stats">
      <div id="stats-header">Today statistics</div>
      <StatsCards />
    </div>
  );
}
