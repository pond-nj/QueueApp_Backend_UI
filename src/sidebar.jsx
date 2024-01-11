export default function SideBar() {
  return (
    <>
      <div id="sidebar">
        <nav>
          <ul>
            <li>
              <a href={`/explore`}>Explore</a>
            </li>
            <li>
              <a href={`/notification`}>Notification</a>
            </li>
            <li>
              <a href={`/schedule`}>Schedule</a>
            </li>
            <li>
              <a href={`/analytics`}>Analytics</a>
            </li>
            <li>
              <a href={`/analytics`}>Profile</a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
