
const contactForm = document.getElementById("contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", async function (e) {

        e.preventDefault();

        const button = document.getElementById("sendBtn");
        const status = document.getElementById("formStatus");

        const statusToast = bootstrap.Toast.getOrCreateInstance(status, {
            delay: 5000
        });
        statusToast.hide();
        status.classList.remove("text-bg-success", "text-bg-danger");
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

            status.querySelector(".toast-body").textContent =
                "Message sent successfully! Thank you for reaching out.";
            status.classList.add("text-bg-success");
            statusToast.show();

            contactForm.reset();

        } catch (error) {

            status.querySelector(".toast-body").textContent =
                "Something went wrong. Please try again.";
            status.classList.add("text-bg-danger");
            statusToast.show();

        } finally {

            button.disabled = false;

            button.innerHTML =
                '<i class="fa-brands fa-telegram"></i> Send Message';

        }

    });

}
