import React, { useState } from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import { FaBook, FaClipboardList, FaGlobeAsia, FaBolt, FaGraduationCap, FaArrowLeft, FaLandmark, FaChartLine, FaHistory, FaMap, FaFlask, FaLeaf } from 'react-icons/fa';

// MainContentCards Component - Displays the dashboard cards
const MainContentCards = ({ onNavigate }) => {
  // Define the content items for the dashboard cards
  const contentItems = [
    {
      title: "UPSC Content",
      icon: <FaGraduationCap size={24} />,
      description: "Access NCERTs, Standard Books, and other essential UPSC study materials.",
      action: "Go to Content",
      page: "upscContent", // Page to navigate to
    },
    {
      title: "NCERT Summaries",
      icon: <FaBook size={24} />,
      description: "Quick revision-friendly summaries of NCERTs from class 6 to 12.",
      action: "View",
      page: "ncertSummaries", // Page to navigate to
    },
    {
      title: "Standard Books",
      icon: <FaClipboardList size={24} />,
      description: "Toppers recommended booklist with links and notes.",
      action: "Explore",
      page: "standardBooks", // Page to navigate to
    },
    {
      title: "Important Topics",
      icon: <FaGlobeAsia size={24} />,
      description: "Curated list of topics likely to appear in UPSC based on trends.",
      action: "Check",
      page: "importantTopics", // Page to navigate to
    },
    {
      title: "Static vs Current",
      icon: <FaBolt size={24} />,
      description: "Smart breakdown of which topics require static vs dynamic prep.",
      action: "Compare",
      page: "staticVsCurrent", // Page to navigate to
    },
  ];

  return (
    <div className="p-4 bg-gray-100 min-h-screen rounded-lg shadow-inner">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">UPSC Dashboard</h2>
      <Row className="g-4 justify-center">
        {contentItems.map((item, idx) => (
          <Col key={idx} xs={12} sm={6} md={6} lg={4} xl={3}>
            <Card className="shadow-lg h-full border-0 rounded-xl transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
              <Card.Body className="d-flex flex-col justify-between p-6">
                <div className="flex items-center gap-4 mb-4 text-blue-600">
                  {item.icon}
                  <Card.Title className="mb-0 text-xl font-semibold text-gray-900">{item.title}</Card.Title>
                </div>
                <Card.Text className="text-gray-700 mb-6 flex-grow" style={{ fontSize: "0.95rem" }}>
                  {item.description}
                </Card.Text>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => onNavigate(item.page)}
                  className="w-full py-2 px-4 rounded-lg font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-200"
                >
                  {item.action}
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

// NCERTContent Component - Displays NCERT books by class
const NCERTContent = ({ onBack }) => {
  const ncertClasses = Array.from({ length: 7 }, (_, i) => i + 6); // Classes 6 to 12
  const [selectedClass, setSelectedClass] = useState(null);

  // Dummy content for NCERT books
  const getNCERTBookContent = (className) => {
    switch (className) {
      case 6:
        return (
          <ul className="list-disc list-inside text-gray-700">
            <li>History: Our Pasts I</li>
            <li>Geography: The Earth Our Habitat</li>
            <li>Civics: Social and Political Life I</li>
            <li>Science: Science (Class VI)</li>
          </ul>
        );
      case 7:
        return (
          <ul className="list-disc list-inside text-gray-700">
            <li>History: Our Pasts II</li>
            <li>Geography: Our Environment</li>
            <li>Civics: Social and Political Life II</li>
            <li>Science: Science (Class VII)</li>
          </ul>
        );
      case 8:
        return (
          <ul className="list-disc list-inside text-gray-700">
            <li>History: Our Pasts III (Part 1 & 2)</li>
            <li>Geography: Resources and Development</li>
            <li>Civics: Social and Political Life III</li>
            <li>Science: Science (Class VIII)</li>
          </ul>
        );
      case 9:
        return (
          <ul className="list-disc list-inside text-gray-700">
            <li>History: India and the Contemporary World I</li>
            <li>Geography: Contemporary India I</li>
            <li>Political Science: Democratic Politics I</li>
            <li>Economics: Economics (Class IX)</li>
          </ul>
        );
      case 10:
        return (
          <ul className="list-disc list-inside text-gray-700">
            <li>History: India and the Contemporary World II</li>
            <li>Geography: Contemporary India II</li>
            <li>Political Science: Democratic Politics II</li>
            <li>Economics: Understanding Economic Development</li>
          </ul>
        );
      case 11:
        return (
          <ul className="list-disc list-inside text-gray-700">
            <li>History: Themes in Indian History I, II, III</li>
            <li>Geography: Fundamentals of Physical Geography, India Physical Environment</li>
            <li>Political Science: Indian Constitution at Work, Political Theory</li>
            <li>Economics: Indian Economic Development</li>
          </ul>
        );
      case 12:
        return (
          <ul className="list-disc list-inside text-gray-700">
            <li>History: Themes in Indian History I, II, III (Contd.)</li>
            <li>Geography: Fundamentals of Human Geography, India People and Economy</li>
            <li>Political Science: Contemporary World Politics, Politics in India Since Independence</li>
            <li>Economics: Introductory Microeconomics, Introductory Macroeconomics</li>
          </ul>
        );
      default:
        return <p className="text-gray-600">Select a class to view its NCERT books.</p>;
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-xl min-h-screen">
      <Button
        variant="outline-secondary"
        onClick={onBack}
        className="mb-6 flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors duration-200"
      >
        <FaArrowLeft /> Back to UPSC Content
      </Button>
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">NCERT Summaries</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-8">
        {ncertClasses.map((cls) => (
          <Button
            key={cls}
            variant={selectedClass === cls ? "primary" : "outline-primary"}
            onClick={() => setSelectedClass(cls)}
            className="py-3 px-2 rounded-lg font-medium text-center transition-all duration-200"
          >
            Class {cls}
          </Button>
        ))}
      </div>

      {selectedClass && (
        <Card className="shadow-md border-0 rounded-lg p-6 bg-blue-50">
          <Card.Body>
            <Card.Title className="text-2xl font-semibold text-blue-800 mb-4">
              NCERT Books for Class {selectedClass}
            </Card.Title>
            {getNCERTBookContent(selectedClass)}
          </Card.Body>
        </Card>
      )}
    </div>
  );
};

// UPSCContentPage Component - Displays general UPSC content categories
const UPSCContentPage = ({ onBack, onNavigate }) => {
  const subjects = [
    { name: "Polity", icon: <FaLandmark size={24} />, color: "blue" },
    { name: "Economy", icon: <FaChartLine size={24} />, color: "green" },
    { name: "History", icon: <FaHistory size={24} />, color: "red" },
    { name: "Geography", icon: <FaMap size={24} />, color: "purple" },
    { name: "Science & Tech", icon: <FaFlask size={24} />, color: "orange" },
    { name: "Environment", icon: <FaLeaf size={24} />, color: "teal" },
  ];

  const [selectedSubject, setSelectedSubject] = useState("Polity"); // Default selected subject

  // Dummy content for subjects
  const getSubjectContent = (subject) => {
    switch (subject) {
      case "Polity":
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-semibold text-blue-800 mb-3">NCERTs for Polity</h3>
              <ul className="list-disc list-inside text-gray-700">
                <li>Class 9: Democratic Politics I</li>
                <li>Class 10: Democratic Politics II</li>
                <li>Class 11: Indian Constitution at Work, Political Theory</li>
                <li>Class 12: Contemporary World Politics, Politics in India Since Independence</li>
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-blue-800 mb-3">Standard Books for Polity</h3>
              <ul className="list-disc list-inside text-gray-700">
                <li>M. Laxmikanth: Indian Polity</li>
                <li>D.D. Basu: Introduction to the Constitution of India (for reference)</li>
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-blue-800 mb-3">Other Books/Resources for Polity</h3>
              <ul className="list-disc list-inside text-gray-700">
                <li>ARC Reports (relevant chapters)</li>
                <li>Economic Survey (relevant chapters on governance)</li>
                <li>Current Affairs on Constitutional Amendments, Supreme Court Judgments</li>
              </ul>
            </div>
          </div>
        );
      case "Economy":
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-semibold text-green-800 mb-3">NCERTs for Economy</h3>
              <ul className="list-disc list-inside text-gray-700">
                <li>Class 9: Economics (Class IX)</li>
                <li>Class 10: Understanding Economic Development</li>
                <li>Class 11: Indian Economic Development</li>
                <li>Class 12: Introductory Microeconomics, Introductory Macroeconomics</li>
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-green-800 mb-3">Standard Books for Economy</h3>
              <ul className="list-disc list-inside text-gray-700">
                <li>Ramesh Singh: Indian Economy</li>
                <li>Sanjiv Verma: The Indian Economy</li>
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-green-800 mb-3">Other Books/Resources for Economy</h3>
              <ul className="list-disc list-inside text-gray-700">
                <li>Economic Survey (latest)</li>
                <li>Union Budget (latest)</li>
                <li>NITI Aayog Documents</li>
                <li>RBI Annual Reports</li>
              </ul>
            </div>
          </div>
        );
      case "History":
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-semibold text-red-800 mb-3">NCERTs for History</h3>
              <ul className="list-disc list-inside text-gray-700">
                <li>Class 6: Our Pasts I (Ancient)</li>
                <li>Class 7: Our Pasts II (Medieval)</li>
                <li>Class 8: Our Pasts III (Modern)</li>
                <li>Class 12: Themes in Indian History I, II, III</li>
                <li>Old NCERTs: Ancient India (R.S. Sharma), Medieval India (Satish Chandra), Modern India (Bipan Chandra)</li>
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-red-800 mb-3">Standard Books for History</h3>
              <ul className="list-disc list-inside text-gray-700">
                <li>Modern India: Spectrum (A Brief History of Modern India)</li>
                <li>Art & Culture: Nitin Singhania (Indian Art and Culture)</li>
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-red-800 mb-3">Other Books/Resources for History</h3>
              <ul className="list-disc list-inside text-gray-700">
                <li>Selected chapters from standard university textbooks</li>
                <li>Cultural institution websites (e.g., ASI)</li>
              </ul>
            </div>
          </div>
        );
      case "Geography":
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-semibold text-purple-800 mb-3">NCERTs for Geography</h3>
              <ul className="list-disc list-inside text-gray-700">
                <li>Class 6: The Earth Our Habitat</li>
                <li>Class 7: Our Environment</li>
                <li>Class 8: Resources and Development</li>
                <li>Class 9: Contemporary India I</li>
                <li>Class 10: Contemporary India II</li>
                <li>Class 11: Fundamentals of Physical Geography, India Physical Environment</li>
                <li>Class 12: Fundamentals of Human Geography, India People and Economy</li>
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-purple-800 mb-3">Standard Books for Geography</h3>
              <ul className="list-disc list-inside text-gray-700">
                <li>G.C. Leong: Certificate Physical and Human Geography</li>
                <li>Majid Husain: Indian and World Geography (for reference)</li>
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-purple-800 mb-3">Other Books/Resources for Geography</h3>
              <ul className="list-disc list-inside text-gray-700">
                <li>Atlases (Oxford/Orient Blackswan)</li>
                <li>Geographical Survey of India publications</li>
              </ul>
            </div>
          </div>
        );
      case "Science & Tech":
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-semibold text-orange-800 mb-3">NCERTs for Science & Tech</h3>
              <ul className="list-disc list-inside text-gray-700">
                <li>Class 6-10: Science</li>
                <li>Class 11 & 12: Biology (selected chapters), Chemistry (selected chapters)</li>
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-orange-800 mb-3">Standard Books for Science & Tech</h3>
              <ul className="list-disc list-inside text-gray-700">
                <li>Ravi P. Agrahari: Science and Technology</li>
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-orange-800 mb-3">Other Books/Resources for Science & Tech</h3>
              <ul className="list-disc list-inside text-gray-700">
                <li>The Hindu/Indian Express Science & Tech sections</li>
                <li>Government reports on scientific advancements</li>
              </ul>
            </div>
          </div>
        );
      case "Environment":
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-semibold text-teal-800 mb-3">NCERTs for Environment</h3>
              <ul className="list-disc list-inside text-gray-700">
                <li>Class 12 Biology: Units on Ecology</li>
                <li>Class 11 Geography: Chapters on Environment</li>
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-teal-800 mb-3">Standard Books for Environment</h3>
              <ul className="list-disc list-inside text-gray-700">
                <li>Shankar IAS: Environment</li>
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-teal-800 mb-3">Other Books/Resources for Environment</h3>
              <ul className="list-disc list-inside text-gray-700">
                <li>Ministry of Environment, Forest and Climate Change reports</li>
                <li>International environmental conventions and protocols</li>
              </ul>
            </div>
          </div>
        );
      default:
        return <p className="text-gray-600">Select a subject to view its content.</p>;
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-xl min-h-screen">
      <Button
        variant="outline-secondary"
        onClick={onBack}
        className="mb-6 flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors duration-200"
      >
        <FaArrowLeft /> Back to Dashboard
      </Button>
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">UPSC Study Materials by Subject</h2>

      {/* Subject Navigation Tabs/Buttons */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {subjects.map((subject) => (
          <Button
            key={subject.name}
            variant={selectedSubject === subject.name ? "primary" : "outline-primary"}
            onClick={() => setSelectedSubject(subject.name)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200
                        ${selectedSubject === subject.name ? `bg-${subject.color}-600 text-white` : `text-${subject.color}-600 border-${subject.color}-600 hover:bg-${subject.color}-100`}`}
          >
            {subject.icon} {subject.name}
          </Button>
        ))}
      </div>

      {/* Content Area based on selected subject */}
      {selectedSubject && (
        <Card className="shadow-md border-0 rounded-lg p-6 bg-gray-50">
          <Card.Body>
            <Card.Title className={`text-3xl font-bold text-${subjects.find(s => s.name === selectedSubject)?.color}-800 mb-6`}>
              {selectedSubject} Study Resources
            </Card.Title>
            {getSubjectContent(selectedSubject)}
          </Card.Body>
        </Card>
      )}
    </div>
  );
};

// Placeholder for Standard Books Page
const StandardBooksPage = ({ onBack }) => (
  <div className="p-6 bg-white rounded-lg shadow-xl min-h-screen">
    <Button
      variant="outline-secondary"
      onClick={onBack}
      className="mb-6 flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors duration-200"
    >
      <FaArrowLeft /> Back to UPSC Content
    </Button>
    <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Standard Books</h2>
    <div className="text-gray-700 space-y-4">
      <p>This section will list recommended standard books for UPSC preparation.</p>
      <ul className="list-disc list-inside">
        <li>Polity: M. Laxmikanth</li>
        <li>History: Spectrum (Modern India), Old NCERTs (Ancient & Medieval)</li>
        <li>Geography: G.C. Leong, Class 11 & 12 NCERTs</li>
        <li>Economy: Ramesh Singh</li>
        <li>Environment: Shankar IAS</li>
        <li>Art & Culture: Nitin Singhania</li>
      </ul>
      <p>Each book entry could include links, brief notes, and study strategies.</p>
    </div>
  </div>
);

// Placeholder for Important Topics Page
const ImportantTopicsPage = ({ onBack }) => (
  <div className="p-6 bg-white rounded-lg shadow-xl min-h-screen">
    <Button
      variant="outline-secondary"
      onClick={onBack}
      className="mb-6 flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors duration-200"
    >
      <FaArrowLeft /> Back to Dashboard
    </Button>
    <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Important Topics</h2>
    <div className="text-gray-700 space-y-4">
      <p>This section will feature a curated list of high-yield topics for UPSC based on previous year trends and current affairs.</p>
      <ul className="list-disc list-inside">
        <li>Indian Economy: Budget, Economic Survey, Major Schemes</li>
        <li>Environment: Climate Change, Biodiversity, International Conventions</li>
        <li>Science & Tech: Space, Defence, Biotechnology advancements</li>
        <li>International Relations: Major global groupings, India's foreign policy</li>
        <li>Polity & Governance: Constitutional Amendments, Key Acts, Supreme Court Judgments</li>
      </ul>
      <p>Each topic could link to detailed notes or relevant articles.</p>
    </div>
  </div>
);

// Placeholder for Static vs Current Page
const StaticVsCurrentPage = ({ onBack }) => (
  <div className="p-6 bg-white rounded-lg shadow-xl min-h-screen">
    <Button
      variant="outline-secondary"
      onClick={onBack}
      className="mb-6 flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors duration-200"
    >
      <FaArrowLeft /> Back to Dashboard
    </Button>
    <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Static vs Current Affairs Breakdown</h2>
    <div className="text-gray-700 space-y-4">
      <p>This section provides a smart breakdown of topics, indicating whether they require a static (conceptual) or dynamic (current affairs) preparation approach.</p>
      <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2">Examples:</h3>
      <ul className="list-disc list-inside">
        <li>
          <strong>Polity:</strong>
          <ul className="list-circle list-inside ml-5">
            <li>Static: Fundamental Rights, DPSP, Parliament structure</li>
            <li>Current: Recent constitutional amendments, Supreme Court judgments, new bills</li>
          </ul>
        </li>
        <li>
          <strong>Economy:</strong>
          <ul className="list-circle list-inside ml-5">
            <li>Static: Basic economic concepts (GDP, inflation, types of markets)</li>
            <li>Current: Union Budget, Economic Survey, RBI policies, international trade agreements</li>
          </ul>
        </li>
      </ul>
      <p className="mt-4">This helps students prioritize their study focus for each subject.</p>
    </div>
  </div>
);


// Main App Component
const App = () => {
  // State to manage the current page being displayed
  const [currentPage, setCurrentPage] = useState('dashboard'); // 'dashboard', 'upscContent', 'ncertSummaries', 'standardBooks', 'importantTopics', 'staticVsCurrent'

  // Function to handle navigation between pages
  const handleNavigate = (page) => {
    setCurrentPage(page);
  };

  // Render the appropriate component based on the current page state
  const renderPage = () => {
    switch (currentPage) {
      case 'upscContent':
        return <UPSCContentPage onBack={() => handleNavigate('dashboard')} onNavigate={handleNavigate} />;
      case 'ncertSummaries':
        return <NCERTContent onBack={() => handleNavigate('upscContent')} />;
      case 'standardBooks':
        return <StandardBooksPage onBack={() => handleNavigate('upscContent')} />;
      case 'importantTopics':
        return <ImportantTopicsPage onBack={() => handleNavigate('dashboard')} />;
      case 'staticVsCurrent':
        return <StaticVsCurrentPage onBack={() => handleNavigate('dashboard')} />;
      case 'dashboard':
      default:
        return <MainContentCards onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-inter antialiased">
      {/* Tailwind CSS CDN for styling */}
      <script src="https://cdn.tailwindcss.com"></script>
      {/* Bootstrap CSS (for Card, Row, Col, Button components) */}
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
        xintegrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" // Added a dummy integrity hash
        crossOrigin="anonymous"
      />
      {/* Custom styles for the app */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
          body {
            font-family: 'Inter', sans-serif;
          }
          /* Custom utility classes for list styles */
          .list-circle {
            list-style-type: circle;
          }
        `}
      </style>
      <header className="bg-gradient-to-r from-blue-600 to-purple-700 text-white p-4 shadow-lg">
        <h1 className="text-4xl font-extrabold text-center">UPSC Prep Hub</h1>
      </header>
      <main className="container mx-auto py-8">
        {renderPage()}
      </main>
    </div>
  );
};

export default App;
