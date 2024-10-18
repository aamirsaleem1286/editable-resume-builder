// Get form elements and profile elements
const resumeForm = document.getElementById('resume-form') as HTMLFormElement;
const nameInput = document.getElementById('name') as HTMLInputElement;
const emailInput = document.getElementById('email') as HTMLInputElement;
const degreeSelect = document.getElementById('degree') as HTMLSelectElement;
const universityInput = document.getElementById('university') as HTMLInputElement;
const profilePictureInput = document.getElementById('profile-picture') as HTMLInputElement;
const experienceInput = document.getElementById('experience') as HTMLInputElement;
const formMessage = document.getElementById('form-message') as HTMLDivElement;
const profileImg = document.getElementById('profile-img') as HTMLImageElement;
const resumeName = document.getElementById('resume-name') as HTMLSpanElement;
const resumeEmail = document.getElementById('resume-email') as HTMLSpanElement;
const resumeDegree = document.getElementById('resume-degree') as HTMLSpanElement;
const resumeUniversity = document.getElementById('resume-university') as HTMLSpanElement;
const resumeSkills = document.getElementById('resume-skills') as HTMLSpanElement;
const resumeExperience = document.getElementById('resume-experience') as HTMLSpanElement;
const editProfileBtn = document.getElementById('edit-profile-btn') as HTMLButtonElement;
let isEditMode = false; // Track edit mode state

// Define the type for ResumeData
interface ResumeData {
    name: string;
    email: string;
    degree: string;
    university: string;
    skills: string;
    experience: string;
}

// Function to get form data and return it as ResumeData
function getFormData(): ResumeData {
    const name = nameInput.value.trim();  // Trim to remove extra spaces
    const email = emailInput.value.trim();
    const degree = degreeSelect.value;
    const university = universityInput.value.trim();

    // Get selected skills from checkboxes
    const skillCheckboxes = document.querySelectorAll<HTMLInputElement>('#skills-list input[type="checkbox"]:checked');
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

// Function to generate the resume based on the form data
function generateResume(data: ResumeData): void {
    // Populate the resume fields with form data or N/A if data is missing
    resumeName.textContent = data.name || "N/A";
    resumeEmail.textContent = data.email || "N/A";
    resumeDegree.textContent = data.degree || "N/A";
    resumeUniversity.textContent = data.university || "N/A";
    resumeSkills.textContent = data.skills || "N/A";
    resumeExperience.textContent = data.experience || "N/A";

    // Hide the form and show the resume output
    document.getElementById('resume-output')!.style.display = 'block';
    resumeForm.style.display = 'none';  // Hide the form
}

// Function to handle the profile picture upload
function handleProfilePictureUpload(): void {
    const file = profilePictureInput.files?.[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (event) {
            if (event.target?.result) {
                profileImg.src = event.target.result as string;
            }
        };
        reader.readAsDataURL(file);
    }
}

// Add event listener for profile picture input
profilePictureInput.addEventListener('change', handleProfilePictureUpload);

// Form submit event listener
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

// Function to validate the form data
function validateForm(): boolean {
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const degree = degreeSelect.value;
    const university = universityInput.value.trim();

    if (!name || !email || !degree || !university) {
        return false;
    }

    // Basic email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

// Edit Profile Button functionality
editProfileBtn.addEventListener('click', () => {
    if (!isEditMode) {
        // Show form again for editing
        resumeForm.style.display = 'block';
        document.getElementById('resume-output')!.style.display = 'none';

        // Set input fields with current resume data
        nameInput.value = resumeName.textContent !== "N/A" ? resumeName.textContent : '';
        emailInput.value = resumeEmail.textContent !== "N/A" ? resumeEmail.textContent : '';
        degreeSelect.value = resumeDegree.textContent !== "N/A" ? resumeDegree.textContent : '';
        universityInput.value = resumeUniversity.textContent !== "N/A" ? resumeUniversity.textContent : '';
        experienceInput.value = resumeExperience.textContent !== "N/A" ? resumeExperience.textContent : '';

        isEditMode = true;
        editProfileBtn.textContent = "Save Changes";
    } else {
        // When saving changes, regenerate the resume
        const updatedFormData = getFormData();
        generateResume(updatedFormData);

        isEditMode = false;
        editProfileBtn.textContent = "Edit Profile";
    }
});
