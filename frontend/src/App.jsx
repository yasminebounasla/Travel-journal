import { useState, useEffect } from "react";
import Header from "./components/Header";
import Entry from "./components/Entry";
import { EntryForm } from "./components/entryForm.jsx";
import { getAllCards, createCard, updateCard, deleteCard } from "./services/api.js";

export default function App() {

  const [create, setCreate] = useState(false);
  const [editingEntry, setEditingEntry] = useState(null);
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [entryToDelete, setEntryToDelete] = useState(null); 
  
  
  useEffect(() => {
    loadEntries();
  }, []);

  const loadEntries = async () => {
    try {
      setLoading(true);
      const response = await getAllCards();
      setEntries(response.data); 
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error("Failed to load entries:", err);
    } finally {
      setLoading(false);
    }
  };

  // Handler functions
  const handleCreateClick = () => {
    setCreate(true);
  };
  
  const handleFormSubmit = async (formData) => {
    try {
      setLoading(true);
      
      if (editingEntry) {
        await updateCard(editingEntry.id, formData);
        setEditingEntry(null);
      } else {
        await createCard(formData);
        setCreate(false);
      }
      
      await loadEntries();
      
    } catch (err) {
      setError(err.message);
      console.error("Failed to save entry:", err);
    } finally {
      setLoading(false);
    }
  };
  
  const handleFormCancel = () => {
    setCreate(false);
    setEditingEntry(null);
  };
  
  const handleEdit = (entryId) => {
    const entryToEdit = entries.find(entry => entry.id === entryId);
    if (entryToEdit) {
      setEditingEntry({
        ...entryToEdit,
        imgSrc: entryToEdit.img?.src || entryToEdit.imgSrc || "",
        imgAlt: entryToEdit.img?.alt || entryToEdit.imgAlt || ""
      });
    }
  };

  
  const handleDeleteRequest = (entryId) => {
    setEntryToDelete(entryId); 
    setDeleteConfirm(true);   
  };
  
  const handleDeleteConfirm = async () => {
    if (entryToDelete) {
      try {
        setLoading(true);
        await deleteCard(entryToDelete);
        await loadEntries();
        setDeleteConfirm(false);
        setEntryToDelete(null);

      } catch (err) {
        setError(err.message);
        console.error("Failed to delete entry:", err);

      } finally {
        setLoading(false);
      }
    }
  };

  const handleDeleteCancel = () => {
    setDeleteConfirm(false);
    setEntryToDelete(null);
  };
  
  
  if (loading && entries.length === 0) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '18px',
        color: '#666'
      }}>
        Loading travels...
      </div>
    );
  }
  
  
  if (error && entries.length === 0) {
    return (
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '18px',
        color: '#f55a5a'
      }}>
        <p>Error: {error}</p>
        <button onClick={loadEntries} style={{
          padding: '10px 20px',
          backgroundColor: '#f55a5a',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer'
        }}>
          Try Again
        </button>
      </div>
    );
  }
  
  const entryElements = entries.map((entry) => {
    return <Entry
      key={entry.id}
      {...entry}
      onEdit={handleEdit}
      onDelete={handleDeleteRequest} 
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
          loading={loading}
        />
      )}
      
      {editingEntry && (
        <EntryForm
          mode="edit"
          initialData={editingEntry}
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}
          loading={loading}
        />
      )}

      {deleteConfirm && (
        <div className="delete-confirmation-overlay">
          <div className="delete-confirmation-modal">
            <div className="delete-confirmation-header">
              <h3>Delete Travel Entry</h3>
            </div>
            <div className="delete-confirmation-content">
              <p>Are you sure you want to delete this travel entry?</p>
              <p className="delete-warning">This action cannot be undone.</p>
            </div>
            <div className="delete-confirmation-buttons">
              <button
                className="delete-confirm-btn"
                onClick={handleDeleteConfirm}
                disabled={loading}
              >
                {loading ? "Deleting..." : "Yes, Delete"}
              </button>
              <button
                className="delete-cancel-btn"
                onClick={handleDeleteCancel}
                disabled={loading}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      
      <Header onCreateClick={handleCreateClick} />
      
      {error && (
        <div style={{
          backgroundColor: '#fee2e2',
          color: '#dc2626',
          padding: '12px',
          margin: '20px',
          borderRadius: '6px',
          textAlign: 'center'
        }}>
          {error}
        </div>
      )}
      
      <main className="container">
        {entryElements.length > 0 ? entryElements : (
          <div style={{ 
            textAlign: 'center', 
            padding: '40px', 
            color: '#666' 
          }}>
            No travel entries yet. Create your first one!
          </div>
        )}
      </main>
    </>
  );
}