var thumbUp = document.getElementsByClassName("fa-thumbs-up");
var thumbDown = document.getElementsByClassName("fa-thumbs-down");
var trash = document.getElementsByClassName("fa-trash");

//Workout function begins
 
let exercises = document.querySelectorAll('button')
exercises.forEach(exercises => exercises.addEventListener('click', getWorkout))


 const workouts = {
  method: 'GET',
  headers: {
    'X-API-Key': 'lfkaU7sWaSL6HEilNe7D2A==4U0LwT5YEK6ThsmI',
    
  }
};
function getWorkout() {
   let hash = {
     "Lower Back" :"lower_back",
     "Abdominals" : "abdominals",
     "Biceps": "biceps",
     "Glutes": "glutes",
     "Chest": "chest",
     "Traps": "traps"
   }
    let getWorkout = hash[this.innerHTML]
    fetch(`https://api.api-ninjas.com/v1/exercises?muscle=${getWorkout}`, workouts)
    
    .then(response => response.json())
    .then(res => {
   
      document.querySelector('.sectionOneName').innerText = res[0].name
      strings = res[0].instructions.split('.')
      for(let i = 0; i < strings.length; i++) {
       var list = document.createElement('li');
       document.querySelector('.sectionOneInstructions').appendChild(list);
       list.innerText = strings[i]
      }
  

      document.querySelector('.sectionTwoName').innerText = res[1].name
      strings = res[1].instructions.split('.')
      for(let i = 0; i < strings.length; i++) {
       var list = document.createElement('li');
       document.querySelector('.sectionTwoInstructions').appendChild(list);
       list.innerText = strings[i]
      }
      

      document.querySelector('.sectionThreeName').innerText = res[2].name
      strings = res[2].instructions.split('.')
      for(let i = 0; i < strings.length; i++) {
       var list = document.createElement('li');
       document.querySelector('.sectionThreeInstructions').appendChild(list);
       list.innerText = strings[i]
      }
    

      document.querySelector('.sectionFourName').innerText = res[3].name
      strings = res[3].instructions.split('.')
      for(let i = 0; i < strings.length; i++) {
       var list = document.createElement('li');
       document.querySelector('.sectionFourInstructions').appendChild(list);
       list.innerText = strings[i]
      }
     

      document.querySelector('.sectionFiveName').innerText = res[4].name
      strings = res[4].instructions.split('.')
      for(let i = 0; i < strings.length; i++) {
       var list = document.createElement('li');
       document.querySelector('.sectionFiveInstructions').appendChild(list);
       list.innerText = strings[i]
      }
      

      document.querySelector('.sectionSixName').innerText = res[5].name
      strings = res[5].instructions.split('.')
      for(let i = 0; i < strings.length; i++) {
       var list = document.createElement('li');
       document.querySelector('.sectionSixInstructions').appendChild(list);
       list.innerText = strings[i]
      }
    
  })
  .catch(err => console.error(err));
    
}



document.querySelector('.getInfo').addEventListener('click', getInfo);
