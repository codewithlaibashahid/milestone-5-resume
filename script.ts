// Interface for Resume Data
interface ResumeData {
    username: string;
    fullName: string;
    email: string;
    phone: string;
    degree: string;
    institution: string;
    gradYear: number;
    experience: string;
    skills: string;
  }
  
  // DOM elements
  const resumeForm = document.getElementById('resume-form') as HTMLFormElement;
  const resumeDisplay = document.getElementById('resume-display') as HTMLDivElement;
  const shareableLinkContainer = document.getElementById('shareable-link-container') as HTMLDivElement;
  const shareableLink = document.getElementById('shareable-link') as HTMLAnchorElement;
  const downloadPDFButton = document.getElementById('download-pdf') as HTMLButtonElement;
  
  // Event listener for form submission
  resumeForm.addEventListener('submit', (e: Event) => {
    e.preventDefault();
  
    // Get form data
    const resumeData: ResumeData = {
      username: (document.getElementById('username') as HTMLInputElement).value,
      fullName: (document.getElementById('name') as HTMLInputElement).value,
      email: (document.getElementById('email') as HTMLInputElement).value,
      phone: (document.getElementById('phone') as HTMLInputElement).value,
      degree: (document.getElementById('degree') as HTMLInputElement).value,
      institution: (document.getElementById('institution') as HTMLInputElement).value,
      gradYear: +(document.getElementById('gradYear') as HTMLInputElement).value,
      experience: (document.getElementById('experience') as HTMLTextAreaElement).value,
      skills: (document.getElementById('skills') as HTMLTextAreaElement).value,
    };
  
    // Generate resume HTML content
    generateResume(resumeData);
  
    // Create a shareable link
    generateShareableLink(resumeData);
  });
  
  // Function to generate the resume dynamically
  function generateResume(data: ResumeData): void {
    resumeDisplay.innerHTML = `
      <h2>${data.fullName}'s Resume</h2>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Phone:</strong> ${data.phone}</p>
      <h3>Education</h3>
      <p><strong>Degree:</strong> ${data.degree}</p>
      <p><strong>Institution:</strong> ${data.institution}</p>
      <p><strong>Graduation Year:</strong> ${data.gradYear}</p>
      <h3>Experience</h3>
      <p>${data.experience}</p>
      <h3>Skills</h3>
      <p>${data.skills}</p>
    `;
  }
  
  // Function to generate a shareable link
  function generateShareableLink(data: ResumeData): void {
    const baseUrl = window.location.href;
    const resumeJSON = encodeURIComponent(JSON.stringify(data));
    const shareableURL = `${baseUrl}?resume=${resumeJSON}`;
  
    shareableLink.href = shareableURL;
    shareableLink.textContent = shareableURL;
    shareableLinkContainer.style.display = 'block';
  }
  
  // Handle resume link in URL
  window.onload = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const resumeParam = urlParams.get('resume');
  
    if (resumeParam) {
      const resumeData = JSON.parse(decodeURIComponent(resumeParam)) as ResumeData;
      generateResume(resumeData);
    }
  };
  
  // Function to download resume as PDF
  downloadPDFButton.addEventListener('click', () => {
    const pdfContent = resumeDisplay.innerHTML;
    const blob = new Blob([pdfContent], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'resume.pdf';
    link.click();
  });
  