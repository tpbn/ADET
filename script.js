document.addEventListener("DOMContentLoaded", function () {
    let subjects = [];

    // Fetch courses from GitHub JSON file
    fetch('https://raw.githubusercontent.com/tpbn/ADET/main/courses.json')
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok " + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            subjects = data.courses;
            document.getElementById('subjectList').style.display = 'none'; // Hide list if not used
        })
        .catch(error => console.error('Error fetching JSON:', error));

    // Display the courses
    function displaySubjects(subjectsArray) {
        const subjectList = document.getElementById('subjectList');
        subjectList.innerHTML = ""; // Clear previous data

        if (subjectsArray.length === 0) {
            subjectList.style.display = 'none'; // Hide list if no results
            return;
        }

        subjectsArray.forEach(subject => {
            let li = document.createElement('li');
            li.textContent = `${subject.code}: ${subject.description} (${subject.credit} credits)`;
            subjectList.appendChild(li);
        });

        subjectList.style.display = 'block'; // Show list only when inly searched
    }

    // Filter courses
    window.filterSubjects = function () {
        const searchText = document.getElementById('searchBox').value.toLowerCase();
        const filteredSubjects = subjects.filter(subject => 
            subject.code.toLowerCase().includes(searchText) || 
            subject.description.toLowerCase().includes(searchText)
        );
        displaySubjects(filteredSubjects);
    };
});
