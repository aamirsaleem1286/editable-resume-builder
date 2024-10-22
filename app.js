// Get form elements
const resumeForm = document.getElementById('resume-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const degreeSelect = document.getElementById('degree');
const universityInput = document.getElementById('university');
const profilePictureInput = document.getElementById('profile-picture');
const experienceInput = document.getElementById('experience');
const formMessage = document.getElementById('form-message');
const profileImg = document.getElementById('profile-img');
const resumeName = document.getElementById('resume-name');
const resumeEmail = document.getElementById('resume-email');
const resumeDegree = document.getElementById('resume-degree');
const resumeUniversity = document.getElementById('resume-university');
const resumeSkills = document.getElementById('resume-skills');
const resumeExperience = document.getElementById('resume-experience');
const editProfileBtn = document.getElementById('edit-profile-btn');
let isEditMode = false; 

function getFormData() {
    const name = nameInput.value.trim();  // Trim to remove extra spaces
    const email = emailInput.value.trim();
    const degree = degreeSelect.value;
    const university = universityInput.value.trim();
    const skillCheckboxes = document.querySelectorAll('#skills-list input[type="checkbox"]:checked');
    const skills = Array.from(skillCheckboxes).map(checkbox => checkbox.value).join(', ');

    const experience = experienceInput.value.trim();

    return {
        name,
        email,
        degree,
        university,
        skills,
        experience,
    };
}

function generateResume(data) {
    // Populate the resume fields with form data or N/A if data is missing
    resumeName.textContent = data.name || "N/A";
    resumeEmail.textContent = data.email || "N/A";
    resumeDegree.textContent = data.degree || "N/A";
    resumeUniversity.textContent = data.university || "N/A";
    resumeSkills.textContent = data.skills || "N/A";
    resumeExperience.textContent = data.experience || "N/A";
    document.getElementById('resume-output').style.display = 'block';
    resumeForm.style.display = 'none';  // Hide the form
}

// Function to handle the profile picture upload
function handleProfilePictureUpload() {
    const file = profilePictureInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (event) {
            profileImg.src = event.target.result;
        };
        reader.readAsDataURL(file);
    }
}

profilePictureInput.addEventListener('change', handleProfilePictureUpload);
resumeForm.addEventListener('submit', function (event) {
    event.preventDefault();
    if (validateForm()) {
        const formData = getFormData();
        generateResume(formData);
        formMessage.textContent = '';  // Clear any previous form messages
    } else {
        formMessage.textContent = 'Please fill in all required fields correctly!';
    }
});

function validateForm() {
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const degree = degreeSelect.value;
    const university = universityInput.value.trim();

    if (!name || !email || !degree || !university) {
        return false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

editProfileBtn.addEventListener('click', () => {
    if (!isEditMode) {
        resumeForm.style.display = 'block';
        document.getElementById('resume-output').style.display = 'none';
        nameInput.value = resumeName.textContent !== "N/A" ? resumeName.textContent : '';
        emailInput.value = resumeEmail.textContent !== "N/A" ? resumeEmail.textContent : '';
        degreeSelect.value = resumeDegree.textContent !== "N/A" ? resumeDegree.textContent : '';
        universityInput.value = resumeUniversity.textContent !== "N/A" ? resumeUniversity.textContent : '';
        experienceInput.value = resumeExperience.textContent !== "N/A" ? resumeExperience.textContent : '';

        isEditMode = true;
        editProfileBtn.textContent = "Save Changes";
    } else {
        const updatedFormData = getFormData();
        generateResume(updatedFormData);

        isEditMode = false;
        editProfileBtn.textContent = "Edit Profile";
    }
});


document.getElementById('download-pdf-btn').addEventListener('click', function() {
    const element = document.getElementById('resume-output');
    const opt = {
        margin:       1,
        filename:     'My_Resume.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2 },
        jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    // Generate the PDF and download it
    html2pdf().from(element).set(opt).save();
});

// Function to hide buttons before generating the PDF
function hideButtonsForPDF() {
    const downloadBtn = document.getElementById('download-pdf-btn');
    const editBtn = document.getElementById('edit-profile-btn');
    
    if (downloadBtn) downloadBtn.style.display = 'none';  
    if (editBtn) editBtn.style.display = 'none';          
}

function showButtonsAfterPDF() {
    const downloadBtn = document.getElementById('download-pdf-btn');
    const editBtn = document.getElementById('edit-profile-btn');
    
    if (downloadBtn) downloadBtn.style.display = 'block';  
    if (editBtn) editBtn.style.display = 'block';         
}

// Function to download resume as PDF
function downloadResumeAsPDF() {
    const element = document.getElementById('resume-output');
    hideButtonsForPDF();

    // Generate the PDF
    const opt = {
        margin: 1,
        filename: 'My_Resume.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf().from(element).set(opt).save().then(() => {
        showButtonsAfterPDF();
    }).catch(err => {
        showButtonsAfterPDF();
        console.error(err);
    });
}

const downloadBtn = document.getElementById('download-pdf-btn');
downloadBtn.removeEventListener('click', downloadResumeAsPDF);  
downloadBtn.addEventListener('click', downloadResumeAsPDF);
