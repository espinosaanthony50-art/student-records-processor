const fs = require('fs');

// Load Dataset
const rawData = fs.readFileSync('./students.json', 'utf8');
const students = JSON.parse(rawData);

// Calculation Helpers
function getAverageGrade(student) {
  if (!student || !Array.isArray(student.grades) || student.grades.length === 0) return 0;
  const sum = student.grades.reduce((acc, grade) => acc + grade, 0);
  return Number((sum / student.grades.length).toFixed(2));
}

function getTopStudents(studentsArray, n) {
  return [...studentsArray]
    .sort((a, b) => getAverageGrade(b) - getAverageGrade(a))
    .slice(0, n);
}

function groupByCourse(studentsArray) {
  return studentsArray.reduce((acc, student) => {
    const course = student.course || "Unassigned";
    return { ...acc, [course]: [...(acc[course] || []), student] };
  }, {});
}

function getCourseAverages(studentsArray) {
  const grouped = groupByCourse(studentsArray);
  return Object.keys(grouped).map((course) => {
    const courseStudents = grouped[course];
    const totalAvgSum = courseStudents.reduce((sum, s) => sum + getAverageGrade(s), 0);
    return {
      course,
      averageGrade: Number((totalAvgSum / courseStudents.length).toFixed(2))
    };
  }).sort((a, b) => b.averageGrade - a.averageGrade);
}

function exportSummary(studentsArray) {
  const totalStudents = studentsArray.length;
  const overallAvgSum = studentsArray.reduce((sum, s) => sum + getAverageGrade(s), 0);
  const topStudent = getTopStudents(studentsArray, 1)[0] || null;

  return {
    totalStudents,
    overallAverage: Number((overallAvgSum / totalStudents).toFixed(2)),
    topStudent: topStudent ? { name: topStudent.name, averageGrade: getAverageGrade(topStudent) } : null,
    courseBreakdown: getCourseAverages(studentsArray)
  };
}

// Generate & Save Report
function main() {
  const summaryReport = exportSummary(students);

  // Write summary object to report.json
  fs.writeFileSync('./report.json', JSON.stringify(summaryReport, null, 2), 'utf8');
  console.log('Report successfully exported to report.json!');
}

main();
