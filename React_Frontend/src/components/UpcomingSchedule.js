import React from 'react';

const UpcomingSchedule = (props) => {
  return (
    <div className={props.className}>
      <h4>{props.name}</h4>
      <h5>Monday</h5>
      <h5>Tuesday</h5>
      <h5>Wednesday</h5>
      <h5>Thursday</h5>
      <h5>Friday</h5>
      <h5>Saturday</h5>
      <h5>Sunday</h5>
      <p>Times</p>
      {Object.entries(props.schedule).map(([day,time]) =>{
          return <p>{time}</p>
        })
      }
    </div>
  );
};

export default UpcomingSchedule;
