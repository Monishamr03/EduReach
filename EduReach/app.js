const app = document.getElementById("app");

let quizCourse = null;
let quizQuestion = 0;
let quizAnswers = [];


// -----------------------------
// LOCAL STORAGE
// -----------------------------

function getProgress() {

    return JSON.parse(
        localStorage.getItem("edureachProgress") || "{}"
    );

}

function saveProgress(data) {

    localStorage.setItem(
        "edureachProgress",
        JSON.stringify(data)
    );

}

function getCompletedLessons(courseId) {

    const progress = getProgress();

    return progress[courseId]?.lessons || [];

}

function completeLesson(courseId, lessonId) {

    const progress = getProgress();

    if (!progress[courseId]) {

        progress[courseId] = {
            lessons: [],
            quiz: null
        };

    }

    if (!progress[courseId].lessons.includes(lessonId)) {

        progress[courseId].lessons.push(lessonId);

    }

    saveProgress(progress);

}


// -----------------------------
// FIND COURSE
// -----------------------------

function getCourse(id) {

    return EDU_DATA.courses.find(
        course => course.id === id
    );

}


// -----------------------------
// LAYOUT
// -----------------------------

function layout(content, activePage = "") {

    return `

        <div class="sidebar">

            <div class="logo">

                <div class="logo-box">
                    E
                </div>

                <div class="logo-text">
                    EduReach
                </div>

            </div>


            <a href="#dashboard"
                class="${activePage === "dashboard" ? "active" : ""}">
                🏠 Dashboard
            </a>

            <a href="#courses"
                class="${activePage === "courses" ? "active" : ""}">
                📚 Courses
            </a>

            <a href="#progress"
                class="${activePage === "progress" ? "active" : ""}">
                📊 Progress
            </a>

            <a href="#profile"
                class="${activePage === "profile" ? "active" : ""}">
                👤 Profile
            </a>

        </div>


        <div class="main">

            <div class="topbar">

                <div class="student-name">
                    EduReach Student Portal
                </div>

                <div class="avatar">
                    ${EDU_DATA.student.name.charAt(0)}
                </div>

            </div>


            <div class="content">

                ${content}

            </div>

        </div>
    `;
}


// -----------------------------
// HOME
// -----------------------------

function showHome() {

    app.innerHTML = `

        <div class="login-page">

            <div class="login-card">

                <div class="logo">

                    <div class="logo-box">
                        E
                    </div>

                    <div class="logo-text">
                        EduReach
                    </div>

                </div>


                <h1>
                    Learn Without Limits
                </h1>

                <p>
                    Offline-first STEM learning platform
                    for students.
                </p>


                <a
                    href="#login"
                    class="btn btn-primary"
                    style="width:100%;margin-top:25px;text-align:center"
                >
                    Student Login
                </a>


                <a
                    href="#courses"
                    class="btn btn-outline"
                    style="width:100%;margin-top:10px;text-align:center"
                >
                    Explore Courses
                </a>

            </div>

        </div>

    `;
}


// -----------------------------
// LOGIN
// -----------------------------

function showLogin() {

    app.innerHTML = `

        <div class="login-page">

            <div class="login-card">

                <div class="logo">

                    <div class="logo-box">
                        E
                    </div>

                    <div class="logo-text">
                        EduReach
                    </div>

                </div>


                <h1>
                    Welcome Back
                </h1>

                <p>
                    Login to continue learning.
                </p>


                <form id="loginForm">

                    <label>
                        Student ID
                    </label>

                    <input
                        type="text"
                        placeholder="Enter Student ID"
                        required
                    >


                    <label>
                        Password
                    </label>

                    <input
                        type="password"
                        placeholder="Enter Password"
                        required
                    >


                    <button
                        class="btn btn-primary"
                    >
                        Login
                    </button>

                </form>

            </div>

        </div>

    `;


    document
        .getElementById("loginForm")
        .addEventListener("submit", function(event) {

            event.preventDefault();

            location.hash = "#dashboard";

        });

}


// -----------------------------
// DASHBOARD
// -----------------------------

function showDashboard() {

    let totalLessons = 0;

    let completed = 0;


    EDU_DATA.courses.forEach(course => {

        course.modules.forEach(module => {

            totalLessons += module.lessons.length;

        });

        completed +=
            getCompletedLessons(course.id).length;

    });


    const percentage =
        totalLessons === 0
            ? 0
            : Math.round(
                completed / totalLessons * 100
            );


    app.innerHTML = layout(`

        <div class="page-title">

            <h1>
                Hello, ${EDU_DATA.student.name} 👋
            </h1>

            <p>
                Continue your learning journey.
            </p>

        </div>


        <div class="stats">

            <div class="stat-card">

                📚

                <h2>
                    ${EDU_DATA.courses.length}
                </h2>

                <p>
                    Courses
                </p>

            </div>


            <div class="stat-card">

                ✓

                <h2>
                    ${completed}
                </h2>

                <p>
                    Lessons Completed
                </p>

            </div>


            <div class="stat-card">

                📝

                <h2>
                    ${EDU_DATA.courses.length}
                </h2>

                <p>
                    Quizzes
                </p>

            </div>


            <div class="stat-card">

                📊

                <h2>
                    ${percentage}%
                </h2>

                <p>
                    Overall Progress
                </p>

            </div>

        </div>


        <div class="page-title">

            <h2>
                Continue Learning
            </h2>

        </div>


        <div class="course-grid">

            ${EDU_DATA.courses
                .map(createCourseCard)
                .join("")}

        </div>

    `, "dashboard");

}


// -----------------------------
// COURSE CARD
// -----------------------------

function createCourseCard(course) {

    let total = 0;

    course.modules.forEach(module => {

        total += module.lessons.length;

    });


    const completed =
        getCompletedLessons(course.id).length;


    const percentage =
        Math.round(completed / total * 100);


    return `

        <div
            class="course-card"
            onclick="location.hash='#course/${course.id}'"
        >

            <div class="course-icon">
                ${course.icon}
            </div>


            <span class="tag">
                ${course.category}
            </span>


            <h3>
                ${course.title}
            </h3>


            <p>
                ${course.description}
            </p>


            <div class="progress">

                <div
                    class="progress-bar"
                    style="width:${percentage}%"
                ></div>

            </div>


            <small>
                ${percentage}% completed
            </small>

        </div>

    `;

}


// -----------------------------
// COURSES
// -----------------------------

function showCourses() {

    app.innerHTML = layout(`

        <div class="page-title">

            <h1>
                Courses
            </h1>

            <p>
                Explore available STEM learning courses.
            </p>

        </div>


        <div class="course-grid">

            ${EDU_DATA.courses
                .map(createCourseCard)
                .join("")}

        </div>

    `, "courses");

}


// -----------------------------
// COURSE DETAILS
// -----------------------------

function showCourseDetails(courseId) {

    const course =
        getCourse(courseId);


    if (!course) {

        location.hash = "#courses";

        return;

    }


    app.innerHTML = layout(`

        <a
            href="#courses"
            class="btn btn-outline"
            style="margin-bottom:20px"
        >
            ← Back
        </a>


        <div class="course-banner">

            <div class="course-banner-icon">

                ${course.icon}

            </div>


            <div>

                <span class="tag">
                    ${course.category}
                </span>


                <h1>
                    ${course.title}
                </h1>


                <p>
                    ${course.description}
                </p>

            </div>

        </div>


        <div class="page-title">

            <h2>
                Course Modules
            </h2>

        </div>


        ${course.modules.map(

            (module, index) => `

                <div class="module">

                    <h3>
                        Module ${index + 1} :
                        ${module.title}
                    </h3>


                    ${module.lessons.map(

                        lesson => `

                            <div
                                class="lesson"
                                onclick="
                                location.hash='#lesson/${course.id}/${lesson.id}'
                                "
                            >

                                <div class="lesson-title">

                                    <span>
                                        ▶
                                    </span>

                                    <div>

                                        <b>
                                            ${lesson.title}
                                        </b>

                                        <small>
                                            ${lesson.duration}
                                        </small>

                                    </div>

                                </div>


                                <span>
                                    →
                                </span>

                            </div>

                        `

                    ).join("")}

                </div>

            `

        ).join("")}

    `, "courses");

}


// -----------------------------
// LESSON
// -----------------------------

function showLesson(courseId, lessonId) {

    const course =
        getCourse(courseId);


    let lesson = null;


    course.modules.forEach(module => {

        module.lessons.forEach(item => {

            if (item.id === lessonId) {

                lesson = item;

            }

        });

    });


    if (!lesson) {

        location.hash =
            `#course/${courseId}`;

        return;

    }


    const completed =
        getCompletedLessons(courseId)
            .includes(lessonId);


    app.innerHTML = layout(`

        <a
            href="#course/${courseId}"
            class="btn btn-outline"
        >
            ← Back to Course
        </a>


        <div class="page-title"
             style="margin-top:25px">

            <span class="tag">
                ${lesson.type}
            </span>

            <h1>
                ${lesson.title}
            </h1>

            <p>
                ${lesson.duration}
            </p>

        </div>


        <div class="video-box">

            <div class="play-button">
                ▶
            </div>

            <h3>
                Lesson Video
            </h3>

            <p>
                Your offline video will appear here.
            </p>

        </div>


        <div class="lesson-content">

            <h2>
                Lesson Content
            </h2>

            <br>

            <p>
                ${lesson.content}
            </p>

        </div>


        <button
            class="btn btn-primary"
            onclick="
                completeLesson('${courseId}','${lessonId}');
                showLesson('${courseId}','${lessonId}');
            "
        >

            ${completed
                ? "✓ Lesson Completed"
                : "Mark Lesson Complete"}

        </button>


        <a
            href="#quiz/${courseId}"
            class="btn btn-outline"
            style="margin-left:10px"
        >
            Take Quiz →
        </a>

    `, "courses");

}


// -----------------------------
// QUIZ
// -----------------------------

function showQuiz(courseId) {

    const questions =
        EDU_DATA.quizzes[courseId];


    if (!questions) {

        location.hash =
            `#course/${courseId}`;

        return;

    }


    if (quizCourse !== courseId) {

        quizCourse = courseId;

        quizQuestion = 0;

        quizAnswers =
            new Array(questions.length).fill(null);

    }


    const question =
        questions[quizQuestion];


    app.innerHTML = layout(`

        <div class="quiz-container">

            <a
                href="#course/${courseId}"
                class="btn btn-outline"
            >
                ← Back
            </a>


            <div class="quiz-card">

                <p>
                    Question
                    ${quizQuestion + 1}
                    /
                    ${questions.length}
                </p>


                <div class="question">

                    ${question.question}

                </div>


                ${question.options.map(

                    (option, index) => `

                        <button
                            class="option
                            ${
                                quizAnswers[quizQuestion]
                                === index
                                ? "selected"
                                : ""
                            }"
                            onclick="
                            selectAnswer(${index})
                            "
                        >

                            ${String.fromCharCode(65 + index)}.

                            ${option}

                        </button>

                    `

                ).join("")}


                <br>


                <button
                    class="btn btn-primary"
                    onclick="
                    nextQuestion('${courseId}')
                    "
                >

                    ${
                        quizQuestion ===
                        questions.length - 1
                        ? "Submit Quiz"
                        : "Next →"
                    }

                </button>

            </div>

        </div>

    `);

}


function selectAnswer(index) {

    quizAnswers[quizQuestion] =
        index;

    showQuiz(quizCourse);

}


function nextQuestion(courseId) {

    if (
        quizAnswers[quizQuestion] === null
    ) {

        alert("Please select an answer.");

        return;

    }


    const questions =
        EDU_DATA.quizzes[courseId];


    if (
        quizQuestion <
        questions.length - 1
    ) {

        quizQuestion++;

        showQuiz(courseId);

        return;

    }


    let score = 0;


    questions.forEach(
        (question, index) => {

            if (
                quizAnswers[index]
                === question.answer
            ) {

                score++;

            }

        }
    );


    localStorage.setItem(
        "lastQuizScore",
        JSON.stringify({
            courseId: courseId,
            score: score,
            total: questions.length
        })
    );


    location.hash =
        "#result";

}


// -----------------------------
// RESULT
// -----------------------------

function showResult() {

    const result =
        JSON.parse(
            localStorage.getItem(
                "lastQuizScore"
            )
        );


    if (!result) {

        location.hash =
            "#dashboard";

        return;

    }


    const percentage =
        Math.round(
            result.score /
            result.total *
            100
        );


    app.innerHTML = layout(`

        <div class="result">

            <h2>
                🎉 Quiz Completed
            </h2>


            <div class="result-score">

                ${percentage}%

            </div>


            <p>

                You scored
                ${result.score}
                out of
                ${result.total}

            </p>


            <br>


            <a
                href="#progress"
                class="btn btn-primary"
            >
                View Progress
            </a>


            <a
                href="#dashboard"
                class="btn btn-outline"
            >
                Dashboard
            </a>

        </div>

    `);

}


// -----------------------------
// PROGRESS
// -----------------------------

function showProgress() {

    app.innerHTML = layout(`

        <div class="page-title">

            <h1>
                My Progress
            </h1>

            <p>
                Track your learning progress.
            </p>

        </div>


        <div class="course-grid">

            ${EDU_DATA.courses.map(course => {

                let total = 0;


                course.modules.forEach(
                    module => {

                        total +=
                            module.lessons.length;

                    }
                );


                const completed =
                    getCompletedLessons(
                        course.id
                    ).length;


                const percentage =
                    Math.round(
                        completed /
                        total *
                        100
                    );


                return `

                    <div class="course-card">

                        <div class="course-icon">

                            ${course.icon}

                        </div>


                        <h3>
                            ${course.title}
                        </h3>


                        <div class="progress">

                            <div
                                class="progress-bar"
                                style="
                                width:${percentage}%
                                "
                            ></div>

                        </div>


                        <br>

                        <p>

                            ${completed}
                            /
                            ${total}
                            lessons completed

                        </p>


                        <b>
                            ${percentage}%
                        </b>

                    </div>

                `;

            }).join("")}

        </div>

    `, "progress");

}


// -----------------------------
// PROFILE
// -----------------------------

function showProfile() {

    const student =
        EDU_DATA.student;


    app.innerHTML = layout(`

        <div class="page-title">

            <h1>
                My Profile
            </h1>

            <p>
                Student information
            </p>

        </div>


        <div class="profile-card">

            <div class="profile-avatar">

                ${student.name.charAt(0)}

            </div>


            <div>

                <h2>
                    ${student.name}
                </h2>

                <p>
                    ${student.course}
                </p>

            </div>

        </div>


        <div class="profile-details">

            <div class="detail-box">

                <small>
                    Student ID
                </small>

                <b>
                    ${student.studentId}
                </b>

            </div>


            <div class="detail-box">

                <small>
                    Student Name
                </small>

                <b>
                    ${student.name}
                </b>

            </div>


            <div class="detail-box">

                <small>
                    Course
                </small>

                <b>
                    ${student.course}
                </b>

            </div>


            <div class="detail-box">

                <small>
                    Institution
                </small>

                <b>
                    ${student.institution}
                </b>

            </div>


            <div class="detail-box">

                <small>
                    Email
                </small>

                <b>
                    ${student.email}
                </b>

            </div>


            <div class="detail-box">

                <small>
                    Learning Mode
                </small>

                <b>
                    Offline First
                </b>

            </div>

        </div>

    `, "profile");

}


// -----------------------------
// ROUTING
// -----------------------------

function router() {

    const hash =
        location.hash.substring(1)
        || "home";


    const parts =
        hash.split("/");


    if (parts[0] === "home") {

        showHome();

    }

    else if (parts[0] === "login") {

        showLogin();

    }

    else if (parts[0] === "dashboard") {

        showDashboard();

    }

    else if (parts[0] === "courses") {

        showCourses();

    }

    else if (
        parts[0] === "course"
        && parts[1]
    ) {

        showCourseDetails(
            parts[1]
        );

    }

    else if (
        parts[0] === "lesson"
        && parts[1]
        && parts[2]
    ) {

        showLesson(
            parts[1],
            parts[2]
        );

    }

    else if (
        parts[0] === "quiz"
        && parts[1]
    ) {

        showQuiz(
            parts[1]
        );

    }

    else if (
        parts[0] === "result"
    ) {

        showResult();

    }

    else if (
        parts[0] === "progress"
    ) {

        showProgress();

    }

    else if (
        parts[0] === "profile"
    ) {

        showProfile();

    }

    else {

        showHome();

    }

}


window.addEventListener(
    "hashchange",
    router
);

window.addEventListener(
    "load",
    router
);