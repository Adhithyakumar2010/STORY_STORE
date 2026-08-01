// AK CLICKS - Story Checkout & Payment JS
document.addEventListener("DOMContentLoaded", function() {
    const methodButtons = document.querySelectorAll(".payment-methods .method");
    const paymentOptions = document.querySelectorAll(".payment-option");
    const methodInput = document.querySelector("input[name='method']");

    methodButtons.forEach(btn => {
        btn.addEventListener("click", function() {
            methodButtons.forEach(b => b.classList.remove("active"));
            paymentOptions.forEach(opt => opt.classList.remove("active"));

            this.classList.add("active");
            const targetMethod = this.getAttribute("data-method");
            if (methodInput) {
                methodInput.value = targetMethod;
            }

            const targetOption = document.querySelector(`.payment-option[data-panel="${targetMethod}"]`);
            if (targetOption) {
                targetOption.classList.add("active");
            }
        });
    });
});
