//------------------Render HTML with database information------------------
document.addEventListener('DOMContentLoaded', (e) => {
  console.log('DOM loaded! :rocket:');
  fetch(`/api/posts`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        console.log(`Success in grabbing posts: `, data);
        data.map(({ id, state, deed }) => {
          const tbody = document.getElementById('deedContainer');
          const trow = document.createElement('tr');
          const deedState = document.createElement('td');
          const deedDescription = document.createElement('td');
          const deedCompleted = document.createElement('td');
          const deedDiv = document.createElement('div');
          const labelOne = document.createElement('label');
          const labelTwo = document.createElement('label');
          const inputEl = document.createElement('input');
          inputEl.setAttribute('type', 'radio');
          inputEl.setAttribute('name', 'age');
          const iElOne = document.createElement('i');
          iElOne.setAttribute('class', 'fa fa-check');
          iElOne.setAttribute('aria-hidden', 'true');
          iElOne.setAttribute('id', `${id}`);
          const iElTwo = document.createElement('i');
          iElTwo.setAttribute('class', 'fa fa-times');
          iElTwo.setAttribute('aria-hidden', 'true');
          iElTwo.setAttribute('id', `${id}`);

          deedState.textContent = `${state}`;
          deedDescription.textContent = `${deed}`;

          trow.appendChild(deedState);
          trow.appendChild(deedDescription);
          trow.appendChild(deedCompleted);
          deedCompleted.appendChild(deedDiv);
          deedDiv.appendChild(labelOne);
          deedDiv.appendChild(labelTwo);
          labelOne.appendChild(inputEl);
          labelOne.appendChild(iElOne);
          labelTwo.appendChild(inputEl);
          labelTwo.appendChild(iElTwo);

          tbody.prepend(trow);

          labelOne.addEventListener('click', completeDeed);
        });
      };
    })
    .catch((error) => console.error('Error:', error));
});

//------------------Complete Deed------------------
const updateDeed = (deed) => {
  console.log('attempting to update with', deed);
  fetch('/api/posts', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(deed),
  }).then((response) => console.log(response));
};

const completeDeed = (e) => {
  e.preventDefault();
  console.log(e.target);
  console.log('I\'m being clicked!');
  console.log(e.target.id);
  console.log(e.target.parentNode.parentNode.parentNode.parentNode.children[0].innerText);
  console.log(e.target.parentNode.parentNode.parentNode.parentNode.children[1].innerText);

  const currentDeed = {
    id: e.target.id,
    state: e.target.parentNode.parentNode.parentNode.parentNode.children[0].innerText,
    deed: e.target.parentNode.parentNode.parentNode.parentNode.children[1].innerText,
    completed: false,
  };

  console.log(currentDeed);

  currentDeed.completed = !currentDeed.completed;

  console.log(currentDeed);

  updateDeed(currentDeed);
};

//------------------Submit new deed to database------------------
const deedBtn = document.getElementById('addDeed');

deedBtn.addEventListener('click', (e) => {
  e.preventDefault();
  console.log('It is being clicked!...index.js:5');
  console.log(document.getElementById('deed').value, '...index.js:6');
  console.log(document.getElementById('state').value, '...index.js:7');

  const newDeed = {
    state: document.getElementById('state').value,
    deed: document.getElementById('deed').value,
    completed: false,
  };

  console.log(newDeed, '...index.js:15');
  console.log(JSON.stringify(newDeed), '...index.js:16');

  fetch('/api/posts', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newDeed),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('Success in submitting post:', data);
      window.location.href = '/';
    })
    .catch((error) => {
      console.error('Error:', error);
    });
});

//----------------------Makes the chart that updates on it's own-----------------------
document.addEventListener('DOMContentLoaded', (e) => {
  console.log('it loaded at least');
  fetch(`/graph`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        const chart = document.getElementById('bar-chart');

        const countChart = [data.count]
        console.log(countChart)
        
        chart.textContent = new Chart(document.getElementById("bar-chart"), {
          type: 'bar',
          data: {
            labels: ["Total Completed"],
            datasets: [
              {
                label: "Deeds Done",
                backgroundColor: [ "#FF00DD"],
                data: countChart
              }
            ]
          }
        })
      }
    })
});

//-----------------Makes the chart that we have to manually update-----------------------

// document.addEventListener('DOMContentLoaded', (e) => {


//   const chart = document.getElementById('bar-chart');
//   const numberOfDeeds = [4, 3, 2, 1, 0]

//   chart.textContent = new Chart(document.getElementById("bar-chart"), {
//     type: 'bar',
//     data: {
//       labels: ["TX", "NM", "CA", "OR", "WA"],
//       datasets: [
//         {
//           label: "Deeds Done",
//           backgroundColor: ["#00FFF1", "#FFC400", "#9600FF", "#FF00DD", "#FFFFFFF"],
//           data: numberOfDeeds
//         }
//       ]
//     },
//     options: {
//       legend: { display: false },
//       title: {
//         display: true,
//         text: 'Deeds Completed'
//       }
//     }
//   })
// });

