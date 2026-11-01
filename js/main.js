/**
 * Main Application Logic for T. Shanmukha Sai's Data Science Library
 */

// ============================================================================
// THEME SWITCHING ENGINE
// ============================================================================
const THEMES = ['light', 'midnight', 'rose'];
const THEME_NAMES = {
    'light': '☀️ Gamma Light',
    'midnight': '🌌 Cyber Midnight',
    'rose': '🌸 Gamma Rose'
};

function initTheme() {
    let savedTheme = localStorage.getItem('shanmukha_theme');
    if (!savedTheme || savedTheme === 'rose' || savedTheme === 'emerald') {
        savedTheme = 'light';
    }
    applyTheme(savedTheme);

    const themeBtn = document.getElementById('themeToggleBtn');
    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
            const nextIndex = (THEMES.indexOf(currentTheme) + 1) % THEMES.length;
            const nextTheme = THEMES[nextIndex];
            applyTheme(nextTheme);
        });
    }
}

function applyTheme(theme) {
    if (theme === 'light') {
        document.documentElement.removeAttribute('data-theme');
    } else {
        document.documentElement.setAttribute('data-theme', theme);
    }
    localStorage.setItem('shanmukha_theme', theme);

    const label = document.getElementById('themeLabel');
    if (label) {
        label.textContent = THEME_NAMES[theme] || '☀️ Gamma Light';
    }
}

// ============================================================================
// EXPERIMENTS RENDERING & FILTERING
// ============================================================================
function renderExperiments(experimentsToRender) {
    const grid = document.getElementById('experimentsGrid');
    const noResults = document.getElementById('noResults');
    const count = document.getElementById('expCount');
    
    if (!grid) return;

    grid.innerHTML = '';
    
    if (experimentsToRender.length === 0) {
        grid.style.display = 'none';
        if (noResults) noResults.style.display = 'block';
    } else {
        grid.style.display = 'grid';
        if (noResults) noResults.style.display = 'none';
        
        experimentsToRender.forEach((exp, index) => {
            let toolsHtml = '';
            if (exp.tools && exp.tools.length > 0) {
                toolsHtml = `<div style="display: flex; flex-wrap: wrap; gap: 6px; margin: 14px 0 18px;">` + 
                    exp.tools.map(t => `<span class="tech-tag">${t}</span>`).join('') + 
                    `</div>`;
            }

            const card = document.createElement('div');
            card.className = 'experiment-card';
            card.innerHTML = `
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                    <span class="exp-number">${exp.experiment_number}</span>
                    <span style="font-size: 0.76rem; color: var(--text-muted); font-family: var(--font-mono);">#EXP-${exp.id}</span>
                </div>
                <h3 style="font-size: 1.25rem; margin-bottom: 8px; line-height: 1.35; color: var(--text-primary);">${exp.title}</h3>
                <p style="font-size: 0.92rem; color: var(--text-secondary); line-height: 1.6; flex-grow: 1;">${exp.short_description}</p>
                ${toolsHtml}
                <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-subtle); padding-top: 14px; margin-top: auto;">
                    <a href="experiment.html?id=${exp.id}" class="btn-primary" style="padding: 7px 18px; font-size: 0.84rem;">
                        Inspect Protocol →
                    </a>
                    <span style="font-size: 0.78rem; color: var(--accent-primary); font-weight: 600;">Verified Lab ✨</span>
                </div>
            `;
            grid.appendChild(card);
        });
    }
    
    if (count) count.textContent = experimentsToRender.length;
}

// Modal handling
function openAddModal() {
    const modal = document.getElementById('addModal');
    if (modal) modal.style.display = 'flex';
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.style.display = 'none';
}

// Window click to dismiss modal
window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        e.target.style.display = 'none';
    }
});

// ============================================================================
// ACADEMIC GROWTH CHART (CHART.JS)
// ============================================================================
let growthChartInstance = null;

function initChart() {
    const canvas = document.getElementById('growthChart');
    if (!canvas || typeof Chart === 'undefined') return;
    
    const ctx = canvas.getContext('2d');
    if (growthChartInstance) {
        growthChartInstance.destroy();
    }

    const currentTheme = document.documentElement.getAttribute('data-theme') || 'emerald';
    
    // Choose colors based on theme
    let lineColor = '#10B981';
    let gradientStart = 'rgba(16, 185, 129, 0.35)';
    let gradientEnd = 'rgba(16, 185, 129, 0.0)';
    let gridColor = 'rgba(255, 255, 255, 0.06)';
    let tickColor = '#94A3B8';

    if (currentTheme === 'midnight') {
        lineColor = '#3B82F6';
        gradientStart = 'rgba(59, 130, 246, 0.35)';
        gradientEnd = 'rgba(59, 130, 246, 0.0)';
        gridColor = 'rgba(59, 130, 246, 0.12)';
    } else if (currentTheme === 'frost') {
        lineColor = '#059669';
        gradientStart = 'rgba(5, 150, 105, 0.25)';
        gradientEnd = 'rgba(5, 150, 105, 0.0)';
        gridColor = 'rgba(148, 163, 184, 0.15)';
        tickColor = '#475569';
    }

    const gradient = ctx.createLinearGradient(0, 0, 0, 190);
    gradient.addColorStop(0, gradientStart);
    gradient.addColorStop(1, gradientEnd);

    growthChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Semester 1', 'Semester 2', 'Semester 3', 'Semester 4'],
            datasets: [{
                label: 'Academic Growth (% Score)',
                data: [84, 89, 93, 96],
                borderColor: lineColor,
                backgroundColor: gradient,
                borderWidth: 3.5,
                pointBackgroundColor: '#FFFFFF',
                pointBorderColor: lineColor,
                pointBorderWidth: 3,
                pointRadius: 6,
                pointHoverRadius: 9,
                pointHoverBorderColor: '#FFFFFF',
                pointHoverBackgroundColor: lineColor,
                fill: true,
                tension: 0.42
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: {
                duration: 1200,
                easing: 'easeOutQuart'
            },
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: '#0F172A',
                    borderColor: lineColor,
                    borderWidth: 1,
                    titleColor: '#F8FAFC',
                    bodyColor: '#34D399',
                    padding: 12,
                    cornerRadius: 10,
                    displayColors: false,
                    callbacks: {
                        label: function(context) {
                            return `Grade Progression: ${context.parsed.y}% Score`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    min: 75,
                    max: 100,
                    grid: {
                        color: gridColor,
                        drawBorder: false
                    },
                    ticks: {
                        color: tickColor,
                        stepSize: 5,
                        font: { family: "'Inter', sans-serif", weight: '500' }
                    }
                },
                x: {
                    grid: { display: false },
                    ticks: {
                        color: tickColor,
                        font: { family: "'Inter', sans-serif", weight: '500' }
                    }
                }
            }
        }
    });
}

window.animateChart = function() {
    initChart();
};

// ============================================================================
// INITIALIZATION ON DOM LOAD
// ============================================================================
document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Theme
    initTheme();

    // 2. Initialize Chart if on dashboard
    initChart();

    // 3. Render Experiments if on experiments catalogue
    if (typeof getExperiments === 'function') {
        const experiments = getExperiments();
        renderExperiments(experiments);
    }

    // 4. Student Photo Upload Logic for T. Shanmukha Sai
    const photoUpload = document.getElementById('photoUpload');
    const photoPreview = document.getElementById('studentPhotoPreview');
    const storageKey = 'studentPhoto_T_Shanmukha_Sai';

    if (photoUpload && photoPreview) {
        // Load saved photo or fallback to clean initials avatar
        const savedPhoto = localStorage.getItem(storageKey);
        if (savedPhoto) {
            photoPreview.src = savedPhoto;
        }

        photoUpload.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(evt) {
                    const result = evt.target.result;
                    photoPreview.src = result;
                    localStorage.setItem(storageKey, result);
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // 5. Search Functionality
    const searchInput = document.getElementById('searchInput');
    if (searchInput && typeof getExperiments === 'function') {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            const all = getExperiments();
            const filtered = all.filter(exp => 
                exp.title.toLowerCase().includes(query) || 
                exp.short_description.toLowerCase().includes(query) ||
                exp.experiment_number.toLowerCase().includes(query) ||
                (exp.tools && exp.tools.some(t => t.toLowerCase().includes(query)))
            );
            renderExperiments(filtered);
        });
    }

    // 6. Add Experiment Form Handler
    const addForm = document.getElementById('addExperimentForm');
    if (addForm && typeof saveExperiment === 'function') {
        addForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const newExp = {
                experiment_number: document.getElementById('expNum').value.trim(),
                title: document.getElementById('expTitle').value.trim(),
                short_description: document.getElementById('expDesc').value.trim(),
                aim: document.getElementById('expAim').value.trim(),
                objective: document.getElementById('expObj').value.trim(),
                theory: document.getElementById('expTheory').value.trim(),
                requirements: document.getElementById('expReq').value.trim(),
                procedure: document.getElementById('expProc').value.trim(),
                python_code: document.getElementById('expCode').value.trim(),
                result: document.getElementById('expResult').value.trim(),
                tools: ["Python", "Machine Learning"],
                dataset: "Custom University Dataset",
                terminal_output: "[SIMULATED EXECUTION] Pipeline completed with status: SUCCESS (0.12s)."
            };

            saveExperiment(newExp);
            closeModal('addModal');
            addForm.reset();
            
            // Re-render
            renderExperiments(getExperiments());
        });
    }
});
