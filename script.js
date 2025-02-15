// DOM elements
var resumeForm = document.getElementById('resume-form');
var resumeDisplay = document.getElementById('resume-display');
var shareableLinkContainer = document.getElementById('shareable-link-container');
var shareableLink = document.getElementById('shareable-link');
var downloadPDFButton = document.getElementById('download-pdf');
// Event listener for form submission
resumeForm.addEventListener('submit', function (e) {
    e.preventDefault();
    // Get form data
    var resumeData = {
        username: document.getElementById('username').value,
        fullName: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        degree: document.getElementById('degree').value,
        institution: document.getElementById('institution').value,
        gradYear: +document.getElementById('gradYear').value,
        experience: document.getElementById('experience').value,
        skills: document.getElementById('skills').value,
    };
    // Generate resume HTML content
    generateResume(resumeData);
    // Create a shareable link
    generateShareableLink(resumeData);
});
// Function to generate the resume dynamically
function generateResume(data) {
    resumeDisplay.innerHTML = "\n      <h2>".concat(data.fullName, "'s Resume</h2>\n      <p><strong>Email:</strong> ").concat(data.email, "</p>\n      <p><strong>Phone:</strong> ").concat(data.phone, "</p>\n      <h3>Education</h3>\n      <p><strong>Degree:</strong> ").concat(data.degree, "</p>\n      <p><strong>Institution:</strong> ").concat(data.institution, "</p>\n      <p><strong>Graduation Year:</strong> ").concat(data.gradYear, "</p>\n      <h3>Experience</h3>\n      <p>").concat(data.experience, "</p>\n      <h3>Skills</h3>\n      <p>").concat(data.skills, "</p>\n    ");
}
// Function to generate a shareable link
function generateShareableLink(data) {
    var baseUrl = window.location.href;
    var resumeJSON = encodeURIComponent(JSON.stringify(data));
    var shareableURL = "".concat(baseUrl, "?resume=").concat(resumeJSON);
    shareableLink.href = shareableURL;
    shareableLink.textContent = shareableURL;
    shareableLinkContainer.style.display = 'block';
}
// Handle resume link in URL
window.onload = function () {
    var urlParams = new URLSearchParams(window.location.search);
    var resumeParam = urlParams.get('resume');
    if (resumeParam) {
        var resumeData = JSON.parse(decodeURIComponent(resumeParam));
        generateResume(resumeData);
    }
};
// Function to download resume as PDF
downloadPDFButton.addEventListener('click', function () {
    var pdfContent = resumeDisplay.innerHTML;
    var blob = new Blob([pdfContent], { type: 'application/pdf' });
    var link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'resume.pdf';
    link.click();
});
