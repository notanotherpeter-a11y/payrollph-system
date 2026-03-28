# PayrollPH - Philippine Payroll System

A modern, web-based payroll system designed specifically for Philippine businesses, with full compliance for SSS, PhilHealth, Pag-IBIG, and BIR tax calculations.

## 🚀 Features

### Core Functionality
- **Employee Management**: Add, edit, and manage employee records
- **Timesheet Tracking**: Track regular hours, overtime, holidays, and leave
- **Automated Calculations**: Philippine-compliant deductions and taxes
- **Payslip Generation**: Professional payslips for distribution
- **Dashboard Analytics**: Real-time payroll insights

### Philippine Compliance
- **SSS Contributions**: Updated 2026 contribution tables
- **PhilHealth**: 4.5% premium rate calculations
- **Pag-IBIG Fund**: Tiered contribution rates
- **BIR Withholding Tax**: TRAIN Law tax tables
- **13th Month Pay**: Calculation support (coming soon)

## 💻 Technology

- **Frontend**: Pure HTML5, CSS3, JavaScript (no dependencies!)
- **Storage**: LocalStorage for data persistence
- **Design**: Modern, responsive UI with Inter font
- **Architecture**: Single-page application (SPA)

## 🎯 Quick Start

### Option 1: Local Server
```bash
cd philippine-payroll
python3 -m http.server 8080
# Visit http://localhost:8080
```

### Option 2: Deploy to Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Option 3: Static Hosting
Upload all files to any static host (Netlify, GitHub Pages, etc.)

## 📊 Usage Guide

### 1. Add Employees
- Navigate to Employees tab
- Click "Add Employee"
- Fill in employee details including government IDs
- Save employee record

### 2. Enter Timesheet
- Go to Timesheet tab
- Enter hours worked for each employee
- System automatically calculates overtime rates

### 3. Run Payroll
- Click "Run Payroll" from Dashboard
- Review employee data
- System calculates all deductions automatically
- Generate and download payslips

## 🧮 Calculation Logic

### SSS Contributions
- Uses official SSS contribution table
- Automatic bracket determination
- Employee/Employer split calculations

### PhilHealth
- 4.5% of monthly salary (split 50/50)
- Minimum: ₱225/month
- Maximum: ₱2,250/month

### Pag-IBIG
- 1% for salaries ≤ ₱1,500
- 2% for salaries > ₱1,500
- Maximum: ₱200/month

### Withholding Tax
- TRAIN Law implementation
- Progressive tax rates
- Automatic tax bracket calculation

## 💰 Business Potential

### Target Market
- Small to medium Philippine businesses (5-50 employees)
- Startups and growing companies
- Businesses seeking affordable payroll solutions

### Pricing Strategy
- **Basic**: ₱999/month (up to 10 employees)
- **Professional**: ₱2,499/month (up to 50 employees)
- **Enterprise**: ₱4,999/month (unlimited employees)

### Revenue Projections
- 100 clients = ₱99,900 - ₱499,900/month
- Perfect for SaaS business model
- Low operational costs, high margins

## 🔧 Customization

### Adding Features
1. Edit `app.js` for logic changes
2. Modify `styles.css` for design updates
3. Update `index.html` for new sections

### Integration Options
- Export to Excel/CSV
- Email integration for payslips
- Bank file generation
- Accounting software sync

## 📱 Mobile Support

Fully responsive design works on:
- Desktop computers
- Tablets
- Mobile phones
- Any modern browser

## 🔒 Security Notes

Current version uses browser LocalStorage. For production:
- Add user authentication
- Implement server-side storage
- Add data encryption
- Regular backups

## 🚀 Future Enhancements

- [ ] PDF payslip generation
- [ ] Multi-company support
- [ ] Leave management module
- [ ] Loan tracking
- [ ] 13th month automation
- [ ] Government report generation
- [ ] Mobile app version

## 📞 Support

For custom features or enterprise deployment:
- Contact: Gene Carlo Gallardo
- Portfolio: gene-carlo.com
- Specialization: Philippine business solutions

## 📜 License

This is a demo version. For commercial use, please contact for licensing.

---

**Built with ❤️ for Philippine businesses**