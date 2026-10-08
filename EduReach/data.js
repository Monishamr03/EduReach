const EDU_DATA = {

    student: {
        name: "Ananya",
        studentId: "STU001",
        course: "Computer Science Engineering",
        institution: "EduReach College",
        email: "ananya@example.com"
    },

    courses: [

        {
            id: "programming",

            title: "Programming Fundamentals",

            category: "Computer Science",

            level: "Beginner",

            duration: "4 Hours",

            icon: "💻",

            description:
                "Learn programming basics, variables, conditions and loops.",

            modules: [

                {
                    id: "module1",

                    title: "Programming Basics",

                    lessons: [

                        {
                            id: "lesson1",

                            title: "Introduction to Programming",

                            duration: "12 min",

                            type: "Video",

                            content:
                                "Programming is the process of creating instructions that tell a computer what to do."
                        },

                        {
                            id: "lesson2",

                            title: "Variables and Data Types",

                            duration: "15 min",

                            type: "Video",

                            content:
                                "Variables are used to store information inside a program."
                        }

                    ]
                },

                {
                    id: "module2",

                    title: "Control Flow",

                    lessons: [

                        {
                            id: "lesson3",

                            title: "Conditional Statements",

                            duration: "14 min",

                            type: "Video",

                            content:
                                "Conditional statements allow a program to make decisions."
                        },

                        {
                            id: "lesson4",

                            title: "Loops",

                            duration: "16 min",

                            type: "Video",

                            content:
                                "Loops are used when we need to repeat a set of instructions."
                        }

                    ]
                }
            ]
        },

        {
            id: "physics",

            title: "Basic Physics",

            category: "Science",

            level: "Beginner",

            duration: "3 Hours",

            icon: "⚛️",

            description:
                "Learn basic concepts of motion, force and energy.",

            modules: [

                {
                    id: "module1",

                    title: "Motion",

                    lessons: [

                        {
                            id: "lesson1",

                            title: "Introduction to Motion",

                            duration: "10 min",

                            type: "Video",

                            content:
                                "Motion is the change in position of an object with respect to time."
                        },

                        {
                            id: "lesson2",

                            title: "Speed and Velocity",

                            duration: "13 min",

                            type: "Video",

                            content:
                                "Speed tells us how fast an object moves."
                        }

                    ]
                },

                {
                    id: "module2",

                    title: "Force and Energy",

                    lessons: [

                        {
                            id: "lesson3",

                            title: "Introduction to Force",

                            duration: "12 min",

                            type: "Video",

                            content:
                                "Force is a push or pull that can change the motion of an object."
                        }

                    ]
                }
            ]
        },

        {
            id: "mathematics",

            title: "Applied Mathematics",

            category: "Mathematics",

            level: "Beginner",

            duration: "3.5 Hours",

            icon: "📐",

            description:
                "Learn practical mathematics concepts used in technical education.",

            modules: [

                {
                    id: "module1",

                    title: "Algebra",

                    lessons: [

                        {
                            id: "lesson1",

                            title: "Variables and Expressions",

                            duration: "15 min",

                            type: "Video",

                            content:
                                "Variables are symbols used to represent unknown values."
                        },

                        {
                            id: "lesson2",

                            title: "Linear Equations",

                            duration: "17 min",

                            type: "Video",

                            content:
                                "Linear equations can be solved using simple mathematical operations."
                        }

                    ]
                }
            ]
        }
    ],

    quizzes: {

        programming: [

            {
                question: "What is used to store a value in a program?",

                options: [
                    "Variable",
                    "Monitor",
                    "Keyboard",
                    "Printer"
                ],

                answer: 0
            },

            {
                question: "Which structure is used to repeat instructions?",

                options: [
                    "Loop",
                    "Folder",
                    "Image",
                    "Comment"
                ],

                answer: 0
            },

            {
                question: "Which statement is used for decision making?",

                options: [
                    "if-else",
                    "JPEG",
                    "USB",
                    "HTML"
                ],

                answer: 0
            }
        ],

        physics: [

            {
                question: "Which quantity tells us how fast an object moves?",

                options: [
                    "Speed",
                    "Mass",
                    "Volume",
                    "Temperature"
                ],

                answer: 0
            },

            {
                question: "What is the SI unit of force?",

                options: [
                    "Newton",
                    "Joule",
                    "Watt",
                    "Metre"
                ],

                answer: 0
            }
        ],

        mathematics: [

            {
                question: "What is 5 + 7?",

                options: [
                    "10",
                    "11",
                    "12",
                    "13"
                ],

                answer: 2
            }

        ]
    }
};