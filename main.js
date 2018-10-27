const getCrimeData = () => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: "https://data.nashville.gov/resource/napa-nfy2.json",
      type: "GET",
      data: {
        $limit: 20
      }
    })
      .done(data => {
        resolve(data);
      })
      .fail(err => {
        reject("getCrimeDataError", err);
      });
  });
};

const getCrime = () => {
  getCrimeData()
    .then(crime => {
      writeCrime(crime);
    })
    .catch(error => {
      console.log(error);
    });
};

const writeCrime = crimes => {
  let domString = "";
  crimes.forEach(crime => {
    domString += `
    <div class="card m-2" style="width: 20rem; border: 1px solid black">
        <div class="card-body">
            <h4 class="card-title">Type: ${crime.offense_description}</h4>
            <p class="card-subtitle mb-2 text-muted">Location: ${crime.incident_location}</p>
            <p class="card-text">Victim Description: ${crime.victim_description}</p>
        </div>
    </div>`
  });
  $("#crime").html(domString);
};

getCrime();