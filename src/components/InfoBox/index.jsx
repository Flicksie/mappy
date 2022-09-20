export default function InfoBox({ current }) {
  return (
    <div className="info-box">
      {current?.ip ? (
        <>
          <div className="title-card">
            <div className="country-flag">
              <img alt="Flag" src={current.location.country_flag} />
            </div>
            <div className="titles">
              <h1>{current.city}</h1>
              <h2>{current.country_name}</h2>
            </div>
          </div>
          <ul>
            <li>
              <b>Continent:</b> {current.continent_name}
            </li>
            <li>
              <b>Region:</b> {current.region_name}
            </li>
            <li>
              <b>Area Code:</b> {current?.location?.calling_code}
            </li>
          </ul>
        </>
      ) : null}
    </div>
  );
}
