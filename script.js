document.addEventListener("DOMContentLoaded", function () {
    let subjects = [];

    // Get the list element
    const subjectList = document.getElementById('subjectList');

    // Hide the list initially
    subjectList.style.display = 'none';

    // Fetch courses from JSON file
    fetch('./courses.json')
        .then(response => response.json())
        .then(data => {
            subjects = data.subjects; // Assuming "subjects" is the key in the JSON file
        })
        .catch(error => console.error('Error fetching JSON:', error));

    // Display the courses
    function displaySubjects(subjectsArray) {
        subjectList.innerHTML = ""; // Clear previous results

        if (subjectsArray.length === 0) {
            subjectList.style.display = 'none'; // Hide the list if no matches
            return;
        }

        subjectsArray.forEach(subject => {
            let li = document.createElement('li');
            li.textContent = subject;
            subjectList.appendChild(li);
        });

        subjectList.style.display = 'block'; // Show the list when there are results
    }

    // Filter subjects
    window.filterSubjects = function () {
        const searchText = document.getElementById('searchBox').value.toLowerCase().trim();

        if (searchText === "") {
            subjectList.style.display = 'none'; // Hide the list if input is empty
            return;
        }

        const filteredSubjects = subjects.filter(subject => 
            subject.toLowerCase().includes(searchText)
        );

        displaySubjects(filteredSubjects);
    };
});
