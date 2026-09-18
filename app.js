
// ==========================================
// 1. DATASET SETUP
// ==========================================
const students = [
  { id: 1, name: "Alice Johnson", year: 1, course: "Computer Science", grades: [88, 92, 95, 90], enrolled: true },
  { id: 2, name: "Bob Smith", year: 2, course: "Information Technology", grades: [75, 80, 78, 82], enrolled: true },
  { id: 3, name: "Charlie Brown", year: 3, course: "Computer Science", grades: [95, 98, 100, 96], enrolled: true },
  { id: 4, name: "Diana Prince", year: 1, course: "Data Science", grades: [85, 87, 90, 88], enrolled: false },
  { id: 5, name: "Ethan Hunt", year: 4, course: "Information Technology", grades: [70, 68, 75, 72], enrolled: true },
  { id: 6, name: "Fiona Gallagher", year: 2, course: "Software Engineering", grades: [91, 93, 89, 94], enrolled: true },
  { id: 7, name: "George Clark", year: 3, course: "Data Science", grades: [60, 65, 70, 68], enrolled: false },
  { id: 8, name: "Hannah Abbott", year: 1, course: "Computer Science", grades: [82, 84, 86, 88], enrolled: true },
  { id: 9, name: "Ian Malcolm", year: 4, course: "Software Engineering", grades: [99, 97, 95, 98], enrolled: true },
  { id: 10, name: "Julia Roberts", year: 2, course: "Information Technology", grades: [88, 90, 85, 87], enrolled: true },
  { id: 11, name: "Kevin Bacon", year: 3, course: "Computer Science", grades: [78, 82, 80, 85], enrolled: false },
  { id: 12, name: "Laura Croft", year: 1, course: "Data Science", grades: [93, 96, 94, 98], enrolled: true },
  { id: 13, name: "Michael Scott", year: 4, course: "Information Technology", grades: [65, 70, 68, 60], enrolled: false },
  { id: 14, name: "Nina Williams", year: 2, course: "Software Engineering", grades: [87, 89, 91, 90], enrolled: true },
  { id: 15, name: "Oscar Martinez", year: 3, course: "Data Science", grades: [92, 94, 96, 95], enrolled: true },
  { id: 16, name: "Peter Parker", year: 1, course: "Computer Science", grades: [100, 98, 99, 97], enrolled: true },
  { id: 17, name: "Quinn Fabray", year: 2, course: "Information Technology", grades: [79, 81, 83, 80], enrolled: true },
  { id: 18, name: "Rachel Green", year: 3, course: "Software Engineering", grades: [84, 86, 88, 85], enrolled: false },
  { id: 19, name: "Steve Rogers", year: 4, course: "Data Science", grades: [89, 91, 90, 93], enrolled: true },
  { id: 20, name: "Tony Stark", year: 1, course: "Computer Science", grades: [100, 100, 100, 99], enrolled: true },
  { id: 21, name: "Uma Thurman", year: 2, course: "Information Technology", grades: [72, 75, 78, 74], enrolled: true },
  { id: 22, name: "Victor Stone", year: 3, course: "Software Engineering", grades: [96, 95, 97, 98], enrolled: true },
  { id: 23, name: "Wanda Maximoff", year: 4, course: "Data Science", grades: [91, 93, 95, 92], enrolled: true },
  { id: 24, name: "Xavier Charles", year: 1, course: "Computer Science", grades: [94, 96, 92, 95], enrolled: false },
  { id: 25, name: "Yara Greyjoy", year: 2, course: "Information Technology", grades: [80, 82, 85, 83], enrolled: true },
  { id: 26, name: "Zack Morris", year: 3, course: "Software Engineering", grades: [77, 79, 75, 80], enrolled: false },
  { id: 27, name: "Arthur Dent", year: 4, course: "Data Science", grades: [68, 72, 70, 74], enrolled: true },
  { id: 28, name: "Bruce Wayne", year: 1, course: "Computer Science", grades: [90, 92, 94, 91], enrolled: true },
  { id: 29, name: "Clark Kent", year: 2, course: "Information Technology", grades: [86, 88, 90, 87], enrolled: true },
  { id: 30, name: "No Grades Student", year: 1, course: "Computer Science", grades: [], enrolled: true }
];

// ==========================================
// 2. CORE FUNCTIONS
// ==========================================

/**
 * Calculates average grade for a single student.
 */
function getAverageGrade(student) {
  if (!student || typeof student !== "object") return 0;
  if (!Array.isArray(student.grades) || student.grades.length === 0) return 0;
  
  const sum = student.grades.reduce((acc, curr) => acc + curr, 0);
  return Number((sum / student.grades.length).toFixed(2));
}

/**
 * Returns top N students sorted by average grade.
 */
function getTopStudents(studentsArray, n) {
  if (!Array.isArray(studentsArray)) throw new TypeError("Students parameter must be an array.");
  if (typeof n !== "number" || n < 0 || !Number.isInteger(n)) {
    throw new Error("Parameter 'n' must be a non-negative integer.");
  }

  return [...studentsArray]
    .map(student => ({
      ...student,
      averageGrade: getAverageGrade(student)
    }))
    .sort((a, b) => b.averageGrade - a.averageGrade)
    .slice(0, n);
}

/**
 * Groups students by course field using reduce.
 */
function groupByCourse(studentsArray) {
  if (!Array.isArray(studentsArray)) return {};

  return studentsArray.reduce((grouped, student) => {
    const course = student.course || "Unassigned";
    if (!grouped[course]) {
      grouped[course] = [];
    }
    grouped[course].push({ ...student });
    return grouped;
  }, {});
}

/**
 * Returns enrollment breakdown.
 */
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

/**
 * Performs case-insensitive student search by name.
 */
function findStudent(studentsArray, name) {
  if (!Array.isArray(studentsArray) || typeof name !== "string" || !name.trim()) {
    return null;
  }

  const searchName = name.toLowerCase().trim();
  const match = studentsArray.find(student => student.name.toLowerCase() === searchName);
  
  return match ? { ...match } : null;
}

/**
 * Calculates average grade per course, sorted highest to lowest.
 */
function getCourseAverages(studentsArray) {
  if (!Array.isArray(studentsArray) || studentsArray.length === 0) return [];

  const grouped = groupByCourse(studentsArray);

  const courseAverages = Object.keys(grouped).map(course => {
    const courseStudents = grouped[course];
    const totalGradesSum = courseStudents.reduce((sum, student) => sum + getAverageGrade(student), 0);
    const avg = courseStudents.length > 0 ? Number((totalGradesSum / courseStudents.length).toFixed(2)) : 0;
    
    return { course, averageGrade: avg };
  });

  return courseAverages.sort((a, b) => b.averageGrade - a.averageGrade);
}

/**
 * Generates comprehensive dataset summary report.
 */
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
  
  const overallSum = studentsArray.reduce((acc, student) => acc + getAverageGrade(student), 0);
  const overallAverageGrade = Number((overallSum / totalStudents).toFixed(2));
  
  const topStudent = getTopStudents(studentsArray, 1)[0] || null;
  const courseBreakdown = getCourseAverages(studentsArray);

  return {
    totalStudents,
    overallAverageGrade,
    topStudent,
    courseBreakdown
  };
}

// ==========================================
// 3. STRETCH GOALS
// ==========================================

function filterByYear(studentsArray, year) {
  if (!Array.isArray(studentsArray)) return [];
  if (typeof year !== "number" || year <= 0) throw new Error("Year must be a positive number.");

  return studentsArray.filter(student => student.year === year);
}

function sortByName(studentsArray) {
  if (!Array.isArray(studentsArray)) return [];

  return [...studentsArray].sort((a, b) => a.name.localeCompare(b.name));
}

// ==========================================
// 4. MAIN REPORT EXECUTION
// ==========================================

function main() {
  console.log("================================================");
  console.log("          STUDENT RECORDS REPORT SUMMARY        ");
  console.log("================================================");

  // 1. Enrollment Counts
  const enrollment = getEnrolledCount(students);
  console.log(`\n[ENROLLMENT STATUS]`);
  console.log(`Enrolled: ${enrollment.enrolled} | Not Enrolled: ${enrollment.notEnrolled}`);

  // 2. Top 3 Students
  console.log(`\n[TOP 3 PERFORMING STUDENTS]`);
  const top3 = getTopStudents(students, 3);
  top3.forEach((s, idx) => {
    console.log(`${idx + 1}. ${s.name} (${s.course}) - Avg: ${s.averageGrade}`);
  });

  // 3. Course Averages
  console.log(`\n[COURSE AVERAGE GRADES]`);
  const courseAvgs = getCourseAverages(students);
  courseAvgs.forEach(c => {
    console.log(`- ${c.course}: ${c.averageGrade}`);
  });

  // 4. Student Search Test (Success & Fail)
  console.log(`\n[STUDENT SEARCH TESTS]`);
  const search1 = findStudent(students, "tony stark");
  console.log(`Search 'tony stark':`, search1 ? `${search1.name} found (ID: ${search1.id})` : "Not found");
  
  const search2 = findStudent(students, "Unknown Person");
  console.log(`Search 'Unknown Person':`, search2 ? "Found" : "Not found (Returned null)");

  // 5. Full Export Summary
  console.log(`\n[EXPORT SUMMARY DATA]`);
  const summary = exportSummary(students);
  console.log(JSON.stringify(summary, null, 2));

  // 6. Stretch Goals Demonstration
  console.log(`\n[STRETCH GOALS DEMO]`);
  console.log(`Year 1 Students Count: ${filterByYear(students, 1).length}`);
  console.log(`First 3 Students Sorted Alphabetically:`);
  sortByName(students).slice(0, 3).forEach(s => console.log(`- ${s.name}`));

  console.log("\n================================================");
}

main();
