
// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize iTabs functionality
    initializeiTabs();
});

// Main iTabs initialization function
function initializeiTabs() {
    // Setup iTabs terms
    setupiTabsTerms();
    
    // Setup popup close buttons
    setupCloseButtons();
    
    // Setup tab switching functionality
    setupTabSwitching();
    
    // Setup overlay for popups
    setupOverlay();
}

// Setup iTabs terms to show popups when clicked
function setupiTabsTerms() {
    // Map of terms to their corresponding popups
    const termToPopup = {
        'smartphone cameras': 'smartphones-popup',
        'accessories': 'accessories-popup',
        'composition techniques': 'composition-popup',
        'HDR mode': 'hdr-popup'
    };
    
    // Get all iTabs terms
    const iTabsTerms = document.querySelectorAll('.itabs-term');
    
    // Add click event listeners to each term
    iTabsTerms.forEach(term => {
        term.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get the term text (lowercase for matching)
            const termText = term.textContent.toLowerCase().trim();
            
            // Find the matching popup ID
            for (const [key, popupId] of Object.entries(termToPopup)) {
                if (termText.includes(key)) {
                    // Show the corresponding popup
                    showPopup(popupId);
                    break;
                }
            }
        });
    });
}

// Show a specific popup
function showPopup(popupId) {
    // Hide any visible popups first
    hideAllPopups();
    
    // Get the popup element
    const popup = document.getElementById(popupId);
    if (popup) {
        // Show the popup
        popup.style.display = 'block';
        
        // Show the overlay
        const overlay = document.querySelector('.overlay');
        if (!overlay) {
            // Create overlay if it doesn't exist
            createOverlay();
        } else {
            overlay.style.display = 'block';
        }
    }
}

// Hide all popups
function hideAllPopups() {
    const popups = document.querySelectorAll('.itabs-popup');
    popups.forEach(popup => {
        popup.style.display = 'none';
    });
    
    // Hide the overlay
    const overlay = document.querySelector('.overlay');
    if (overlay) {
        overlay.style.display = 'none';
    }
}

// Setup close buttons
function setupCloseButtons() {
    const closeButtons = document.querySelectorAll('.itabs-close');
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            hideAllPopups();
        });
    });
}

// Setup tab switching functionality
function setupTabSwitching() {
    const tabs = document.querySelectorAll('.itabs-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Get the parent popup
            const popup = this.closest('.itabs-popup');
            
            // Remove active class from all tabs in this popup
            const popupTabs = popup.querySelectorAll('.itabs-tab');
            popupTabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to the clicked tab
            this.classList.add('active');
            
            // Get the tab content to show
            const tabContentId = this.getAttribute('data-tab');
            
            // Hide all tab contents in this popup
            const tabContents = popup.querySelectorAll('.itabs-tab-content');
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Show the corresponding content
            const contentToShow = popup.querySelector(`.itabs-tab-content[data-content="${tabContentId}"]`);
            if (contentToShow) {
                contentToShow.classList.add('active');
            }
        });
    });
}

// Create overlay for popup background
function createOverlay() {
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    document.body.appendChild(overlay);
    
    // Close popups when clicking on overlay
    overlay.addEventListener('click', function() {
        hideAllPopups();
    });
}

// Setup overlay for popups
function setupOverlay() {
    // Check if overlay already exists
    let overlay = document.querySelector('.overlay');
    
    // Create it if it doesn't exist
    if (!overlay) {
        createOverlay();
    }
}

// Function to handle form submission
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = contactForm.querySelector('input[type="text"]').value;
            const email = contactForm.querySelector('input[type="email"]').value;
            const userType = contactForm.querySelector('select').value;
            
            // Show success message (in a real app, you'd send this data to your server)
            contactForm.innerHTML = `
                <div class="success-message">
                    <h3>Thank you, ${name}!</h3>
                    <p>We've added you to our waitlist. You'll be among the first to know when iTabs is ready.</p>
                </div>
            `;
            
            // Log submission for demo purposes
            console.log('Form submitted:', { name, email, userType });
        });
    }
});

// Additional content for the other iTabs popups (only the smartphone one is in the HTML)
function createAdditionalPopups() {
    // Create accessories popup
    const accessoriesPopup = document.createElement('div');
    accessoriesPopup.id = 'accessories-popup';
    accessoriesPopup.className = 'itabs-popup';
    accessoriesPopup.innerHTML = `
        <div class="itabs-header">
            <h3>Smartphone Photography Accessories</h3>
            <button class="itabs-close">&times;</button>
        </div>
        <div class="itabs-tabs">
            <button class="itabs-tab active" data-tab="essential">Essential</button>
            <button class="itabs-tab" data-tab="advanced">Advanced</button>
            <button class="itabs-tab" data-tab="reviews">Reviews</button>
            <button class="itabs-tab" data-tab="deals">Deals</button>
        </div>
        <div class="itabs-content">
            <div class="itabs-tab-content active" data-content="essential">
                <h4>Essential Accessories</h4>
                <ul class="feature-list">
                    <li><strong>Smartphone Tripod:</strong> Stabilizes your phone for sharper images</li>
                    <li><strong>Clip-on Lenses:</strong> Expands your creative options with wide-angle, macro, or fisheye perspectives</li>
                    <li><strong>Ring Light:</strong> Provides even lighting for portraits and close-ups</li>
                    <li><strong>Bluetooth Remote:</strong> Allows for hands-free shooting</li>
                    <li><strong>Power Bank:</strong> Extends battery life during long shooting sessions</li>
                </ul>
                <a href="#" class="btn btn-primary">View Essential Kit</a>
            </div>
            <div class="itabs-tab-content" data-content="advanced">
                <h4>Advanced Accessories</h4>
                <ul class="feature-list">
                    <li><strong>Smartphone Gimbal:</strong> Provides professional-level stabilization for video</li>
                    <li><strong>Variable ND Filter:</strong> Controls exposure in bright conditions</li>
                    <li><strong>Smartphone Cage Rig:</strong> Mounts multiple accessories simultaneously</li>
                    <li><strong>External Microphone:</strong> Captures higher quality audio for videos</li>
                    <li><strong>LED Video Light Panel:</strong> Provides adjustable lighting for video production</li>
                </ul>
                <a href="#" class="btn btn-primary">View Pro Kit</a>
            </div>
            <div class="itabs-tab-content" data-content="reviews">
                <h4>Top-Rated Accessories</h4>
                <div class="review-item">
                    <h5>DJI OM 5 Smartphone Gimbal</h5>
                    <div class="stars">★★★★★</div>
                    <p>"The best investment for smartphone videography. Stabilization is incredible and the tracking features are game-changing."</p>
                </div>
                <div class="review-item">
                    <h5>Moment Anamorphic Lens</h5>
                    <div class="stars">★★★★☆</div>
                    <p>"Creates beautiful cinematic footage with that distinctive lens flare. Build quality is outstanding."</p>
                </div>
            </div>
            <div class="itabs-tab-content" data-content="deals">
                <h4>Current Deals</h4>
                <div class="deal-item">
                    <span class="discount">25% OFF</span>
                    <h5>Smartphone Photography Kit</h5>
                    <p>Includes tripod, remote, basic lens set, and case</p>
                    <p class="price"><s>$89.99</s> $67.49</p>
                    <a href="#" class="btn btn-secondary">View Deal</a>
                </div>
                <div class="deal-item">
                    <span class="discount">15% OFF</span>
                    <h5>Professional Gimbal</h5>
                    <p>DJI OM 5 with accessory bundle</p>
                    <p class="price"><s>$169.99</s> $144.49</p>
                    <a href="#" class="btn btn-secondary">View Deal</a>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(accessoriesPopup);
    
    // Add more popups for composition-popup and hdr-popup here
    // Code for composition techniques popup
    const compositionPopup = document.createElement('div');
    compositionPopup.id = 'composition-popup';
    compositionPopup.className = 'itabs-popup';
    compositionPopup.innerHTML = `
        <div class="itabs-header">
            <h3>Composition Techniques</h3>
            <button class="itabs-close">&times;</button>
        </div>
        <div class="itabs-tabs">
            <button class="itabs-tab active" data-tab="basics">Basics</button>
            <button class="itabs-tab" data-tab="advanced">Advanced</button>
            <button class="itabs-tab" data-tab="examples">Examples</button>
            <button class="itabs-tab" data-tab="resources">Resources</button>
        </div>
        <div class="itabs-content">
            <div class="itabs-tab-content active" data-content="basics">
                <h4>Basic Composition Techniques</h4>
                <ul class="feature-list">
                    <li><strong>Rule of Thirds:</strong> Divide your frame into a 3×3 grid and place key elements along the lines or at their intersections</li>
                    <li><strong>Leading Lines:</strong> Use natural lines to lead the viewer's eye to the main subject</li>
                    <li><strong>Symmetry:</strong> Create balance by mirroring elements on either side of the frame</li>
                    <li><strong>Framing:</strong> Use foreground elements to frame your main subject</li>
                    <li><strong>Fill the Frame:</strong> Get close to your subject to eliminate distractions</li>
                </ul>
            </div>
            <div class="itabs-tab-content" data-content="advanced">
                <h4>Advanced Composition Techniques</h4>
                <ul class="feature-list">
                    <li><strong>Golden Ratio:</strong> A more refined version of the rule of thirds based on the Fibonacci sequence</li>
                    <li><strong>Negative Space:</strong> Use empty space intentionally to create visual impact</li>
                    <li><strong>Juxtaposition:</strong> Place contrasting elements together to create tension or tell a story</li>
                    <li><strong>Color Theory:</strong> Use complementary or harmonious color schemes to enhance composition</li>
                    <li><strong>Gestalt Principles:</strong> Utilize patterns, proximity, and continuity to guide perception</li>
                </ul>
            </div>
            <div class="itabs-tab-content" data-content="examples">
                <h4>Composition Examples</h4>
                <div class="example-gallery">
                    <div class="example-item">
                        <h5>Rule of Thirds Example</h5>
                        <p>Notice how the subject is positioned at the intersection of gridlines, creating a more engaging image than if centered.</p>
                    </div>
                    <div class="example-item">
                        <h5>Leading Lines Example</h5>
                        <p>The road guides your eye directly to the mountain in the background, creating depth and focus.</p>
                    </div>
                </div>
            </div>
            <div class="itabs-tab-content" data-content="resources">
                <h4>Learning Resources</h4>
                <ul class="resource-list">
                    <li><a href="#">Composition Masterclass Video Course</a></li>
                    <li><a href="#">25 Composition Examples for Inspiration</a></li>
                    <li><a href="#">Mobile Photography Composition Guide (PDF)</a></li>
                    <li><a href="#">Interactive Composition Tool</a></li>
                </ul>
            </div>
        </div>
    `;
    document.body.appendChild(compositionPopup);
    
    // Code for HDR popup
    const hdrPopup = document.createElement('div');
    hdrPopup.id = 'hdr-popup';
    hdrPopup.className = 'itabs-popup';
    hdrPopup.innerHTML = `
        <div class="itabs-header">
            <h3>HDR Mode</h3>
            <button class="itabs-close">&times;</button>
        </div>
        <div class="itabs-tabs">
            <button class="itabs-tab active" data-tab="what">What is HDR</button>
            <button class="itabs-tab" data-tab="when">When to Use</button>
            <button class="itabs-tab" data-tab="tips">Pro Tips</button>
            <button class="itabs-tab" data-tab="apps">Apps</button>
        </div>
        <div class="itabs-content">
            <div class="itabs-tab-content active" data-content="what">
                <h4>What is HDR Photography?</h4>
                <p>HDR (High Dynamic Range) is a technique that combines multiple exposures of the same scene to capture greater detail in both the highlights and shadows. Your smartphone takes several photos at different exposure levels and intelligently merges them together.</p>
                <div class="highlight-box">
                    Most modern smartphones now have HDR capabilities built directly into the default camera app, with some offering auto-HDR that activates when needed.
                </div>
            </div>
            <div class="itabs-tab-content" data-content="when">
                <h4>When to Use HDR Mode</h4>
                <ul class="feature-list">
                    <li><strong>Landscapes:</strong> To capture both bright skies and darker foregrounds</li>
                    <li><strong>Backlit Subjects:</strong> When your subject is in front of a bright light source</li>
                    <li><strong>Low-light Situations:</strong> To brighten shadows without overexposing highlights</li>
                    <li><strong>High-contrast Scenes:</strong> Where there's a big difference between dark and light areas</li>
                </ul>
                <p><strong>When NOT to use HDR:</strong> For moving subjects, for scenes with vivid colors you want to preserve, or when you're going for a silhouette effect.</p>
            </div>
            <div class="itabs-tab-content" data-content="tips">
                <h4>Pro Tips for HDR Photography</h4>
                <ul class="feature-list">
                    <li><strong>Use a Tripod:</strong> HDR requires multiple exposures, so stability is key</li>
                    <li><strong>Adjust HDR Strength:</strong> Many phones let you control how strong the HDR effect is</li>
                    <li><strong>Watch for Halos:</strong> Poor HDR processing can create unnatural halos around objects</li>
                    <li><strong>Keep RAW Files:</strong> If your phone supports it, shoot in RAW+HDR for more editing flexibility</li>
                    <li><strong>Mind the Conditions:</strong> HDR works best in static scenes with good lighting contrast</li>
                </ul>
            </div>
            <div class="itabs-tab-content" data-content="apps">
                <h4>Recommended HDR Apps</h4>
                <div class="app-list">
                    <div class="app-item">
                        <h5>Adobe Lightroom Mobile</h5>
                        <p>Offers HDR capture with RAW support and powerful editing tools</p>
                        <div class="app-rating">Rating: 4.7/5</div>
                    </div>
                    <div class="app-item">
                        <h5>ProCamera</h5>
                        <p>Advanced HDR features with manual control over exposure bracketing</p>
                        <div class="app-rating">Rating: 4.5/5</div>
                    </div>
                    <div class="app-item">
                        <h5>Focos</h5>
                        <p>Combines HDR with depth effects for unique creative possibilities</p>
                        <div class="app-rating">Rating: 4.6/5</div>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(hdrPopup);
}

// Initialize additional popups
document.addEventListener('DOMContentLoaded', function() {
    createAdditionalPopups();
});

