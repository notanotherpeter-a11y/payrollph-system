# PayrollPH - Philippine Payroll System

<p align="center">
  <img src="https://img.shields.io/badge/Version-2.0-blue.svg" />
  <img src="https://img.shields.io/badge/License-MIT-green.svg" />
  <img src="https://img.shields.io/badge/Status-Live-success.svg" />
</p>

A modern, web-based payroll system designed specifically for Philippine businesses, with full compliance for SSS, PhilHealth, Pag-IBIG, and BIR tax calculations.

## 🌐 Live Demo

**Try it now:** [https://payrollph.vercel.app](https://payrollph.vercel.app)

## 🚀 Features

### Core Functionality
- **Employee Management**: Add, edit, and manage employee records
- **Timesheet Tracking**: Track regular hours, overtime, holidays, and leave
- **Automated Calculations**: Philippine-compliant deductions and taxes
- **Payslip Generation**: Professional payslips for distribution
- **Dashboard Analytics**: Real-time payroll insights with charts
- **Dark Mode**: Modern UI with light/dark theme support

### Philippine Compliance
- **SSS Contributions**: Updated 2026 contribution tables
- **PhilHealth**: 4.5% premium rate calculations
- **Pag-IBIG Fund**: Tiered contribution rates
- **BIR Withholding Tax**: TRAIN Law tax tables
- **13th Month Pay**: Calculation support (coming soon)

## 💻 Technology

- **Frontend**: Pure HTML5, CSS3, JavaScript (no dependencies!)
- **Charts**: Chart.js for data visualization
- **Icons**: Remix Icon for modern UI
- **Storage**: LocalStorage for data persistence
- **Design**: Modern, responsive UI with Inter font
- **Architecture**: Single-page application (SPA)

## 🎯 Quick Start

### Option 1: Use Online (Recommended)
Visit [https://payrollph.vercel.app](https://payrollph.vercel.app)

### Option 2: Local Development
```bash
# Clone the repository
git clone https://github.com/notanotherpeter-a11y/payrollph-system.git
cd payrollph-system

# Run local server
python3 -m http.server 8080
# Visit http://localhost:8080
```

### Option 3: Deploy Your Own
```bash
# Using Vercel
npx vercel

# Using Netlify
npx netlify deploy

# Or upload to any static host
```

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
- [ ] Time clock integration
- [ ] Biometric attendance
- [ ] Employee self-service portal

## 🛠️ Development

### Project Structure
```
payrollph-system/
├── index.html        # Main HTML file
├── styles.css        # Modern UI styles
├── app.js           # Core JavaScript logic
├── README.md        # Documentation
├── package.json     # Project metadata
└── vercel.json      # Vercel configuration
```

### Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

For custom features or enterprise deployment:
- **Developer**: Gene Carlo Gallardo
- **Portfolio**: [gene-carlo.com](https://gene-carlo.com)
- **GitHub**: [@notanotherpeter-a11y](https://github.com/notanotherpeter-a11y)
- **Specialization**: Philippine business solutions

## 🏆 Credits

Built with ❤️ for Philippine businesses by Gene Carlo Gallardo

## 📜 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**⭐ Star this repository if you find it helpful!**