/**
 * Configuration & Profile Data for T. Shanmukha Sai
 * Data Science Digital Library
 */
const CONFIG = {
    PORTAL_TITLE: "Data Science Digital Library",
    UNIVERSITY_NAME: "Mohan Babu University",
    DEPARTMENT_NAME: "Department of CSE (Data Science)",
    SUBJECT_CODE: "24DS102006 - Data Science Laboratory",
    MBU_LOGO: "assets/mbu_logo.png",
    
    // Student Identity Details
    STUDENT_NAME: "T. Shanmukha Sai",
    STUDENT_ROLL: "24102A030122",
    STUDENT_BRANCH: "B.Tech CSE (Data Science)",
    STUDENT_SECTION: "Section 2",
    STUDENT_SEMESTER: "Semester V",
    FACULTY_MENTOR: "S.Bosubabu",
    STUDENT_CGPA: "9.54",
    PRACTICAL_SCORE: "48",
    TOTAL_SCORE: "96",
    ATTENDANCE_PCT: "98",

    // Profiles & Portfolios
    GITHUB_URL: "https://github.com/shanmukha6300/shanmukha",
    LINKEDIN_URL: "https://www.linkedin.com/in/shanmukha-sai-3a00a0415/",
    EMAIL: "shanmukhasai.t@mbu.edu.in"
};

// Auto-populate elements tagged with config attributes
document.addEventListener('DOMContentLoaded', () => {
    const bindData = (selector, value, isHref = false) => {
        document.querySelectorAll(selector).forEach(el => {
            if (isHref) el.href = value;
            else el.textContent = value;
        });
    };

    bindData('.config-student-name', CONFIG.STUDENT_NAME);
    bindData('.config-student-roll', CONFIG.STUDENT_ROLL);
    bindData('.config-faculty-mentor', CONFIG.FACULTY_MENTOR);
    bindData('.config-branch', CONFIG.STUDENT_BRANCH);
    bindData('.config-semester', CONFIG.STUDENT_SEMESTER);
    bindData('.config-section', CONFIG.STUDENT_SECTION);
    bindData('.config-subject-code', CONFIG.SUBJECT_CODE);
    bindData('.config-portal-title', CONFIG.PORTAL_TITLE);
    bindData('.config-github', CONFIG.GITHUB_URL, true);
    bindData('.config-linkedin', CONFIG.LINKEDIN_URL, true);
});
