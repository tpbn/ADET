document.addEventListener("DOMContentLoaded", function () {
    let subjects = [];

    // Get the subject list and search box elements
    const subjectList = document.getElementById('subjectList');
    const searchBox = document.getElementById('searchBox');

    // Initially hide the subject list
    subjectList.style.display = 'none';

    // Fetch courses from JSON file
    fetch('./courses.json')
        .then(response => response.json())
        .then(data => {
            subjects = data.subjects || []; // Ensure subjects exist
        })
        .catch(error => console.error('Error fetching JSON:', error));

    // Function to display subjects based on search
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

        subjectList.style.display = 'block'; // Show list when results exist
    }

    // Filter subjects when typing in the search box
    window.filterSubjects = function () {
        const searchText = searchBox.value.toLowerCase().trim();

        if (searchText === "") {
            subjectList.style.display = 'none'; // Hide if input is empty
            return;
        }

        const filteredSubjects = subjects.filter(subject =>
            subject.toLowerCase().includes(searchText)
        );

        displaySubjects(filteredSubjects);
    };

    // Hide the list if the search box is cleared
    searchBox.addEventListener('input', function () {
        if (searchBox.value.trim() === "") {
            subjectList.style.display = 'none';
        }
    });
});
