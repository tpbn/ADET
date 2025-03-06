document.addEventListener("DOMContentLoaded", function () {
    let subjects = [];

    // get the courses from json file
    fetch('courses.json')
        .then(response => response.json())
        .then(data => {
            subjects = data.subjects;
            displaySubjects(subjects);
        })
        .catch(error => console.error('Error fetching JSON:', error));

    // display the courses
    function displaySubjects(subjectsArray) {
        const subjectList = document.getElementById('subjectList');
        subjectList.innerHTML = "";
        subjectsArray.forEach(subject => {
            let li = document.createElement('li');
            li.textContent = subject;
            subjectList.appendChild(li);
        });
    }

    // filter coursese
    window.filterSubjects = function () {
        const searchText = document.getElementById('searchBox').value.toLowerCase();
        const filteredSubjects = subjects.filter(subject => subject.toLowerCase().includes(searchText));
        displaySubjects(filteredSubjects);
    };
});
