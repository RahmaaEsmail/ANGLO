import React, { useEffect, useState } from "react";

function CreateCards() {
  const [selectedType, setSelectedType] = useState("cou"); // Default to "cou" for Courses
  const [selectedSubject, setSelectedSubject] = useState("");
  const [endDate, setEndDate] = useState("");
  const [cardCount, setCardCount] = useState("");
  const [subjects, setSubjects] = useState([]); // State to store subjects list

  // Fetch the subjects to populate the dropdown based on the selected type
  const getSubjs = async (type) => {
    try {
      const response = await fetch(
        "https://Camp-coding.tech/teachersApp2024/Ezz_Zatona/doctor/home/select_subjects.php",
        {
          method: "POST",
          headers: { "Content-Type": "Application/Json" },
          body: JSON.stringify({ type: type }),
        }
      );
      const data = await response.json();
      setSubjects(data);
    } catch (err) {
      setSubjects([]);
    }
  };

  // Triggered on clicking the "Create Cards" button
  
  const handleCreateCards = () => {
    const createCardsUrl = `https://Camp-coding.tech/teachersApp2024/Ezz_Zatona/doctor/home/cards/create_cards.php?subject_id=${
      selectedType == "cou" ? null : selectedSubject
    }&end_date=${endDate}&card_count=${cardCount}&type=${selectedType}`;
    window.open(createCardsUrl, "_blank"); // Open in a new tab
  };

  useEffect(() => {
    getSubjs(selectedType); // Load subjects based on the selected type
  }, [selectedType]);

  return (
    <div className="create-cards">
      <h1>Create Cards</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleCreateCards();
        }}
      >
        {/* Type Selection: Courses or Diplomas */}
        <div className="form-group">
          <label htmlFor="subjectType">Select Subject Type</label>
          <select
            id="subjectType"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            required
          >
            <option value="cou">Courses</option>
            <option value="deb">Diplomas</option>
          </select>
        </div>

        {/* Subject Selection Dropdown */}
        {selectedType == "cou" ? null :<div className="form-group">
          <label htmlFor="subject">Select Subject</label>
          <select
            id="subject"
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            required
          >
            <option value="">Select a subject</option>
            {subjects.map((subject) => (
              <option key={subject.subject_id} value={subject.subject_id}>
                {subject.subject_name}
              </option>
            ))}
          </select>
        </div>}

        {/* End Date Input */}
        <div className="form-group">
          <label htmlFor="endDate">End Date</label>
          <input
            type="date"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </div>

        {/* Card Count Input */}
        <div className="form-group">
          <label htmlFor="cardCount">Card Count</label>
          <input
            type="number"
            id="cardCount"
            value={cardCount}
            onChange={(e) => setCardCount(e.target.value)}
            min="1"
            required
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary">
          Create Cards
        </button>
      </form>
    </div>
  );
}

export default CreateCards;
