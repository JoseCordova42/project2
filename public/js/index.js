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