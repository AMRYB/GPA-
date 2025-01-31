function addCourse() {
    let container = document.getElementById("courses");
    let div = document.createElement("div");
    div.classList.add("course");
    div.innerHTML = `
        <input type="number" placeholder="Credit Hours" class="hours" min="1">
        <input type="text" placeholder="Grade (A+, B, etc.)" class="grade">
        <button class="remove-btn" onclick="removeCourse(this)">X</button>
    `;
    container.appendChild(div);
}

function removeCourse(button) {
    button.parentElement.remove();
}

function getGpaPoints(grade) {
    const gpaScale = {
        "A+": 4.0, "A": 3.7, "A-": 3.4,
        "B+": 3.2, "B": 3.0, "B-": 2.8,
        "C+": 2.6, "C": 2.4, "C-": 2.2,
        "D+": 2.0, "D": 1.5, "D-": 1.0,
        "F": 0.0
    };
    return gpaScale[grade] || null;
}

function calculateGPA() {
    let courses = document.querySelectorAll(".course");
    let totalPoints = 0;
    let totalHours = 0;
    let errorMessage = document.getElementById("result");
    
    if (courses.length === 0) {
        errorMessage.innerText = "Please add at least one course.";
        return;
    }

    courses.forEach(course => {
        let hours = parseInt(course.querySelector(".hours").value);
        let grade = course.querySelector(".grade").value.trim().toUpperCase();

        if (!hours || !grade) {
            errorMessage.innerText = "Please fill all fields correctly.";
            return;
        }

        let points = getGpaPoints(grade);
        if (points === null) {
            errorMessage.innerText = "Invalid grade entered.";
            return;
        }

        totalPoints += points * hours;
        totalHours += hours;
    });

    let gpa = totalHours > 0 ? (totalPoints / totalHours).toFixed(2) : 0.0;
    errorMessage.innerText = "Your GPA: " + gpa;
}
