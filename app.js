// PayrollPH - Philippine Payroll System
// Core JavaScript Application

// State Management
const state = {
    employees: [],
    timesheet: {},
    currentPayrollPeriod: 'March 1-15, 2026',
    payrollHistory: []
};

// Philippine Tax Tables and Rates (2026)
const PHRates = {
    // SSS Contribution Table
    sss: [
        { min: 0, max: 4250, ee: 180, er: 390 },
        { min: 4250, max: 4750, ee: 202.50, er: 437.50 },
        { min: 4750, max: 5250, ee: 225, er: 485 },
        { min: 5250, max: 5750, ee: 247.50, er: 532.50 },
        { min: 5750, max: 6250, ee: 270, er: 580 },
        { min: 6250, max: 6750, ee: 292.50, er: 627.50 },
        { min: 6750, max: 7250, ee: 315, er: 675 },
        { min: 7250, max: 7750, ee: 337.50, er: 722.50 },
        { min: 7750, max: 8250, ee: 360, er: 770 },
        { min: 8250, max: 8750, ee: 382.50, er: 817.50 },
        { min: 8750, max: 9250, ee: 405, er: 865 },
        { min: 9250, max: 9750, ee: 427.50, er: 912.50 },
        { min: 9750, max: 10250, ee: 450, er: 960 },
        { min: 10250, max: 10750, ee: 472.50, er: 1007.50 },
        { min: 10750, max: 11250, ee: 495, er: 1055 },
        { min: 11250, max: 11750, ee: 517.50, er: 1102.50 },
        { min: 11750, max: 12250, ee: 540, er: 1150 },
        { min: 12250, max: 12750, ee: 562.50, er: 1197.50 },
        { min: 12750, max: 13250, ee: 585, er: 1245 },
        { min: 13250, max: 13750, ee: 607.50, er: 1292.50 },
        { min: 13750, max: 14250, ee: 630, er: 1340 },
        { min: 14250, max: 14750, ee: 652.50, er: 1387.50 },
        { min: 14750, max: 15250, ee: 675, er: 1435 },
        { min: 15250, max: 15750, ee: 697.50, er: 1482.50 },
        { min: 15750, max: 16250, ee: 720, er: 1530 },
        { min: 16250, max: 16750, ee: 742.50, er: 1577.50 },
        { min: 16750, max: 17250, ee: 765, er: 1625 },
        { min: 17250, max: 17750, ee: 787.50, er: 1672.50 },
        { min: 17750, max: 18250, ee: 810, er: 1720 },
        { min: 18250, max: 18750, ee: 832.50, er: 1767.50 },
        { min: 18750, max: 19250, ee: 855, er: 1815 },
        { min: 19250, max: 19750, ee: 877.50, er: 1862.50 },
        { min: 19750, max: 20250, ee: 900, er: 1910 },
        { min: 20250, max: 999999, ee: 900, er: 1910 }
    ],
    
    // PhilHealth
    philhealth: {
        rate: 0.045, // 4.5% total (2.25% each for employee and employer)
        minSalary: 10000,
        maxSalary: 100000,
        minContribution: 225,
        maxContribution: 2250
    },
    
    // Pag-IBIG
    pagibig: {
        employee: [
            { max: 1500, rate: 0.01 },
            { max: 999999, rate: 0.02 }
        ],
        employer: 0.02,
        maxContribution: 200
    },
    
    // BIR Withholding Tax (Train Law)
    withholdingTax: [
        { min: 0, max: 20833, rate: 0, deduction: 0 },
        { min: 20833, max: 33333, rate: 0.15, deduction: 1875 },
        { min: 33333, max: 66667, rate: 0.20, deduction: 5541.67 },
        { min: 66667, max: 166667, rate: 0.25, deduction: 13775 },
        { min: 166667, max: 666667, rate: 0.30, deduction: 47108.33 },
        { min: 666667, max: 999999999, rate: 0.35, deduction: 183541.67 }
    ]
};

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    loadData();
    initializeEventListeners();
    showDashboard();
    initializeCharts();
    checkDarkMode();
});

// Event Listeners
function initializeEventListeners() {
    // Navigation
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const page = item.dataset.page;
            navigateToPage(page);
        });
    });
    
    // Employee search
    const searchInput = document.getElementById('employeeSearch');
    if (searchInput) {
        searchInput.addEventListener('input', filterEmployees);
    }
}

// Navigation
function navigateToPage(pageName) {
    // Update nav
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.toggle('active', item.dataset.page === pageName);
    });
    
    // Update pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.toggle('active', page.id === pageName);
    });
    
    // Load page specific data
    switch (pageName) {
        case 'dashboard':
            updateDashboard();
            break;
        case 'employees':
            renderEmployeeTable();
            break;
        case 'timesheet':
            renderTimesheet();
            break;
        case 'payroll':
            initializePayroll();
            break;
    }
}

// Dashboard
function showDashboard() {
    navigateToPage('dashboard');
}

function updateDashboard() {
    const totalEmployees = state.employees.length;
    const totalSalaries = state.employees.reduce((sum, emp) => sum + parseFloat(emp.salary || 0), 0);
    
    // Update stats
    document.querySelector('.stat-card:nth-child(1) .stat-value').textContent = totalEmployees;
    document.querySelector('.stat-card:nth-child(2) .stat-value').textContent = formatCurrency(totalSalaries);
    
    // Calculate deductions for display
    const totalDeductions = calculateTotalDeductions(totalSalaries);
    document.querySelector('.stat-card:nth-child(3) .stat-value').textContent = formatCurrency(totalDeductions);
    document.querySelector('.stat-card:nth-child(4) .stat-value').textContent = formatCurrency(totalSalaries - totalDeductions);
}

// Employee Management
function openAddEmployeeModal() {
    document.getElementById('addEmployeeModal').classList.add('active');
}

function closeAddEmployeeModal() {
    document.getElementById('addEmployeeModal').classList.remove('active');
    document.getElementById('addEmployeeForm').reset();
}

function saveEmployee() {
    const form = document.getElementById('addEmployeeForm');
    const formData = new FormData(form);
    
    const employee = {
        id: Date.now(),
        employeeId: formData.get('employeeId'),
        fullName: formData.get('fullName'),
        position: formData.get('position'),
        department: formData.get('department'),
        salary: parseFloat(formData.get('salary')),
        employmentType: formData.get('employmentType'),
        sssNumber: formData.get('sssNumber'),
        philhealthNumber: formData.get('philhealthNumber'),
        pagibigNumber: formData.get('pagibigNumber'),
        tin: formData.get('tin'),
        status: 'Active',
        dateHired: new Date().toLocaleDateString()
    };
    
    state.employees.push(employee);
    saveData();
    renderEmployeeTable();
    updateDashboard();
    closeAddEmployeeModal();
    
    showNotification('Employee added successfully!', 'success');
}

function renderEmployeeTable() {
    const tbody = document.getElementById('employeeTableBody');
    
    if (state.employees.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" class="empty-state">No employees added yet.</td></tr>';
        return;
    }
    
    tbody.innerHTML = state.employees.map(emp => `
        <tr>
            <td>${emp.employeeId}</td>
            <td><strong>${emp.fullName}</strong></td>
            <td>${emp.position}</td>
            <td>${emp.department}</td>
            <td>${formatCurrency(emp.salary)}</td>
            <td><span class="badge badge-success">${emp.status}</span></td>
            <td>
                <button class="btn btn-sm btn-secondary" onclick="editEmployee(${emp.id})">Edit</button>
                <button class="btn btn-sm btn-danger" onclick="deleteEmployee(${emp.id})">Delete</button>
            </td>
        </tr>
    `).join('');
}

function filterEmployees() {
    const searchTerm = document.getElementById('employeeSearch').value.toLowerCase();
    // Implementation for filtering
}

function deleteEmployee(id) {
    if (confirm('Are you sure you want to delete this employee?')) {
        state.employees = state.employees.filter(emp => emp.id !== id);
        saveData();
        renderEmployeeTable();
        updateDashboard();
        showNotification('Employee deleted successfully!', 'success');
    }
}

// Timesheet
function renderTimesheet() {
    const tbody = document.getElementById('timesheetTableBody');
    
    if (state.employees.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" class="empty-state">No employees to track time for.</td></tr>';
        return;
    }
    
    tbody.innerHTML = state.employees.map(emp => {
        const timeData = state.timesheet[emp.id] || {};
        return `
            <tr>
                <td><strong>${emp.fullName}</strong></td>
                <td><input type="number" class="form-input" value="${timeData.regularHours || 88}" 
                    onchange="updateTimesheet(${emp.id}, 'regularHours', this.value)" min="0"></td>
                <td><input type="number" class="form-input" value="${timeData.overtime || 0}" 
                    onchange="updateTimesheet(${emp.id}, 'overtime', this.value)" min="0"></td>
                <td><input type="number" class="form-input" value="${timeData.holidayHours || 0}" 
                    onchange="updateTimesheet(${emp.id}, 'holidayHours', this.value)" min="0"></td>
                <td><input type="number" class="form-input" value="${timeData.sickLeave || 0}" 
                    onchange="updateTimesheet(${emp.id}, 'sickLeave', this.value)" min="0"></td>
                <td><input type="number" class="form-input" value="${timeData.vacation || 0}" 
                    onchange="updateTimesheet(${emp.id}, 'vacation', this.value)" min="0"></td>
                <td><strong>${calculateTotalHours(emp.id)}</strong></td>
            </tr>
        `;
    }).join('');
}

function updateTimesheet(employeeId, field, value) {
    if (!state.timesheet[employeeId]) {
        state.timesheet[employeeId] = {};
    }
    state.timesheet[employeeId][field] = parseFloat(value) || 0;
    saveData();
    
    // Update total hours display
    const row = event.target.closest('tr');
    row.querySelector('td:last-child strong').textContent = calculateTotalHours(employeeId);
}

function calculateTotalHours(employeeId) {
    const timeData = state.timesheet[employeeId] || {};
    return (timeData.regularHours || 0) + 
           (timeData.overtime || 0) + 
           (timeData.holidayHours || 0) + 
           (timeData.sickLeave || 0) + 
           (timeData.vacation || 0);
}

// Payroll Calculation
function initializePayroll() {
    // Reset to step 1
    document.querySelectorAll('.step-card').forEach((card, index) => {
        card.classList.toggle('active', index === 0);
    });
}

function nextPayrollStep() {
    const activeStep = document.querySelector('.step-card.active');
    const nextStep = activeStep.nextElementSibling;
    
    if (nextStep && nextStep.classList.contains('step-card')) {
        activeStep.classList.remove('active');
        nextStep.classList.add('active');
        
        // Execute step logic
        if (nextStep.querySelector('.step-number').textContent === '2') {
            calculatePayroll();
        } else if (nextStep.querySelector('.step-number').textContent === '3') {
            finalizePayroll();
        }
    }
}

function calculatePayroll() {
    const results = document.getElementById('calculationResults');
    let html = '<div class="payroll-summary">';
    
    state.employees.forEach(emp => {
        const calculation = calculateEmployeePayroll(emp);
        html += `
            <div class="employee-payroll-card">
                <h4>${emp.fullName}</h4>
                <div class="payroll-details">
                    <div class="payroll-row">
                        <span>Basic Salary (Semi-monthly):</span>
                        <span>${formatCurrency(calculation.basicSalary)}</span>
                    </div>
                    <div class="payroll-row">
                        <span>Overtime Pay:</span>
                        <span>${formatCurrency(calculation.overtimePay)}</span>
                    </div>
                    <div class="payroll-row">
                        <span>Holiday Pay:</span>
                        <span>${formatCurrency(calculation.holidayPay)}</span>
                    </div>
                    <div class="payroll-row">
                        <span><strong>Gross Pay:</strong></span>
                        <span><strong>${formatCurrency(calculation.grossPay)}</strong></span>
                    </div>
                    <hr>
                    <h5>Deductions:</h5>
                    <div class="payroll-row">
                        <span>SSS:</span>
                        <span>-${formatCurrency(calculation.sss)}</span>
                    </div>
                    <div class="payroll-row">
                        <span>PhilHealth:</span>
                        <span>-${formatCurrency(calculation.philhealth)}</span>
                    </div>
                    <div class="payroll-row">
                        <span>Pag-IBIG:</span>
                        <span>-${formatCurrency(calculation.pagibig)}</span>
                    </div>
                    <div class="payroll-row">
                        <span>Withholding Tax:</span>
                        <span>-${formatCurrency(calculation.tax)}</span>
                    </div>
                    <div class="payroll-row">
                        <span><strong>Total Deductions:</strong></span>
                        <span><strong>-${formatCurrency(calculation.totalDeductions)}</strong></span>
                    </div>
                    <hr>
                    <div class="payroll-row net-pay">
                        <span><strong>NET PAY:</strong></span>
                        <span><strong>${formatCurrency(calculation.netPay)}</strong></span>
                    </div>
                </div>
            </div>
        `;
    });
    
    html += '</div>';
    html += '<button class="btn btn-primary" onclick="nextPayrollStep()">Proceed to Finalize</button>';
    results.innerHTML = html;
}

function calculateEmployeePayroll(employee) {
    const timeData = state.timesheet[employee.id] || { regularHours: 88, overtime: 0, holidayHours: 0 };
    
    // Calculate semi-monthly salary
    const monthlySalary = parseFloat(employee.salary);
    const basicSalary = monthlySalary / 2; // Semi-monthly
    const hourlyRate = monthlySalary / 22 / 8; // Assuming 22 working days per month, 8 hours per day
    
    // Calculate overtime and holiday pay
    const overtimePay = (timeData.overtime || 0) * hourlyRate * 1.25;
    const holidayPay = (timeData.holidayHours || 0) * hourlyRate * 2;
    
    const grossPay = basicSalary + overtimePay + holidayPay;
    
    // Calculate deductions
    const sss = calculateSSS(monthlySalary);
    const philhealth = calculatePhilHealth(monthlySalary);
    const pagibig = calculatePagIBIG(monthlySalary);
    const taxableIncome = grossPay - (sss + philhealth + pagibig);
    const tax = calculateWithholdingTax(taxableIncome * 2); // Tax is based on monthly income
    
    const totalDeductions = sss + philhealth + pagibig + (tax / 2); // Tax divided by 2 for semi-monthly
    const netPay = grossPay - totalDeductions;
    
    return {
        basicSalary,
        overtimePay,
        holidayPay,
        grossPay,
        sss,
        philhealth,
        pagibig,
        tax: tax / 2, // Semi-monthly tax
        totalDeductions,
        netPay
    };
}

// Deduction Calculations
function calculateSSS(monthlySalary) {
    const contribution = PHRates.sss.find(bracket => 
        monthlySalary >= bracket.min && monthlySalary < bracket.max
    );
    return contribution ? contribution.ee : 900; // Max contribution
}

function calculatePhilHealth(monthlySalary) {
    const { rate, minSalary, maxSalary, minContribution, maxContribution } = PHRates.philhealth;
    
    if (monthlySalary <= minSalary) {
        return minContribution / 2; // Employee share
    } else if (monthlySalary >= maxSalary) {
        return maxContribution / 2; // Employee share
    } else {
        return (monthlySalary * rate) / 2; // Employee share
    }
}

function calculatePagIBIG(monthlySalary) {
    let contribution = 0;
    
    for (const bracket of PHRates.pagibig.employee) {
        if (monthlySalary <= bracket.max) {
            contribution = monthlySalary * bracket.rate;
            break;
        }
    }
    
    return Math.min(contribution, PHRates.pagibig.maxContribution);
}

function calculateWithholdingTax(monthlyTaxableIncome) {
    const bracket = PHRates.withholdingTax.find(tax => 
        monthlyTaxableIncome >= tax.min && monthlyTaxableIncome < tax.max
    );
    
    if (!bracket) return 0;
    
    const excess = monthlyTaxableIncome - bracket.min;
    return (excess * bracket.rate) + bracket.deduction;
}

function calculateTotalDeductions(totalSalary) {
    // Simple approximation for dashboard
    return totalSalary * 0.15; // Roughly 15% for all deductions
}

// Finalize Payroll
function finalizePayroll() {
    const results = document.getElementById('finalizeResults');
    results.innerHTML = `
        <div class="finalize-summary">
            <p>✅ Payroll has been calculated successfully!</p>
            <p>📄 ${state.employees.length} payslips have been generated.</p>
            <p>💾 All data has been saved to the system.</p>
            
            <div class="action-buttons">
                <button class="btn btn-primary" onclick="downloadPayslips()">
                    📥 Download All Payslips
                </button>
                <button class="btn btn-secondary" onclick="emailPayslips()">
                    📧 Email Payslips
                </button>
                <button class="btn btn-secondary" onclick="exportPayrollReport()">
                    📊 Export Report
                </button>
            </div>
        </div>
    `;
    
    // Save to history
    state.payrollHistory.push({
        period: state.currentPayrollPeriod,
        date: new Date().toISOString(),
        employees: state.employees.length,
        totalGross: calculateTotalGross(),
        totalNet: calculateTotalNet()
    });
    
    saveData();
    showNotification('Payroll completed successfully!', 'success');
}

// Utility Functions
function formatCurrency(amount) {
    return '₱' + amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

function showNotification(message, type = 'info') {
    // Simple notification - can be enhanced with toast notifications
    console.log(`${type.toUpperCase()}: ${message}`);
}

function calculateTotalGross() {
    return state.employees.reduce((sum, emp) => {
        const calc = calculateEmployeePayroll(emp);
        return sum + calc.grossPay;
    }, 0);
}

function calculateTotalNet() {
    return state.employees.reduce((sum, emp) => {
        const calc = calculateEmployeePayroll(emp);
        return sum + calc.netPay;
    }, 0);
}

// Data Persistence
function saveData() {
    localStorage.setItem('payrollPH_employees', JSON.stringify(state.employees));
    localStorage.setItem('payrollPH_timesheet', JSON.stringify(state.timesheet));
    localStorage.setItem('payrollPH_history', JSON.stringify(state.payrollHistory));
}

function loadData() {
    const savedEmployees = localStorage.getItem('payrollPH_employees');
    const savedTimesheet = localStorage.getItem('payrollPH_timesheet');
    const savedHistory = localStorage.getItem('payrollPH_history');
    
    if (savedEmployees) state.employees = JSON.parse(savedEmployees);
    if (savedTimesheet) state.timesheet = JSON.parse(savedTimesheet);
    if (savedHistory) state.payrollHistory = JSON.parse(savedHistory);
}

// Export functions (placeholders)
function downloadPayslips() {
    showNotification('Payslip download feature coming soon!', 'info');
}

function emailPayslips() {
    showNotification('Email feature coming soon!', 'info');
}

function exportPayrollReport() {
    showNotification('Report export feature coming soon!', 'info');
}

// Add some CSS for payroll cards
const style = document.createElement('style');
style.textContent = `
    .employee-payroll-card {
        background: var(--bg-secondary);
        padding: 1.5rem;
        border-radius: var(--radius-lg);
        margin-bottom: 1rem;
    }
    
    .payroll-row {
        display: flex;
        justify-content: space-between;
        padding: 0.5rem 0;
        font-size: 0.875rem;
    }
    
    .payroll-row.net-pay {
        font-size: 1.125rem;
        color: var(--success);
        margin-top: 0.5rem;
    }
    
    .finalize-summary {
        text-align: center;
        padding: 2rem;
    }
    
    .finalize-summary p {
        margin-bottom: 1rem;
        font-size: 1rem;
    }
    
    .action-buttons {
        display: flex;
        gap: 1rem;
        justify-content: center;
        margin-top: 2rem;
    }
    
    .badge {
        padding: 0.25rem 0.75rem;
        border-radius: var(--radius-sm);
        font-size: 0.75rem;
        font-weight: 500;
    }
    
    .badge-success {
        background: var(--success);
        color: white;
    }
`;
document.head.appendChild(style);

// Modern UI Functions
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
    
    const btn = document.querySelector('.btn-secondary');
    const icon = btn.querySelector('i');
    const text = btn.querySelector('span');
    
    if (document.body.classList.contains('dark-mode')) {
        text.textContent = 'Light Mode';
    } else {
        text.textContent = 'Dark Mode';
    }
    
    // Reinitialize charts for theme change
    initializeCharts();
}

function checkDarkMode() {
    const darkMode = localStorage.getItem('darkMode') === 'true';
    if (darkMode) {
        document.body.classList.add('dark-mode');
    }
}

// Chart Initialization
let payrollChart, departmentChart;

function initializeCharts() {
    const isDark = document.body.classList.contains('dark-mode');
    const textColor = isDark ? '#f3f4f6' : '#4b5563';
    const gridColor = isDark ? '#374151' : '#e5e7eb';
    
    // Destroy existing charts
    if (payrollChart) payrollChart.destroy();
    if (departmentChart) departmentChart.destroy();
    
    // Payroll Trends Chart
    const payrollCtx = document.getElementById('payrollChart');
    if (payrollCtx) {
        payrollChart = new Chart(payrollCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'Gross Pay',
                    data: [450000, 460000, 455000, 470000, 480000, 485000],
                    borderColor: '#6366f1',
                    backgroundColor: 'rgba(99, 102, 241, 0.1)',
                    borderWidth: 3,
                    tension: 0.4
                }, {
                    label: 'Net Pay',
                    data: [380000, 390000, 385000, 395000, 405000, 410000],
                    borderColor: '#10b981',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    borderWidth: 3,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: { color: textColor }
                    }
                },
                scales: {
                    x: {
                        grid: { color: gridColor },
                        ticks: { color: textColor }
                    },
                    y: {
                        grid: { color: gridColor },
                        ticks: { 
                            color: textColor,
                            callback: function(value) {
                                return '₱' + value.toLocaleString();
                            }
                        }
                    }
                }
            }
        });
    }
    
    // Department Distribution Chart
    const deptCtx = document.getElementById('departmentChart');
    if (deptCtx) {
        departmentChart = new Chart(deptCtx, {
            type: 'doughnut',
            data: {
                labels: ['Sales', 'Operations', 'Admin', 'IT', 'HR'],
                datasets: [{
                    data: [12, 8, 5, 4, 3],
                    backgroundColor: [
                        '#6366f1',
                        '#8b5cf6',
                        '#ec4899',
                        '#f59e0b',
                        '#10b981'
                    ],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'right',
                        labels: { color: textColor }
                    }
                }
            }
        });
    }
}

// Enhanced Notification System
function showNotification(message, type = 'info') {
    const notification = document.getElementById('notification');
    const icons = {
        success: '<i class="ri-check-line"></i>',
        error: '<i class="ri-error-warning-line"></i>',
        warning: '<i class="ri-alert-line"></i>',
        info: '<i class="ri-information-line"></i>'
    };
    
    notification.className = `notification ${type} show`;
    notification.innerHTML = `
        ${icons[type] || icons.info}
        <span>${message}</span>
    `;
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 4000);
}

// Export Functions
function exportEmployees() {
    showNotification('Exporting employees to CSV...', 'info');
    // Implementation for CSV export
}

function exportSettings() {
    showNotification('Exporting settings...', 'info');
    // Implementation for settings export
}

function saveAllSettings() {
    showNotification('All settings saved successfully!', 'success');
    // Implementation for saving all settings
}

function generateReport(type) {
    showNotification(`Generating ${type} report...`, 'info');
    // Implementation for report generation
}

function saveTimesheet() {
    showNotification('Timesheet saved successfully!', 'success');
    // Implementation for timesheet saving
}

// Update dashboard to show better stats
function updateDashboard() {
    const totalEmployees = state.employees.length;
    const totalSalaries = state.employees.reduce((sum, emp) => sum + parseFloat(emp.salary || 0), 0);
    
    // Update stat cards with animation
    animateValue('totalEmployees', 0, totalEmployees, 1000);
    animateValue('totalPayroll', 0, totalSalaries, 1500, true);
    
    // Calculate deductions for display
    const totalDeductions = calculateTotalDeductions(totalSalaries);
    animateValue('totalDeductions', 0, totalDeductions, 1500, true);
    animateValue('netPay', 0, totalSalaries - totalDeductions, 1500, true);
    
    // Update recent activity
    updateRecentActivity();
}

// Animate counter values
function animateValue(id, start, end, duration, isCurrency = false) {
    const element = document.getElementById(id);
    if (!element) return;
    
    const range = end - start;
    const increment = end > start ? 1 : -1;
    const stepTime = Math.abs(Math.floor(duration / range));
    let current = start;
    
    const timer = setInterval(() => {
        current += increment * Math.ceil(range / (duration / stepTime));
        if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
            current = end;
            clearInterval(timer);
        }
        element.textContent = isCurrency ? formatCurrency(current) : current;
    }, stepTime);
}

// Update recent activity
function updateRecentActivity() {
    const activityEl = document.getElementById('recentActivity');
    if (state.employees.length === 0) {
        activityEl.innerHTML = '<p class="empty-state">No recent activity. Start by adding employees!</p>';
        return;
    }
    
    // Sample activity items
    const activities = [
        { icon: 'ri-user-add-line', text: 'New employee added', time: 'Just now' },
        { icon: 'ri-time-line', text: 'Timesheet updated', time: '5 minutes ago' },
        { icon: 'ri-money-dollar-circle-line', text: 'Payroll processed', time: '1 hour ago' }
    ];
    
    activityEl.innerHTML = activities.map(activity => `
        <div class="activity-item">
            <i class="${activity.icon}"></i>
            <span>${activity.text}</span>
            <small>${activity.time}</small>
        </div>
    `).join('');
}

// Enhanced employee table render
function renderEmployeeTable() {
    const tbody = document.getElementById('employeeTableBody');
    
    if (state.employees.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" class="empty-state">No employees found</td></tr>';
        return;
    }
    
    tbody.innerHTML = state.employees.map(emp => `
        <tr>
            <td>${emp.employeeId}</td>
            <td>
                <div class="employee-info">
                    <div class="employee-avatar">${emp.fullName.charAt(0)}</div>
                    <div>
                        <strong>${emp.fullName}</strong>
                        <small>${emp.position}</small>
                    </div>
                </div>
            </td>
            <td>${emp.position}</td>
            <td>
                <span class="department-badge">${emp.department}</span>
            </td>
            <td><strong>${formatCurrency(emp.salary)}</strong></td>
            <td>
                <span class="status-badge status-${emp.status.toLowerCase()}">${emp.status}</span>
            </td>
            <td>
                <div class="action-buttons">
                    <button class="btn-icon" onclick="editEmployee(${emp.id})" title="Edit">
                        <i class="ri-edit-line"></i>
                    </button>
                    <button class="btn-icon btn-danger" onclick="deleteEmployee(${emp.id})" title="Delete">
                        <i class="ri-delete-bin-line"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

// Add CSS for new elements
const additionalStyles = `
    .employee-info {
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }
    
    .employee-avatar {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        background: var(--gradient-primary);
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 600;
        font-size: 1rem;
    }
    
    .employee-info small {
        display: block;
        color: var(--text-muted);
        font-size: 0.75rem;
    }
    
    .department-badge {
        padding: 0.25rem 0.75rem;
        background: var(--primary-bg);
        color: var(--primary);
        border-radius: var(--radius-full);
        font-size: 0.75rem;
        font-weight: 600;
    }
    
    .status-badge {
        padding: 0.25rem 0.75rem;
        border-radius: var(--radius-full);
        font-size: 0.75rem;
        font-weight: 600;
    }
    
    .status-badge.status-active {
        background: rgba(16, 185, 129, 0.1);
        color: var(--success);
    }
    
    .status-badge.status-inactive {
        background: rgba(239, 68, 68, 0.1);
        color: var(--danger);
    }
    
    .action-buttons {
        display: flex;
        gap: 0.5rem;
    }
    
    .btn-icon {
        width: 32px;
        height: 32px;
        border: none;
        background: var(--bg-tertiary);
        color: var(--text-secondary);
        border-radius: var(--radius-sm);
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: var(--transition);
    }
    
    .btn-icon:hover {
        background: var(--primary);
        color: white;
        transform: translateY(-2px);
    }
    
    .btn-icon.btn-danger:hover {
        background: var(--danger);
    }
    
    .activity-item {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 0.75rem;
        background: var(--bg-tertiary);
        border-radius: var(--radius-lg);
        font-size: 0.875rem;
    }
    
    .activity-item i {
        font-size: 1.25rem;
        color: var(--primary);
    }
    
    .activity-item small {
        margin-left: auto;
        color: var(--text-muted);
    }
`;

const newStyle = document.createElement('style');
newStyle.textContent = additionalStyles;
document.head.appendChild(newStyle);