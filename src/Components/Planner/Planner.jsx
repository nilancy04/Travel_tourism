import React, { useState } from 'react';
import './Planner.css';
import { FaPlane, FaHotel, FaMapMarkedAlt, FaList, FaCalculator, FaSuitcase, FaUtensils, FaTaxi, FaShoppingBag, FaShieldAlt, FaPassport } from 'react-icons/fa';

const Planner = () => {
  const [activeTab, setActiveTab] = useState('itinerary');
  const [budget, setBudget] = useState({
    flights: 0,
    hotels: 0,
    activities: 0,
    food: 0,
    transport: 0,
    shopping: 0,
    insurance: 0,
    visas: 0
  });
  const [showBreakdown, setShowBreakdown] = useState(true);

  const [packingList, setPackingList] = useState({
    essentials: [
      { id: 1, item: 'Passport', checked: false },
      { id: 2, item: 'Travel Insurance', checked: false },
      { id: 3, item: 'Visa Documents', checked: false },
      { id: 4, item: 'Cash/Cards', checked: false },
      { id: 5, item: 'ID Cards', checked: false }
    ],
    clothing: [
      { id: 6, item: 'Comfortable Shoes', checked: false },
      { id: 7, item: 'Walking Shoes', checked: false },
      { id: 8, item: 'Socks', checked: false },
      { id: 9, item: 'Underwear', checked: false },
      { id: 10, item: 'T-shirts', checked: false }
    ],
    electronics: [
      { id: 11, item: 'Phone Charger', checked: false },
      { id: 12, item: 'Power Bank', checked: false },
      { id: 13, item: 'Camera', checked: false },
      { id: 14, item: 'Power Adapter', checked: false },
      { id: 15, item: 'Headphones', checked: false }
    ],
    toiletries: [
      { id: 16, item: 'Toothbrush', checked: false },
      { id: 17, item: 'Toothpaste', checked: false },
      { id: 18, item: 'Deodorant', checked: false },
      { id: 19, item: 'Shampoo', checked: false },
      { id: 20, item: 'Sunscreen', checked: false }
    ],
    medical: [
      { id: 21, item: 'First Aid Kit', checked: false },
      { id: 22, item: 'Medications', checked: false },
      { id: 23, item: 'Pain Relievers', checked: false },
      { id: 24, item: 'Band-Aids', checked: false },
      { id: 25, item: 'Insect Repellent', checked: false }
    ]
  });

  const [itinerary, setItinerary] = useState({
    destination: '',
    startDate: '',
    endDate: '',
    activities: []
  });

  const [newActivity, setNewActivity] = useState('');
  const [newPackingItems, setNewPackingItems] = useState({
    essentials: '',
    clothing: '',
    electronics: '',
    toiletries: '',
    medical: ''
  });

  const [deleteConfirm, setDeleteConfirm] = useState({
    show: false,
    itemId: null,
    category: null,
    itemName: null
  });

  const [showAddSuccess, setShowAddSuccess] = useState(false);
  const [lastAddedCategory, setLastAddedCategory] = useState(null);

  const [budgetModal, setBudgetModal] = useState({
    show: false,
    category: '',
    amount: 0
  });

  const handleBudgetChange = (category, value) => {
    setBudget(prev => ({
      ...prev,
      [category]: Number(value) || 0
    }));
  };

  const togglePackingItem = (category, id) => {
    setPackingList(prev => ({
      ...prev,
      [category]: prev[category].map(item =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    }));
  };

  const addPackingItem = (e, category) => {
    e.preventDefault();
    if (newPackingItems[category].trim()) {
      setPackingList(prev => ({
        ...prev,
        [category]: [
          { 
            id: Date.now(), 
            item: newPackingItems[category], 
            checked: false 
          },
          ...prev[category],
        ]
      }));
      
      setNewPackingItems(prev => ({
        ...prev,
        [category]: ''
      }));

      setLastAddedCategory(category);
      setShowAddSuccess(true);
      setTimeout(() => {
        setShowAddSuccess(false);
      }, 2000);
    }
  };

  const handleKeyPress = (e, category) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      addPackingItem(e, category);
    }
  };

  const addActivity = (e) => {
    e.preventDefault();
    if (newActivity.trim()) {
      setItinerary(prev => ({
        ...prev,
        activities: [...prev.activities, { 
          id: Date.now(), 
          name: newActivity,
          time: '',
          notes: ''
        }]
      }));
      setNewActivity('');
    }
  };

  const updateActivityTime = (id, time) => {
    setItinerary(prev => ({
      ...prev,
      activities: prev.activities.map(activity =>
        activity.id === id ? { ...activity, time } : activity
      )
    }));
  };

  const updateActivityNotes = (id, notes) => {
    setItinerary(prev => ({
      ...prev,
      activities: prev.activities.map(activity =>
        activity.id === id ? { ...activity, notes } : activity
      )
    }));
  };

  const handleDelete = (category, id, itemName) => {
    setDeleteConfirm({
      show: true,
      itemId: id,
      category: category,
      itemName: itemName
    });
  };

  const confirmDelete = () => {
    const { category, itemId } = deleteConfirm;
    setPackingList(prev => ({
      ...prev,
      [category]: prev[category].filter(i => i.id !== itemId)
    }));
    setDeleteConfirm({ show: false, itemId: null, category: null, itemName: null });
  };

  const cancelDelete = () => {
    setDeleteConfirm({ show: false, itemId: null, category: null, itemName: null });
  };

  const openBudgetModal = (category, amount) => {
    setBudgetModal({
      show: true,
      category,
      amount
    });
  };

  const closeBudgetModal = () => {
    setBudgetModal({
      show: false,
      category: '',
      amount: 0
    });
  };

  return (
    <section className="planner-section">
      <div className="planner-container">
        <div className="planner-header">
          <h2>Travel Planner</h2>
          <p>Plan your perfect trip with our interactive tools</p>
        </div>

        <div className="planner-tabs">
          <button 
            className={`tab ${activeTab === 'itinerary' ? 'active' : ''}`}
            onClick={() => setActiveTab('itinerary')}
          >
            <FaMapMarkedAlt /> Itinerary Builder
          </button>
          <button 
            className={`tab ${activeTab === 'budget' ? 'active' : ''}`}
            onClick={() => setActiveTab('budget')}
          >
            <FaCalculator /> Budget Calculator
          </button>
          <button 
            className={`tab ${activeTab === 'packing' ? 'active' : ''}`}
            onClick={() => setActiveTab('packing')}
          >
            <FaSuitcase /> Packing List
          </button>
        </div>

        <div className="planner-content">
          {activeTab === 'itinerary' && (
            <div className="itinerary-builder">
              <div className="form-group">
                <label>Destination</label>
                <input 
                  type="text" 
                  value={itinerary.destination}
                  onChange={(e) => setItinerary(prev => ({...prev, destination: e.target.value}))}
                  placeholder="Where are you going?"
                />
              </div>
              <div className="date-inputs">
                <div className="form-group">
                  <label>Start Date</label>
                  <input 
                    type="date" 
                    value={itinerary.startDate}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setItinerary(prev => ({...prev, startDate: e.target.value}))}
                  />
                </div>
                <div className="form-group">
                  <label>End Date</label>
                  <input 
                    type="date" 
                    value={itinerary.endDate}
                    min={itinerary.startDate || new Date().toISOString().split('T')[0]}
                    onChange={(e) => setItinerary(prev => ({...prev, endDate: e.target.value}))}
                  />
                </div>
              </div>
              <div className="activities-section">
                <h3>Activities</h3>
                <form onSubmit={addActivity} className="add-activity-form">
                  <input
                    type="text"
                    value={newActivity}
                    onChange={(e) => setNewActivity(e.target.value)}
                    placeholder="Enter activity name"
                  />
                  <button type="submit" className="add-activity">Add Activity</button>
                </form>
                <div className="activities-list">
                  {itinerary.activities.map(activity => (
                    <div key={activity.id} className="activity-item">
                      <div className="activity-header">
                        <h4>{activity.name}</h4>
                        <button 
                          onClick={() => setItinerary(prev => ({
                            ...prev,
                            activities: prev.activities.filter(a => a.id !== activity.id)
                          }))}
                          className="delete-btn"
                        >
                          ×
                        </button>
                      </div>
                      <input
                        type="time"
                        value={activity.time}
                        onChange={(e) => updateActivityTime(activity.id, e.target.value)}
                        placeholder="Time"
                        className="activity-time"
                      />
                      <textarea
                        value={activity.notes}
                        onChange={(e) => updateActivityNotes(activity.id, e.target.value)}
                        placeholder="Add notes..."
                        className="activity-notes"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'budget' && (
            <div className="budget-calculator">
              <div className="budget-header">
                <h3>Budget Calculator</h3>
                <div className="total-budget">
                  Total Budget: <span>${Object.values(budget).reduce((a, b) => a + b, 0).toLocaleString()}</span>
                </div>
              </div>

              <div className="budget-grid">
                {Object.entries(budget).map(([category, amount]) => (
                  <div key={category} className="budget-item" onClick={() => openBudgetModal(category, amount)}>
                    <div className="budget-item-header">
                      <span className="budget-icon">
                        {category === 'flights' ? '✈️' : category === 'hotels' ? '🏨' : category === 'activities' ? '🎯' : 
                         category === 'food' ? '🍴' : category === 'transport' ? '🚗' : category === 'shopping' ? '🛍️' : 
                         category === 'insurance' ? '🛡️' : '📦'}
                      </span>
                      <span className="budget-label">{category.charAt(0).toUpperCase() + category.slice(1)}</span>
                    </div>
                    <div className="budget-amount">${amount.toLocaleString()}</div>
                  </div>
                ))}
              </div>

              <div className="budget-breakdown">
                <div className="breakdown-header">
                  <h4>Budget Breakdown</h4>
                  <button 
                    className="toggle-breakdown"
                    onClick={() => setShowBreakdown(!showBreakdown)}
                  >
                    {showBreakdown ? 'Hide' : 'Show'} Details
                  </button>
                </div>

                {showBreakdown && (
                  <div className="breakdown-chart">
                    {Object.entries(budget).map(([category, amount]) => (
                      <div key={category} className="breakdown-item">
                        <div className="breakdown-label">
                          <span className="icon">{category === 'flights' ? '✈️' : category === 'hotels' ? '🏨' : category === 'activities' ? '🎯' : category === 'food' ? '🍴' : category === 'transport' ? '🚗' : category === 'shopping' ? '🛍️' : category === 'insurance' ? '🛡️' : '📦'}</span>
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </div>
                        <div className="progress-bar">
                          <div 
                            className="progress"
                            style={{ width: `${(amount / Object.values(budget).reduce((a, b) => a + b, 0)) * 100}%` }}
                          ></div>
                        </div>
                        <div className="breakdown-amount">
                          ${amount.toLocaleString()}
                          <span className="percentage">
                            ({((amount / Object.values(budget).reduce((a, b) => a + b, 0)) * 100).toFixed(1)}%)
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'packing' && (
            <div className="packing-list">
              {Object.entries(packingList).map(([category, items]) => (
                <div key={category} className="packing-category">
                  <h3 className="category-title">
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                    <span className="item-count">
                      {items.filter(item => item.checked).length}/{items.length}
                    </span>
                  </h3>
                  <form onSubmit={(e) => addPackingItem(e, category)} className="add-item-form">
                    <input
                      type="text"
                      value={newPackingItems[category]}
                      onChange={(e) => setNewPackingItems(prev => ({
                        ...prev,
                        [category]: e.target.value
                      }))}
                      onKeyPress={(e) => handleKeyPress(e, category)}
                      placeholder={`Add item to ${category}`}
                    />
                    <button type="submit" className="add-item">Add</button>
                  </form>
                  {showAddSuccess && lastAddedCategory === category && (
                    <div className="add-success">
                      Item added successfully!
                    </div>
                  )}
                  <div className="category-items">
                    {items.map(item => (
                      <div 
                        key={item.id} 
                        className={`list-item ${item.checked ? 'checked-item' : ''}`}
                      >
                        <div className="item-content">
                          <input
                            type="checkbox"
                            checked={item.checked}
                            onChange={() => togglePackingItem(category, item.id)}
                          />
                          <span className={item.checked ? 'checked' : ''}>{item.item}</span>
                        </div>
                        <button 
                          onClick={() => handleDelete(category, item.id, item.item)}
                          className="delete-btn"
                          title="Delete item"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {/* Delete Confirmation Modal */}
              {deleteConfirm.show && (
                <div className="delete-modal">
                  <div className="delete-modal-content">
                    <h4>Delete Item</h4>
                    <p>Are you sure you want to delete "{deleteConfirm.itemName}"?</p>
                    <div className="delete-modal-buttons">
                      <button onClick={cancelDelete} className="cancel-delete">
                        Cancel
                      </button>
                      <button onClick={confirmDelete} className="confirm-delete">
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {budgetModal.show && (
        <div className="budget-modal">
          <div className="budget-modal-content">
            <h3>Update {budgetModal.category.charAt(0).toUpperCase() + budgetModal.category.slice(1)} Budget</h3>
            <div className="budget-input-container">
              <span className="currency-symbol">$</span>
              <input
                type="number"
                value={budgetModal.amount}
                onChange={(e) => setBudgetModal(prev => ({
                  ...prev,
                  amount: Number(e.target.value)
                }))}
                autoFocus
              />
            </div>
            <div className="budget-modal-buttons">
              <button 
                className="save-btn"
                onClick={() => {
                  handleBudgetChange(budgetModal.category, budgetModal.amount);
                  closeBudgetModal();
                }}
              >
                Save
              </button>
              <button 
                className="cancel-btn"
                onClick={closeBudgetModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Planner; 