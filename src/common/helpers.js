// A list of commonly used helper methods

const getApplicantsFromLocalStorage = () => {
  if (Object.keys(localStorage)) {
    let savedApplicants = Object.keys(localStorage).reduce((acc, prev) => {
      if (/Applicant:/.test(prev)) {
        acc.push(localStorage.getItem(prev))
      }
      return acc;
    }, []);
    let parsedApplicantList = savedApplicants.map(applicant => JSON.parse(applicant));
    return parsedApplicantList;
  }
  return []
}

const upperCaseFirstLetter = str => str.charAt(0).toUpperCase() + str.slice(1)

export {
  getApplicantsFromLocalStorage,
  upperCaseFirstLetter
}