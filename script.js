document.addEventListener("DOMContentLoaded", function () {
    let subjects = [];

    // Fetch courses from GitHub JSON file
    fetch('https://raw.githubusercontent.com/tpbn/ADET/main/courses.json')
        .then(response => response.json())
        .then(data => {
            subjects = data.courses.map(course => `${course.code}: ${course.description} (${course.credit} credits)`);
            displaySubjects([]); // Start with an empty list
        })
        .catch(error => console.error('Error fetching JSON:', error));

    // Display subjects (hidden by default)
    function displaySubjects(subjectsArray) {
        const subjectList = document.getElementById('subjectList');
        subjectList.innerHTML = "";

        if (subjectsArray.length === 0) {
            subjectList.style.display = "none"; // Hide list if empty
        } else {
            subjectList.style.display = "block"; // Show list if there are results
            subjectsArray.forEach(subject => {
                let li = document.createElement('li');
                li.textContent = subject;
                subjectList.appendChild(li);
            });
        }
    }

    // Filter subjects on search
    window.filterSubjects = function () {
        const searchText = document.getElementById('searchBox').value.toLowerCase();
        const filteredSubjects = subjects.filter(subject => subject.toLowerCase().includes(searchText));
        displaySubjects(filteredSubjects);
    };
});
