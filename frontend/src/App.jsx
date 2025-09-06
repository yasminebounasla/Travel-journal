import { useState } from "react";
import Header from "./components/Header";
import Entry from "./components/Entry";
import data from "./data.js";
import { EntryForm } from "./components/entryForm.jsx";

export default function App() {
  const [create, setCreate] = useState(false);
  
  // Handler functions
  const handleCreateClick = () => {
    setCreate(true);
  };
  
  const handleFormSubmit = (formData) => {
    setCreate(false); 
  };
  
  const handleFormCancel = () => {
    setCreate(false);
  };
  
  const entryElements = data.map((entry) => {
    return <Entry
      key={entry.id}
      {...entry}
    />
  });
  
  return (
    <>
      {create && (
        <EntryForm
          mode="create"
          initialData={{
            title: "", 
            text: "", 
            country: "", 
            googleMapsLink: "", 
            dates: "", 
            imgSrc: "", 
            imgAlt: ""
          }} 
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}
        />
      )}
      <Header onCreateClick={handleCreateClick} />
      <main className="container">
        {entryElements}
      </main>
    </>
  );
}