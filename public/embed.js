/**
 * Blazer Part Finder – embed snippet.
 *
 * Drop this script on any page to add the Blazer Part Finder chat widget:
 *
 *   <script
 *     src="https://YOUR-DEPLOYMENT.vercel.app/embed.js"
 *     data-blazer-chat-url="https://YOUR-DEPLOYMENT.vercel.app"
 *     defer
 *   ></script>
 *
 * By default this renders a floating "Chat" button in the bottom-right
 * corner of the page. Clicking it toggles a floating <iframe> that loads
 * the chat widget with `?embed=true` so the widget renders without its
 * own header/margins.
 *
 * To embed the widget inline instead of as a floating button, add a
 * container element with `id="blazer-part-finder"` anywhere on the page;
 * the script will render the <iframe> directly inside it.
 */
(function () {
  var CURRENT_SCRIPT = document.currentScript;

  function getBaseUrl() {
    var explicit =
      CURRENT_SCRIPT && CURRENT_SCRIPT.getAttribute("data-blazer-chat-url");

    if (explicit) {
      var sanitized = sanitizeOrigin(explicit.replace(/\/$/, ""));
      if (sanitized) return sanitized;
    }

    // Fall back to the origin the script itself was loaded from.
    if (CURRENT_SCRIPT && CURRENT_SCRIPT.src) {
      var scriptOrigin = sanitizeOrigin(CURRENT_SCRIPT.src);
      if (scriptOrigin) return scriptOrigin;
    }

    return "";
  }

  // Only allow http(s) URLs to be used as the iframe source, guarding
  // against `javascript:`/`data:` URLs injected via the data attribute.
  function sanitizeOrigin(candidate) {
    try {
      var parsed = new URL(candidate, window.location.href);
      if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
        return null;
      }
      return parsed.origin;
    } catch {
      return null;
    }
  }

  function createIframe(baseUrl) {
    var iframe = document.createElement("iframe");
    iframe.src = baseUrl + "/?embed=true";
    iframe.title = "Blazer Part Finder Chat";
    iframe.style.border = "0";
    iframe.style.width = "100%";
    iframe.style.height = "100%";
    iframe.allow = "clipboard-write";
    return iframe;
  }

  function initInline(baseUrl, container) {
    container.appendChild(createIframe(baseUrl));
  }

  function initFloatingButton(baseUrl) {
    var isOpen = false;

    var button = document.createElement("button");
    button.type = "button";
    button.textContent = "💬 Chat";
    button.setAttribute("aria-label", "Open Blazer Part Finder chat");
    button.style.cssText = [
      "position:fixed",
      "bottom:20px",
      "right:20px",
      "z-index:2147483000",
      "padding:12px 20px",
      "border:none",
      "border-radius:999px",
      "background:#2563eb",
      "color:#fff",
      "font-family:system-ui,-apple-system,sans-serif",
      "font-size:14px",
      "font-weight:600",
      "cursor:pointer",
      "box-shadow:0 4px 12px rgba(0,0,0,0.2)",
    ].join(";");

    var panel = document.createElement("div");
    panel.style.cssText = [
      "position:fixed",
      "bottom:80px",
      "right:20px",
      "z-index:2147483000",
      "width:min(380px, calc(100vw - 40px))",
      "height:min(600px, calc(100vh - 120px))",
      "border-radius:16px",
      "overflow:hidden",
      "box-shadow:0 12px 32px rgba(0,0,0,0.25)",
      "display:none",
      "background:#fff",
    ].join(";");
    panel.appendChild(createIframe(baseUrl));

    button.addEventListener("click", function () {
      isOpen = !isOpen;
      panel.style.display = isOpen ? "block" : "none";
      button.textContent = isOpen ? "✕ Close" : "💬 Chat";
    });

    document.body.appendChild(panel);
    document.body.appendChild(button);
  }

  function init() {
    var baseUrl = getBaseUrl();
    if (!baseUrl) {
      console.error(
        "[blazer-embed] Could not resolve chat URL. Set data-blazer-chat-url on the <script> tag."
      );
      return;
    }

    var container = document.getElementById("blazer-part-finder");
    if (container) {
      initInline(baseUrl, container);
    } else {
      initFloatingButton(baseUrl);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
