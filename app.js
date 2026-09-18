// ==========================================
// 1. DATASET SETUP
// ==========================================
const students = [
  { id: 1, name: "Alice Smith", year: 1, course: "BSCS", grades: [85, 90, 88], enrolled: true },
  { id: 2, name: "Bob Johnson", year: 2, course: "BSIT", grades: [78, 82, 80], enrolled: true },
  { id: 3, name: "Charlie Brown", year: 3, course: "BSCS", grades: [92, 95, 94], enrolled: true },
  { id: 4, name: "Diana Prince", year: 1, course: "BSIS", grades: [88, 86, 90], enrolled: false },
  { id: 5, name: "Ethan Hunt", year: 4, course: "BSIT", grades: [70, 75, 72], enrolled: true },
  { id: 6, name: "Fiona Gallagher", year: 2, course: "BSCS", grades: [98, 96, 100], enrolled: true },
  { id: 7, name: "George Clark", year: 3, course: "BSIS", grades: [60, 65, 70], enrolled: false },
  { id: 8, name: "Hannah Abbott", year: 1, course: "BSIT", grades: [89, 91, 87], enrolled: true },
  { id: 9, name: "Ian Malcolm", year: 4, course: "BSCS", grades: [91, 89, 93], enrolled: true },
  { id: 10, name: "Julia Roberts", year: 2, course: "BSIS", grades: [82, 85, 88], enrolled: true },
  { id: 11, name: "Kevin Bacon", year: 3, course: "BSIT", grades: [76, 74, 78], enrolled: false },
  { id: 12, name: "Laura Croft", year: 1, course: "BSCS", grades: [95, 92, 97], enrolled: true },
  { id: 13, name: "Michael Scott", year: 4, course: "BSIS", grades: [], enrolled: true }, // Edge case: no grades
  { id: 14, name: "Nina Williams", year: 2, course: "BSIT", grades: [83, 87, 85], enrolled: true },
  { id: 15, name: "Oscar Martinez", year: 3, course: "BSCS", grades: [90, 91, 89], enrolled: true },
  { id: 16, name: "Pam Beesly", year: 1, course: "BSIS", grades: [79, 81, 83], enrolled: false },
  { id: 17, name: "Quinn Fabray", year: 4, course: "BSIT", grades: [88, 90, 89], enrolled: true },
  { id: 18, name: "Rachel Green", year: 2, course: "BSCS", grades: [84, 82, 86], enrolled: true },
  { id: 19, name: "Steve Rogers", year: 3, course: "BSIS", grades: [93, 97, 95], enrolled: true },
  { id: 20, name: "Tony Stark", year: 1, course: "BSIT", grades: [100, 99, 98], enrolled: true },
  { id: 21, name: "Uma Thurman", year: 4, course: "BSCS", grades: [77, 80, 79], enrolled: false },
  { id: 22, name: "Victor Stone", year: 2, course: "BSIS", grades: [89, 92, 90], enrolled: true },
  { id: 23, name: "Wanda Maximoff", year: 3, course: "BSIT", grades: [94, 96, 98], enrolled: true },
  { id: 24, name: "Xavier Charles", year: 1, course: "BSCS", grades: [91, 93, 92], enrolled: true },
  { id: 25, name: "Yara Greyjoy", year: 4, course: "BSIS", grades: [68, 72, 70], enrolled: false },
  { id: 26, name: "Zack Morris", year: 2, course: "BSIT", grades: [85, 80, 88], enrolled: true },
  { id: 27, name: "Arthur Dent", year: 3, course: "BSCS", grades: [42, 42, 42], enrolled: true },
  { id: 28, name: "Bruce Wayne", year: 1, course: "BSIS", grades: [96, 94, 98], enrolled: true },
  { id: 29, name: "Clark Kent", year: 4, course: "BSIT", grades: [90, 92, 91], enrolled: true },
  { id: 30, name: "Diana Ross", year: 2, course: "BSCS", grades: [87, 89, 88], enrolled: false }
];

// ==========================================
// 2. CORE FUNCTIONS
// ==========================================

// 1. Calculate student average grade
function getAverageGrade(student) {
  if (!student || !Array.isArray(student.grades) || student.grades.length === 0) {
    return 0; // Graceful handling for missing/empty grades
  }
  const sum = student.grades.reduce((acc, curr) => acc + curr, 0);
  return Number((sum / student.grades.length).toFixed(2));
}

// 2. Get top N students by average grade
function getTopStudents(studentsArray, n) {
  if (!Array.isArray(studentsArray)) return [];
  if (n < 0 || typeof n !== "number") {
    throw new Error("Input Validation Error: 'n' must be a non-negative number.");
  }

  return [...studentsArray] // Pure function: creating copy to prevent direct mutation
    .map(s => ({ ...s, averageGrade: getAverageGrade(s) }))
    .sort((a, b) => b.averageGrade - a.averageGrade)
    .slice(0, n);
}

// 3. Group students by course
function groupByCourse(studentsArray) {
  if (!Array.isArray(studentsArray)) return {};
  
  return studentsArray.reduce((acc, student) => {
    const course = student.course || "Unassigned";
    if (!acc[course]) {
      acc[course] = [];
    }
    acc[course].push({ ...student });
    return acc;
  }, {});
}

// 4. Count enrolled vs non-enrolled students
function getEnrolledCount(studentsArray) {
  if (!Array.isArray(studentsArray)) return { enrolled: 0, notEnrolled: 0 };

  return studentsArray.reduce(
    (acc, student) => {
      if (student.enrolled) {
        acc.enrolled += 1;
      } else {
        acc.notEnrolled += 1;
      }
      return acc;
    },
    { enrolled: 0, notEnrolled: 0 }
  );
}

// 5. Case-insensitive search by name
function findStudent(studentsArray, name) {
  if (!Array.isArray(studentsArray) || typeof name !== "string") return null;

  const targetName = name.trim().toLowerCase();
  const match = studentsArray.find(s => s.name.toLowerCase() === targetName);
  
  return match ? { ...match } : null; // Returns null if not found
}

// 6. Get average grade per course sorted high-to-low
function getCourseAverages(studentsArray) {
  if (!Array.isArray(studentsArray) || studentsArray.length === 0) return [];

  const grouped = groupByCourse(studentsArray);

  const courseAverages = Object.keys(grouped).map(course => {
    const courseStudents = grouped[course];
    const totalAvg = courseStudents.reduce((sum, student) => sum + getAverageGrade(student), 0);
    const avg = Number((totalAvg / courseStudents.length).toFixed(2));

    return { course, averageGrade: avg };
  });

  return courseAverages.sort((a, b) => b.averageGrade - a.averageGrade);
}

// 7. Comprehensive summary export
function exportSummary(studentsArray) {
  if (!Array.isArray(studentsArray) || studentsArray.length === 0) {
    return {
      totalStudents: 0,
      overallAverageGrade: 0,
      topStudent: null,
      courseBreakdown: []
    };
  }

  const totalStudents = studentsArray.length;
  const overallSum = studentsArray.reduce((sum, s) => sum + getAverageGrade(s), 0);
  const overallAverageGrade = Number((overallSum / totalStudents).toFixed(2));
  
  const topStudents = getTopStudents(studentsArray, 1);
  const topStudent = topStudents.length > 0 ? topStudents[0] : null;

  return {
    totalStudents,
    overallAverageGrade,
    topStudent,
    courseBreakdown: getCourseAverages(studentsArray)
  };
}

// ==========================================
// 3. STRETCH GOALS (EXTRA CREDIT)
// ==========================================

// Filter students by year level
function filterByYear(studentsArray, year) {
  if (!Array.isArray(studentsArray)) return [];
  if (typeof year !== "number" || year < 1) {
    throw new Error("Input Validation Error: 'year' must be a valid positive number.");
  }

  return studentsArray.filter(student => student.year === year);
}

// Sort students alphabetically by name
function sortByName(studentsArray) {
  if (!Array.isArray(studentsArray)) return [];

  return [...studentsArray].sort((a, b) => a.name.localeCompare(b.name));
}

// ==========================================
// 4. MAIN PROGRAM EXECUTOR
// ==========================================
function main() {
  console.log("================================================");
  console.log("       STUDENT RECORDS ANALYSIS REPORT         ");
  console.log("================================================\n");

  // Summary Report
  const summary = exportSummary(students);
  console.log("1. OVERALL SUMMARY REPORT");
  console.log(`- Total Students: ${summary.totalStudents}`);
  console.log(`- Overall Average Grade: ${summary.overallAverageGrade}`);
  console.log(`- Top Performing Student: ${summary.topStudent ? `${summary.topStudent.name} (${summary.topStudent.averageGrade})` : 'N/A'}`);
  console.log("\n");

  // Enrolled Status
  const enrollmentStatus = getEnrolledCount(students);
  console.log("2. ENROLLMENT STATUS BREAKDOWN");
  console.log(`- Enrolled: ${enrollmentStatus.enrolled}`);
  console.log(`- Not Enrolled: ${enrollmentStatus.notEnrolled}`);
  console.log("\n");

  // Top 3 Students
  console.log("3. TOP 3 STUDENTS OVERALL");
  const top3 = getTopStudents(students, 3);
  top3.forEach((student, rank) => {
    console.log(`  #${rank + 1} ${student.name} [${student.course}] - Avg: ${student.averageGrade}`);
  });
  console.log("\n");

  // Course Averages
  console.log("4. COURSE AVERAGE PERFORMANCE (RANKED)");
  const courseAverages = getCourseAverages(students);
  courseAverages.forEach(c => {
    console.log(`  - ${c.course}: ${c.averageGrade}`);
  });
  console.log("\n");

  // Student Search
  console.log("5. SEARCH EXAMPLES");
  const searchedFound = findStudent(students, "tony stark");
  console.log(`- Search 'tony stark':`, searchedFound ? `Found ${searchedFound.name} (ID: ${searchedFound.id})` : 'Not Found');
  
  const searchedNotFound = findStudent(students, "John Doe");
  console.log(`- Search 'John Doe':`, searchedNotFound ? `Found` : 'Not Found (Handled Gracefully)');
  console.log("\n");

  // Stretch Goals Demonstration
  console.log("6. STRETCH GOAL DEMONSTRATIONS");
  const year1Students = filterByYear(students, 1);
  console.log(`- Year 1 Student Count: ${year1Students.length}`);

  const sortedAlphabetically = sortByName(students);
  console.log(`- First student alphabetically: ${sortedAlphabetically[0].name}`);
  console.log(`- Last student alphabetically: ${sortedAlphabetically[sortedAlphabetically.length - 1].name}`);
  console.log("\n");

  // Input Validation Error Test
  console.log("7. EDGE CASES & ERROR HANDLING TESTS");
  console.log(`- Student with no grades (Michael Scott) average: ${getAverageGrade(findStudent(students, "Michael Scott"))}`);
  
  try {
    getTopStudents(students, -5); // Intentional error call
  } catch (err) {
    console.log(`- Error Handling caught: "${err.message}"`);
  }
  
  console.log("\n================================================");
  console.log("             END OF REPORT                     ");
  console.log("================================================");
}

// Run the script
main();
  
