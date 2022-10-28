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

export { getMentorAgenda };
