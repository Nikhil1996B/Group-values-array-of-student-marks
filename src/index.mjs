const studentObj = [
  {
    name: "Student abc",
    id: "123",
    subject: "English",
    score: 85,
  },

  {
    name: "Student abc",
    id: "123",
    subject: "Maths",
    score: 98,
  },
  {
    name: "Student Def",
    id: "456",
    subject: "Science",
    score: 92,
  },
  {
    name: "Student Def",
    id: "456",
    subject: "Maths",
    score: 98,
  },
];

const ifValuePresent = (arr, key, value) => arr?.find((a) => a[key] === value);

const filteredAndGroupedResult = studentObj.reduce((accumalator, curr) => {
  const { name, id, subject, score } = curr;
  const fallBackSubjectScore = { subject, score };
  if (ifValuePresent(accumalator || [], "id", curr?.id)) {
    accumalator = (accumalator || [])?.map((acc) => {
      const subjectScore = [...(acc?.subjectScore || [])];
      return acc?.id === id
        ? {
            name,
            id,
            subjectScore: ifValuePresent(
              acc?.subjectScore || [],
              "subject",
              subject,
            )
              ? subjectScore.map((subjectEntity) =>
                  subjectEntity?.subject === subject
                    ? {
                        ...(subjectEntity || {}),
                        score: (subjectEntity?.score || 0) + score,
                      }
                    : fallBackSubjectScore,
                )
              : [...subjectScore, fallBackSubjectScore],
          }
        : acc;
    });
    return accumalator;
  } else {
    accumalator.push({
      name,
      id,
      subjectScore: [fallBackSubjectScore],
    });
  }
  return accumalator;
}, []);

const output = document.getElementById("output");
output.innerHTML = JSON.stringify(filteredAndGroupedResult, null, 4);
