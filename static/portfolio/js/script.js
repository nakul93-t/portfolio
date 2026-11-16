
const contactForm = document.getElementById("contactForm");

if (contactForm) {
    let statusTimeout;

    contactForm.addEventListener("submit", async function (e) {

        e.preventDefault();

        const button = document.getElementById("sendBtn");
        const status = document.getElementById("formStatus");

        clearTimeout(statusTimeout);
        status.classList.add("d-none");
        status.classList.remove("alert-success", "alert-danger");
        button.disabled = true;
        button.innerHTML = "Sending...";

        const formData = new FormData(contactForm);
        const data = new URLSearchParams();

        data.append("name", formData.get("name"));
        data.append("email", formData.get("email"));
        data.append("message", formData.get("message"));

        try {

            await fetch("https://script.google.com/macros/s/AKfycbw_TSN-AESgwnke8rNxOV8LYd2B_BnJrAVBE93LLOasNcZ6gLJ1zIQoyFY3-BhjKzmP/exec", {
                method: "POST",
                mode: "no-cors",
                body: data
            });

            status.textContent = "Message sent successfully! Thank you for reaching out.";
            status.classList.add("alert-success");
            status.classList.remove("d-none");

            statusTimeout = window.setTimeout(() => {
                status.classList.add("d-none");
            }, 5000);

            contactForm.reset();

        } catch (error) {

            status.textContent = "Something went wrong. Please try again.";
            status.classList.add("alert-danger");
            status.classList.remove("d-none");

        } finally {

            button.disabled = false;

            button.innerHTML =
                '<i class="fa-brands fa-telegram"></i> Send Message';

        }

    });

}
