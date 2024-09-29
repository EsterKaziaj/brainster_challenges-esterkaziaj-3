// klasa per shpenzimet
class Expense {
    constructor(description, amount, date, category) {
      this.description = description; 
      this.amount = amount; 
      this.date = date; 
      this.category = category; 
    }
  }
  
  // Merr shpenzimet nga localStorage or  krijo  list te re nqs eshte bosh
  let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
  let editIndex = -1; // Indeksi pr  redaktimin e shpenzimit
  
  document.addEventListener('DOMContentLoaded', () => {
    displayExpenses(); // Shfaq shpenzimet kur dokumenti eshte ngarkuar
  });
  
  // Shto ose ndrysho nje shpenzim
  function addOrUpdateExpense() {
    const description = document.getElementById('description').value;
    const amount = document.getElementById('amount').value;
    const date = document.getElementById('date').value;
    const category = document.getElementById('category').value;
  
    // Kontrolli per te gjitha fushat nqs jane plotesuar 
    if (description === '' || amount === '' || date === '' || category === '') {
      alert('Ju lutemi plotesoni te gjitha fushat.');
      return;
    }
  
    if (editIndex >= 0) {
      expenses[editIndex] = new Expense(description, amount, date, category); // update shpenzimin ekzistues
      editIndex = -1;
    } else {
      expenses.push(new Expense(description, amount, date, category)); // Shto nje shpenzim te ri
    }
  
    localStorage.setItem('expenses', JSON.stringify(expenses)); // Ruaj shpenzimet in localStorage
    displayExpenses(); // Rifresko listen e shpenzimeve
    clearForm(); //clear it 
  }
  
  // Pastro fushat 
  function clearForm() {
    document.getElementById('description').value = '';
    document.getElementById('amount').value = '';
    document.getElementById('date').value = '';
    document.getElementById('category').value = 'Food';
    document.getElementById('editIndex').value = '';
  }
  
  // Shfaq shpenzimet ne tabele
  function displayExpenses() {
    const expensesList = document.getElementById('expensesList');
    expensesList.innerHTML = '';
  
    expenses.forEach((expense, index) => {
      expensesList.innerHTML += `
        <tr>
          <td>${expense.description}</td>
          <td>$${expense.amount}</td>
          <td>${expense.date}</td>
          <td>${expense.category}</td>
          <td>
            <button class="btn btn-info btn-sm" onclick="editExpense(${index})">Edit</button>
            <button class="btn btn-danger btn-sm" onclick="deleteExpense(${index})">Delete</button>
          </td>
        </tr>
      `;
    });
  }
  
  // editt nje shpenzim
  function editExpense(index) {
    const expense = expenses[index];
    document.getElementById('description').value = expense.description;
    document.getElementById('amount').value = expense.amount;
    document.getElementById('date').value = expense.date;
    document.getElementById('category').value = expense.category;
    document.getElementById('editIndex').value = index;
    editIndex = index;
  }
  
  // Fshij nje shpenzim
  function deleteExpense(index) {
    if (confirm('A jeni i sigurt qe doni te fshini kete shpenzim?')) {
      expenses.splice(index, 1); // Hiq shpenzimin nga lista
      localStorage.setItem('expenses', JSON.stringify(expenses)); // Ruaj ndryshimet in localStorage
      displayExpenses(); // Rifresko listen e shpenzimeve
    }
  }
  
  // Rendit shpenzimet sipas shumes
  function sortExpenses(key, order) {
    expenses.sort((a, b) => {
      if (key === 'amount') {
        return order === 'asc' ? a.amount - b.amount : b.amount - a.amount;
      }
    });
    displayExpenses(); // Rifresko listen
  }
  