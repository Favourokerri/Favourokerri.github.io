submit = document.getElementById('submit');
 let elevatorStatus = [];
 let floorStatus = [];

// function to display ui
function floorType(totalFloors, currentFloor) {
  if (currentFloor === totalFloors ){
    const data = ` <div id="floor-${currentFloor}"  class="floor">
                   <div id="elevator-btn">
                    <button class="down-btn" id="${currentFloor}">Down</button>
                  </div>
                  </div>
                `
    return data                
  } else if(currentFloor === 1){
    const data = ` <div id="floor-${currentFloor}" class="floor">
                   <div id="elevator-btn">
                    <button class="up-btn" id="${currentFloor}">Up</button>
                   </div>
                  </div>
                  `
    return data            
  }
  
  else{
    const data = ` <div id="floor-${currentFloor}"  class="floor">
                   <div id="elevator-btn">
                     <button class="up-btn" id="${currentFloor}">Up</button>
                     <button class="down-btn" id="${currentFloor}">Down</button>
                  </div>
                  </div>
                `
    return data
  }
}

submit.addEventListener('click', function DisplayFloor(event) {
    event.preventDefault();
    const NoFloors = Number(document.getElementById('floors').value);
    const elevators = Number(document.getElementById('lifts').value);


    const form = document.getElementById('form');
    const elevatorContainer = document.getElementById('elevator-container');
    form.classList.add('hide');
    elevatorContainer.parentElement.classList.remove('hide');

    let floor = '';
    for(i=NoFloors; i>=1; i--){
        floor += floorType(NoFloors, i)
        elevatorContainer.innerHTML = floor;
    }

    firstFloor = document.getElementById(`floor-${1}`);
    for(i=1; i<= elevators; i++){
      let elevatorDiv = document.createElement('div');
      elevatorDiv.id = `elevator-${i}`;
      elevatorDiv.classList.add('elevator');
      firstFloor.appendChild(elevatorDiv);
      elevatorStatus.push({id: `elevator-${i}`, currentFloor: firstFloor, state: 'idel'});
      console.log(elevatorStatus);
    }
    initializeButtons();
    
})


async function initializeButtons() {
  let elevatorsNotInFloor1 = [];
  const downBtns = document.querySelectorAll('.down-btn');
  const upBtn = document.querySelectorAll('.up-btn');
  downBtns.forEach((button) => {
    button.addEventListener('click', function(){
      floorId = button.id
      floor = document.getElementById(`floor-${floorId}`);
      console.log(floor)
      const elevatorToMove = elevatorStatus.find((e) => {
        return floor.querySelector(`#${e.id}`) === null && e.state !== 'moving';
      })

      if (!elevatorToMove && floorId !== '1') {
        elevators = floor.querySelectorAll('.elevator');
        elevators.forEach((elevator) => {
          elevator.classList.add('open');
          setTimeout(() => {
              elevator.classList.remove('open');
          }, 2500);
        });

      } else if (!elevatorToMove && floorId === '1' ){
        elevatorId = elevatorsNotInFloor1.shift()
        console.log(elevatorId.id);
        const elevator = document.getElementById(`${elevatorId.id}`);
        elevator.classList.add('move');
        elevator.style.transform = `translateY(${0}px)`;
        elevator.classList.add('open');
        setTimeout(() => {
          elevator.classList.remove('open');
      }, 2000);
      }   
      else {
        elevatorToMove.state = 'moving';
        moveElevator(elevatorToMove, floorId);
        if (!elevatorsNotInFloor1.includes(elevatorToMove)) {
          elevatorsNotInFloor1.push(elevatorToMove);
      }
        console.log(elevatorsNotInFloor1);
      }
      
    })
  })

  upBtn.forEach((button) => {
    button.addEventListener('click', function(){
      floorId = button.id
      floor = document.getElementById(`floor-${floorId}`);
      console.log(floor)
      const elevatorToMove = elevatorStatus.find((e) => {
        return floor.querySelector(`#${e.id}`) === null && e.state !== 'moving';
      })

      if (!elevatorToMove && floorId !== '1') {
        elevators = floor.querySelectorAll('.elevator');
        elevators.forEach((elevator) => {
          elevator.classList.add('open');
          setTimeout(() => {
              elevator.classList.remove('open');
          }, 2500);
        });

      } else if (!elevatorToMove && floorId === '1' ){
        elevatorId = elevatorsNotInFloor1.shift()
        console.log(elevatorId.id);
        const elevator = document.getElementById(`${elevatorId.id}`);
        elevator.classList.add('move');
        elevator.style.transform = `translateY(${0}px)`;
        elevator.classList.add('open');
        setTimeout(() => {
          elevator.classList.remove('open');
      }, 2000);
      }   
      else {
        elevatorToMove.state = 'moving';
        moveElevator(elevatorToMove, floorId);
        if (!elevatorsNotInFloor1.includes(elevatorToMove)) {
          elevatorsNotInFloor1.push(elevatorToMove);
      }
        console.log(elevatorsNotInFloor1);
      }
      
    })
  })
}


async function moveElevator(elevatorId, floorId) {
  const floorHeight = 130;
  const targetFloor = floorId - 1;
  const targetPosition = targetFloor * floorHeight;

  // Get references to elevator and first floor elements
  const elevator = document.getElementById(elevatorId.id);
  const firstFloor = document.getElementById('floor-1');

  // Move the elevator
  elevator.classList.add('move');
  elevator.style.transform = `translateY(${-targetPosition}px)`;

  // Wait for the animation to complete
  await new Promise((resolve) => setTimeout(resolve, 2500));

  // Open the doors
  elevator.classList.add('open');

  // Wait for the door animation
  await new Promise((resolve) => setTimeout(resolve, 2500));

  // Close the doors and update the state
  elevator.classList.remove('open');
  elevatorId.state = 'arrived';
}
