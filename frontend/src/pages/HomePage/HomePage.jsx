
const HomePage = ({ books }) => {

  return( <div>
  <h1>Story Time</h1>
  <h2>Day of the Week {forecast.day}</h2>
        <img src={forecast.img} alt={forecast.imgAlt} />
        <p><span>conditions: {forecast.conditions} </span> </p>
        <p><span>time: {forecast.time}</span> </p>
  </div>
)
}

export default HomePage;