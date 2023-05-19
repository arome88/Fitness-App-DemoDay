// Workout function begins

let exercises = document.querySelectorAll('button')
exercises.forEach(exercise => exercise.addEventListener('click', getWorkout))


const workouts = {
  method: 'GET',
  headers: {
    'X-API-Key': '5IG3Mjwxt1E8Axjx6rwHMf6tpcd0gEskuN5xcWOx',

  }
};

function getWorkout() {
  let hash = {
    "Lower Back": "lower_back",
    "Abdominals": "abdominals",
    "Biceps": "biceps",
    "Glutes": "glutes",
    "Chest": "chest",
    "Traps": "traps"
  }
  let getWorkout = hash[this.innerHTML]
  fetch(`https://api.api-ninjas.com/v1/exercises?muscle=${getWorkout}`, workouts)

    .then(response => response.json())
    .then(res => {

      setWorkoutSection(res, 0, ".sectionOneName", ".sectionOneInstructions");
      setWorkoutSection(res, 1, ".sectionTwoName", ".sectionTwoInstructions");
      setWorkoutSection(res, 2, ".sectionThreeName", ".sectionThreeInstructions");
      setWorkoutSection(res, 3, ".sectionFourName", ".sectionFourInstructions");
      setWorkoutSection(res, 4, ".sectionFiveName", ".sectionFiveInstructions");
      setWorkoutSection(res, 5, ".sectionSixName", ".sectionSixInstructions");
    })
    .catch(err => console.error(err));
}

function setWorkoutSection(res, index, nameSelector, instructionsSelector) {
  const nameElement = document.querySelector(nameSelector);
  const instructionsElement = document.querySelector(instructionsSelector);

  nameElement.innerText = res[index].name;

  const strings = res[index].instructions.split('.');
  strings.forEach(string => {
    if (string.trim() !== "") {
      const listItem = document.createElement('li');
      listItem.innerText = string.trim();
      instructionsElement.appendChild(listItem);
    }
  });
}

Array.from(entries).forEach(function(element) {
  element.addEventListener('click', function(){
    const date = this.parentNode.parentNode.childNodes[1].innerText
    const wtr = this.parentNode.parentNode.childNodes[3].innerText
    fetch('check', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'wtr': wtr,
        'date': date
      })
    }).then(function (response) {
      window.location.reload()
    })
  });
});

const trash = document.getElementsByClassName('fa-trash');
Array.from(trash).forEach(function (element) {
  element.addEventListener('click', function () {
    const name = this.parentNode.parentNode.childNodes[1].innerText;
    const msg = this.parentNode.parentNode.childNodes[3].innerText;
    fetch('messages', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'name': name,
        'msg': msg
      })
    }).then(function (response) {
      window.location.reload()
    })
  });
});

document.querySelector('.getInfo').addEventListener('click', getInfo);
