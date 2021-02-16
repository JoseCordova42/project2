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
          data.map(({ state, deed }) => {
            const tbody = document.getElementById('deedContainer');
            const trow = document.createElement('tr');
            const deedState = document.createElement('td');
            const deedDescription = document.createElement('td');
            const deedCompleted = document.createElement('td');
            const deedDiv = document.createElement('div');
            const labelOne = document.createElement('label');
            const labelTwo = document.createElement('label');
            const inputEl = document.createElement('input');
            inputEl.setAttribute('type', 'radio')
            inputEl.setAttribute('name', 'age')
            const iElOne = document.createElement('i');
            iElOne.setAttribute('class', 'fa fa-check');
            iElOne.setAttribute('aria-hidden', 'true');
            const iElTwo = document.createElement('i');
            iElTwo.setAttribute('class', 'fa fa-times');
            iElTwo.setAttribute('aria-hidden', 'true');

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
          });
        };
      })
      .catch((error) => console.error('Error:', error));
  });

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