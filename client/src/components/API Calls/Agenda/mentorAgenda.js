//API Call to get scheduled agenda of a mentor
const getMentorAgenda = async () => {
  try {
    let response = await fetch(
      "https://private-37dacc-cfcalendar.apiary-mock.com/mentors/1/agenda",
      {
        method: "GET",
      }
    );
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

//API Call to save schedule meeting to database
const saveAgenda = async (data) => {
  try {
    let response = await fetch(
      "http://localhost:5000/api/agenda/create",
      data,
      {
        method: "POST",
      }
    );
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};
export { getMentorAgenda, saveAgenda };
