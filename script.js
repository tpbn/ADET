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
            subjects = data.courses; // Ensure it uses "courses" instead of "subjects"
            displaySubjects(subjects);
        })
        .catch(error => console.error('Error fetching JSON:', error));

    // Display the courses
    function displaySubjects(subjectsArray) {
        const subjectList = document.getElementById('subjectList');
        subjectList.innerHTML = ""; // Clear previous data
        subjectsArray.forEach(subject => {
            let li = document.createElement('li');
            li.textContent = `${subject.code}: ${subject.description} (${subject.credit} credits)`;
            subjectList.appendChild(li);
        });
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
