/* ========================================================================
   PAGANIA — SMALL CLIENT-SIDE HELPERS
   ------------------------------------------------------------------------
   The site deliberately avoids a framework. Markdown is the only dynamic
   content mechanism currently needed.
   ======================================================================== */

// Load a Markdown file and render it into the requested page element.
// Keeping this generic makes future content additions straightforward.

const loadMarkdown = async (filePath, targetElementId) => {
    try {
        const response = await fetch(filePath);

        if (!response.ok) {
            throw new Error(`File ${filePath} not found`);
        }

        const markdownText = await response.text();
        const htmlContent = marked.parse(markdownText);
        const target = document.getElementById(targetElementId);

        if (target) {
            target.innerHTML = htmlContent;
        }
    } catch (error) {
        console.error(error);

        const target = document.getElementById(targetElementId);
        if (target) {
            target.innerHTML = `<p class="content-error">Content unavailable: ${filePath}</p>`;
        }
    }
};

// Initialise editable Markdown sections after the page structure exists.
document.addEventListener('DOMContentLoaded', () => {
    loadMarkdown('content/home.md', 'content-home');
    loadMarkdown('content/about.md', 'content-about');
    loadMarkdown('content/services.md', 'content-services');
    loadMarkdown('content/references.md', 'content-references');
    loadMarkdown('content/contact.md', 'content-contact');
});
