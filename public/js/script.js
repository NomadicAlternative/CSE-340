
document.addEventListener("click", (event) => {
	const trigger = event.target.closest("[data-toggle='password']")
	if (!trigger) return

	const targetId = trigger.getAttribute("data-target")
	const targetInput = document.getElementById(targetId)
	if (!targetInput) return

	const isPassword = targetInput.getAttribute("type") === "password"
	targetInput.setAttribute("type", isPassword ? "text" : "password")
	trigger.textContent = isPassword ? "Hide password" : "Show password"
})
