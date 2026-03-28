// PayrollPH Enterprise - Advanced JavaScript

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initializeCharts();
    initializeSparklines();
    initializeInteractions();
    initializeCommandPalette();
    initializeNotifications();
    initializeAnimations();
});

// Toggle Sidebar
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.querySelector('.main-content');
    
    sidebar.classList.toggle('collapsed');
    mainContent.classList.toggle('expanded');
}

// Toggle Submenu
function toggleSubmenu(element) {
    const parent = element.parentElement;
    parent.classList.toggle('open');
}

// Initialize Advanced Charts with ApexCharts
function initializeCharts() {
    // Payroll Trends Chart
    const payrollOptions = {
        series: [{
            name: 'Gross Pay',
            data: [2100000, 2250000, 2180000, 2350000, 2420000, 2458000]
        }, {
            name: 'Net Pay',
            data: [1785000, 1912500, 1853000, 1997500, 2057000, 2089300]
        }, {
            name: 'Deductions',
            data: [315000, 337500, 327000, 352500, 363000, 368700]
        }],
        chart: {
            height: 350,
            type: 'area',
            toolbar: {
                show: false
            },
            animations: {
                enabled: true,
                easing: 'easeinout',
                speed: 800,
                animateGradually: {
                    enabled: true,
                    delay: 150
                }
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth',
            width: 3
        },
        colors: ['#5E5BFF', '#00D989', '#FFB800'],
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.7,
                opacityTo: 0.1,
                stops: [0, 90, 100]
            }
        },
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            labels: {
                style: {
                    colors: '#6C757D',
                    fontSize: '12px'
                }
            }
        },
        yaxis: {
            labels: {
                formatter: function (val) {
                    return '₱' + (val / 1000000).toFixed(1) + 'M';
                },
                style: {
                    colors: '#6C757D',
                    fontSize: '12px'
                }
            }
        },
        tooltip: {
            y: {
                formatter: function (val) {
                    return '₱' + val.toLocaleString();
                }
            },
            theme: 'light'
        },
        grid: {
            borderColor: '#E9ECEF',
            strokeDashArray: 4,
            xaxis: {
                lines: {
                    show: true
                }
            }
        }
    };

    const payrollChart = new ApexCharts(document.querySelector("#payrollTrendsChart"), payrollOptions);
    payrollChart.render();

    // Department Distribution Chart
    const departmentOptions = {
        series: [42, 28, 15, 10, 5],
        chart: {
            height: 280,
            type: 'donut',
            animations: {
                enabled: true,
                easing: 'easeinout',
                speed: 800,
                animateGradually: {
                    enabled: true,
                    delay: 150
                }
            }
        },
        labels: ['Operations', 'Sales', 'Admin', 'IT', 'HR'],
        colors: ['#5E5BFF', '#00D989', '#FFB800', '#00B8D9', '#FF4757'],
        plotOptions: {
            pie: {
                donut: {
                    size: '75%',
                    labels: {
                        show: true,
                        value: {
                            show: true,
                            fontSize: '24px',
                            fontWeight: 700,
                            color: '#212529',
                            formatter: function (val) {
                                return parseInt(val);
                            }
                        },
                        total: {
                            show: true,
                            label: 'Total',
                            color: '#6C757D',
                            formatter: function (w) {
                                return w.globals.seriesTotals.reduce((a, b) => a + b, 0);
                            }
                        }
                    }
                }
            }
        },
        stroke: {
            width: 0
        },
        dataLabels: {
            enabled: false
        },
        legend: {
            show: false
        },
        tooltip: {
            y: {
                formatter: function(val) {
                    return val + ' employees';
                }
            }
        }
    };

    const departmentChart = new ApexCharts(document.querySelector("#departmentChart"), departmentOptions);
    departmentChart.render();
}

// Initialize Sparklines for Metric Cards
function initializeSparklines() {
    const sparklineOptions = {
        chart: {
            type: 'line',
            sparkline: {
                enabled: true
            },
            animations: {
                enabled: true,
                easing: 'linear',
                dynamicAnimation: {
                    speed: 1000
                }
            }
        },
        stroke: {
            curve: 'smooth',
            width: 2
        },
        fill: {
            opacity: 0.3
        },
        tooltip: {
            fixed: {
                enabled: false
            },
            x: {
                show: false
            },
            y: {
                title: {
                    formatter: function (seriesName) {
                        return '';
                    }
                }
            },
            marker: {
                show: false
            }
        }
    };

    // Sparkline 1 - Total Payroll
    const spark1 = new ApexCharts(document.querySelector("#sparkline1"), {
        ...sparklineOptions,
        series: [{
            data: [2100, 2250, 2180, 2350, 2420, 2458]
        }],
        colors: ['#5E5BFF']
    });
    spark1.render();

    // Sparkline 2 - Employees
    const spark2 = new ApexCharts(document.querySelector("#sparkline2"), {
        ...sparklineOptions,
        series: [{
            data: [240, 242, 244, 244, 246, 248]
        }],
        colors: ['#00D989']
    });
    spark2.render();

    // Sparkline 3 - Deductions
    const spark3 = new ApexCharts(document.querySelector("#sparkline3"), {
        ...sparklineOptions,
        series: [{
            data: [380, 375, 372, 370, 371, 368]
        }],
        colors: ['#FFB800']
    });
    spark3.render();

    // Sparkline 4 - Attendance
    const spark4 = new ApexCharts(document.querySelector("#sparkline4"), {
        ...sparklineOptions,
        series: [{
            data: [97.2, 97.5, 97.8, 98.0, 98.1, 98.2]
        }],
        colors: ['#00B8D9']
    });
    spark4.render();
}

// Initialize Interactive Elements
function initializeInteractions() {
    // Dropdown Menus
    document.querySelectorAll('.nav-item').forEach(item => {
        const dropdown = item.querySelector('.dropdown-menu');
        if (dropdown) {
            item.addEventListener('mouseenter', () => {
                dropdown.style.display = 'block';
                setTimeout(() => {
                    dropdown.classList.add('show');
                }, 10);
            });
            
            item.addEventListener('mouseleave', () => {
                dropdown.classList.remove('show');
                setTimeout(() => {
                    dropdown.style.display = 'none';
                }, 300);
            });
        }
    });

    // Counter Animation
    const animateValue = (element, start, end, duration) => {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            
            if (element.dataset.format === 'currency') {
                element.textContent = '₱' + value.toLocaleString();
            } else if (element.dataset.format === 'percent') {
                element.textContent = value + '%';
            } else {
                element.textContent = value.toLocaleString();
            }
            
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    };

    // Animate metric values on load
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const endValue = parseInt(element.textContent.replace(/[^0-9]/g, ''));
                animateValue(element, 0, endValue, 1500);
                observer.unobserve(element);
            }
        });
    });

    document.querySelectorAll('.metric-value').forEach(el => {
        observer.observe(el);
    });
}

// Command Palette (Ctrl+K)
function initializeCommandPalette() {
    const palette = document.getElementById('commandPalette');
    const input = document.getElementById('commandInput');
    
    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            openCommandPalette();
        }
        
        if (e.key === 'Escape' && palette.style.display === 'flex') {
            closeCommandPalette();
        }
    });
    
    palette.addEventListener('click', (e) => {
        if (e.target === palette) {
            closeCommandPalette();
        }
    });
}

function openCommandPalette() {
    const palette = document.getElementById('commandPalette');
    const input = document.getElementById('commandInput');
    
    palette.style.display = 'flex';
    setTimeout(() => {
        palette.classList.add('show');
        input.focus();
    }, 10);
}

function closeCommandPalette() {
    const palette = document.getElementById('commandPalette');
    const input = document.getElementById('commandInput');
    
    palette.classList.remove('show');
    setTimeout(() => {
        palette.style.display = 'none';
        input.value = '';
    }, 300);
}

// Notifications
function initializeNotifications() {
    // Simulate real-time notifications
    setTimeout(() => {
        showNotification('New employee onboarded successfully', 'success');
    }, 3000);
    
    setTimeout(() => {
        showNotification('Payroll processing for March completed', 'info');
    }, 8000);
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="ri-${type === 'success' ? 'check' : 'information'}-line"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close" onclick="this.parentElement.remove()">
            <i class="ri-close-line"></i>
        </button>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// Advanced Animations
function initializeAnimations() {
    // Parallax effect on scroll
    let ticking = false;
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.page-header-advanced');
        if (parallax) {
            parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateParallax);
            ticking = true;
        }
    });
    
    // Hover effects for metric cards
    document.querySelectorAll('.metric-card').forEach(card => {
        card.addEventListener('mouseenter', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });
}

// Add CSS for notifications
const style = document.createElement('style');
style.textContent = `
    .notification {
        position: fixed;
        bottom: 2rem;
        right: -400px;
        background: white;
        border-radius: 12px;
        padding: 1rem 1.5rem;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
        display: flex;
        align-items: center;
        gap: 1rem;
        transition: right 0.3s ease-out;
        z-index: 2000;
        border-left: 4px solid;
    }
    
    .notification.show {
        right: 2rem;
    }
    
    .notification.success {
        border-left-color: var(--success);
    }
    
    .notification.info {
        border-left-color: var(--info);
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }
    
    .notification-content i {
        font-size: 20px;
    }
    
    .notification.success i {
        color: var(--success);
    }
    
    .notification.info i {
        color: var(--info);
    }
    
    .notification-close {
        background: none;
        border: none;
        color: var(--gray-400);
        cursor: pointer;
        padding: 0.25rem;
        margin-left: 1rem;
    }
    
    .notification-close:hover {
        color: var(--gray-600);
    }
    
    /* Metric card glow effect */
    .metric-card::before {
        content: '';
        position: absolute;
        top: var(--mouse-y);
        left: var(--mouse-x);
        width: 100px;
        height: 100px;
        background: radial-gradient(circle, rgba(94, 91, 255, 0.2) 0%, transparent 70%);
        transform: translate(-50%, -50%);
        opacity: 0;
        transition: opacity 0.3s;
        pointer-events: none;
    }
    
    .metric-card:hover::before {
        opacity: 1;
    }
`;
document.head.appendChild(style);