// checkManagerRole.js
// include this script in all manager-only pages
// redirects to instructor dashboard if not a manager
async function checkManagerRole() {
    const result = await fetch("/auth/me").then(r => r.json()).catch(() => null);
    if (!result || !result.role) {
        window.location.href = "/login.html";
        return false;
    }
    if (result.role !== "Manager") {
        window.location.href = "/instructor.html";
        return false;
    }
    return true;
}
checkManagerRole();
