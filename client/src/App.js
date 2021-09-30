import './css/App.css';
import React, { useState } from 'react';
import Toggle from './components/Toggle';
import Description from './components/Description';
import ScrollableList from './components/ScrollableList';
import TechLead from './components/TechLead';
import ExpirationDatePicker from './components/ExpirationDatePicker';
import WeeklySchedule from './components/WeeklySchedule';
import ProgressBar from './components/ProgressBar';
import dateFormat from 'dateformat';
import e from 'cors';


function App() {

  const [shiftType, setShiftType] = useState("Regular");
  const [description, setDescription] = useState("");
  const [techLead, setTechLead] = useState("");
  const [expirationDate, setExpirationDate] = useState(null);
  
  const [scheduleComplete, setScheduleComplete] = useState(false);
  const [descriptionComplete, setDescriptionComplete] = useState(false);
  const [techLeadComplete, setLeadComplete] = useState(false);
  const [expirationComplete, setExpirationComplete] = useState(false);

  const [addedDays, setAddedDays] = useState({
    mon: false,
    tue: false,
    wed: false,
    thur: false,
    fri: false,
    sat: false,
    sun: false
  });
  const [week, setWeek] = useState({
      mondayStart: "12",
      mondayEnd: "12",
      tuesdayStart: "12",
      tuesdayEnd: "12",
      wednesdayStart: "12",
      wednesdayEnd: "12",
      thursdayStart: "12",
      thursdayEnd: "12",
      fridayStart: "12",
      fridayEnd: "12",
      saturdayStart: "12",
      saturdayEnd: "12",
      sundayStart: "12",
      sundayEnd: "12",
  });

  const nameList = ["Jeremy Renner", "Chris Hemsworth", "Scarlett Johansson", "Robert Downey Jr.", "Chris Evans", 
    "Mark Ruffalo", "Jennifer Aniston", "Al Pacino", "Tom Hanks", "Kate Hudson", "Robin Williams", "Merryl Streep", 
    "Julie Andrews", "Selena Gomez", "Theo James", "Liam Hemsworth", "Timothy Chalamet", "Adam Sandler", "Emma Stone"];


  const submit = async () => {
    var jsonData = { "Shift Type": shiftType, "Tech Lead": techLead, 
      "Expiration Date": dateFormat(expirationDate, "mm/dd/yyyy"),
      ShiftDetails: [] };


    if (addedDays.mon){
      jsonData.ShiftDetails[jsonData.ShiftDetails.length] = {Day:"Monday", FromTime: week.mondayStart + ":00", EndTime: week.mondayEnd + ":00"};
    }
    if (addedDays.tue){
      jsonData.ShiftDetails[jsonData.ShiftDetails.length] = {Day:"Tuesday", FromTime: week.tuesdayStart + ":00", EndTime: week.tuesdayEnd + ":00"};
    }
    if (addedDays.wed){
      jsonData.ShiftDetails[jsonData.ShiftDetails.length] = {Day:"Wednesday", FromTime: week.wednesdayStart + ":00", EndTime: week.wednesdayEnd + ":00"};
    }
    if (addedDays.thur){
      jsonData.ShiftDetails[jsonData.ShiftDetails.length] = {Day:"Thursday", FromTime: week.thursdayStart + ":00", EndTime: week.thursdayEnd + ":00"};
    }
    if (addedDays.fri){
      jsonData.ShiftDetails[jsonData.ShiftDetails.length] = {Day:"Friday", FromTime: week.fridayStart + ":00", EndTime: week.fridayEnd + ":00"};
    }
    if (addedDays.sat){
      jsonData.ShiftDetails[jsonData.ShiftDetails.length] = {Day:"Saturday", FromTime: week.saturdayStart + ":00", EndTime: week.saturdayEnd + ":00"};
    }
    if (addedDays.sun){
      jsonData.ShiftDetails[jsonData.ShiftDetails.length] = {Day:"Sunday", FromTime: week.sundayStart + ":00", EndTime: week.sundayEnd + ":00"};
    }

    const response = await fetch('/write', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(jsonData),
    });

    const body = await response.text(); 

  }

  var progress = 0;
  var submitDisabled = true;

  if (expirationComplete)
    progress = progress + 25;
  if (descriptionComplete)
    progress = progress + 25;
  if (scheduleComplete)
    progress = progress + 25;
  if (techLeadComplete)
    progress = progress + 25;
  
  if (progress === 100) {
    submitDisabled = false;
  }

  return (
    <div className="parent">

      <div className="left">
        <Toggle shiftType={shiftType} setShiftType={setShiftType}/>
        <table>
          <tbody>
            <tr>
              <td><WeeklySchedule week={week} setWeek={setWeek} addedDays={addedDays} setAddedDays={setAddedDays} scheduleComplete={scheduleComplete} setScheduleComplete={setScheduleComplete} /></td>
              <td style={{paddingLeft: "1vw"}}>
                <TechLead techLead={techLead} />
                <br></br><br></br><br></br><br></br><br></br><br></br>
                <br></br><br></br><br></br><br></br><br></br>
                <ExpirationDatePicker expirationDate={expirationDate} setExpirationDate={setExpirationDate} setExpirationComplete={setExpirationComplete} />

              </td>
            </tr>
            <tr>
              <Description setDescription={setDescription} setDescriptionComplete={setDescriptionComplete} />
            </tr>
          </tbody>
        </table>
        
      </div>

      <div className="right">
        <ScrollableList nameList={nameList} setTechLead={setTechLead} setLeadComplete={setLeadComplete}/>
      </div>
      <div className="progress">
        <ProgressBar progress={progress} />
        <br></br>
      </div>
      <div className="footer">
        <button disabled={submitDisabled} style={{fontFamily: "Annie Use Your Telescope", fontSize: "18px"}} className="submitBtn" onClick={submit}>Submit</button>
      </div>
    </div>
  );
}

export default App;
