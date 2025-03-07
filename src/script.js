document.addEventListener('DOMContentLoaded', function() {
    // Add loading class to Twitter containers
    const twitterContainers = document.querySelectorAll('.twitter-slider-container');
    twitterContainers.forEach(container => {
        container.classList.add('loading');
    });
    
    // Remove loading class when Twitter widgets are loaded
    if (window.twttr) {
        window.twttr.ready(function(twttr) {
            twttr.events.bind('rendered', function(event) {
                const container = event.target.closest('.twitter-slider-container');
                if (container) {
                    container.classList.remove('loading');
                }
                
                // Also remove loading class from all containers after a timeout
                setTimeout(() => {
                    document.querySelectorAll('.twitter-slider-container.loading').forEach(cont => {
                        cont.classList.remove('loading');
                    });
                }, 2000);
            });
        });
    }
    
    // Fallback: remove loading class after 5 seconds regardless
    setTimeout(() => {
        document.querySelectorAll('.twitter-slider-container.loading').forEach(container => {
            container.classList.remove('loading');
        });
    }, 5000);

    // Navigation scroll effect - glassmorphism and size reduction
    const nav = document.getElementById('main-nav');
    const scrollThreshold = 0;

    function handleScroll() {
        if (window.scrollY > scrollThreshold) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleScroll);
    // Check on initial load
    handleScroll();

    // Mobile navigation toggle
    const mobileBreakpoint = 768;
    const navLinks = document.querySelector('.nav-links');
    
    if (window.innerWidth <= mobileBreakpoint) {
        createMobileNavToggle();
    }

    window.addEventListener('resize', function() {
        if (window.innerWidth <= mobileBreakpoint && !document.querySelector('.mobile-nav-toggle')) {
            createMobileNavToggle();
        } else if (window.innerWidth > mobileBreakpoint && document.querySelector('.mobile-nav-toggle')) {
            removeMobileNavToggle();
        }
    });

    function createMobileNavToggle() {
        const toggle = document.createElement('button');
        toggle.className = 'mobile-nav-toggle';
        toggle.innerHTML = '<i class="fas fa-bars"></i>';
        toggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            this.innerHTML = navLinks.classList.contains('active') ? 
                '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        });
        document.querySelector('.nav-container').appendChild(toggle);
    }

    function removeMobileNavToggle() {
        const toggle = document.querySelector('.mobile-nav-toggle');
        if (toggle) {
            toggle.remove();
        }
        navLinks.classList.remove('active');
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu if open
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                const toggle = document.querySelector('.mobile-nav-toggle');
                if (toggle) {
                    toggle.innerHTML = '<i class="fas fa-bars"></i>';
                }
            }

            // Scroll to target
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Form submission handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Here you would normally send the data to a server
            // For demonstration purposes, we'll just log it and show a success message
            console.log('Form submission:', { name, email, subject, message });
            
            // Show success message
            const formContainer = contactForm.parentElement;
            contactForm.style.display = 'none';
            
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.innerHTML = `
                <i class="fas fa-check-circle"></i>
                <h3>Message Sent!</h3>
                <p>Thank you for reaching out, ${name}. I'll get back to you soon.</p>
                <button class="btn" id="resetForm">Send Another Message</button>
            `;
            formContainer.appendChild(successMessage);
            
            // Reset form when "Send Another Message" is clicked
            document.getElementById('resetForm').addEventListener('click', function() {
                successMessage.remove();
                contactForm.reset();
                contactForm.style.display = 'block';
            });
        });
    }

    // Add mobile styles to nav if we're in mobile view
    function updateMobileStyles() {
        if (window.innerWidth <= mobileBreakpoint) {
            navLinks.classList.add('mobile-nav');
        } else {
            navLinks.classList.remove('mobile-nav', 'active');
        }
    }
    
    updateMobileStyles();
    window.addEventListener('resize', updateMobileStyles);

    // Animation on scroll - add 'fade-in' class as elements scroll into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, {
        rootMargin: '0px',
        threshold: 0.1
    });

    // Observe both card types for animation
    document.querySelectorAll('.project-card, .project-card-full').forEach(el => {
        el.classList.add('animate');
        observer.observe(el);
    });
    
    // Enhanced Twitter widgets examples with more content for the Social section
    document.querySelectorAll('.twitter-placeholder').forEach((placeholder, index) => {
        // Get the project index from data attribute if present, otherwise use the loop index
        const projectIndex = placeholder.dataset.projectIndex || index;
        const projectNum = Number(projectIndex) + 1;
        
        // Create an array of sample tweets for each project
        const tweetContent = [
            {
                date: 'Sep 15, 2023',
                content: `Just shipped a new feature for my ${projectNum === 1 ? 'Virtual Assistant' : 'Image Generator'} project! Check out the demo at the link below. #GauntletAI #AI`,
                likes: 24,
                retweets: 8,
                comments: 3
            },
            {
                date: 'Aug 28, 2023',
                content: `Excited to be presenting my work on ${projectNum === 1 ? 'conversational AI' : 'generative image models'} at the #AI conference next month! #MachineLearning`,
                likes: 42,
                retweets: 15,
                comments: 7
            },
            {
                date: 'Jul 10, 2023',
                content: `Looking for beta testers for my latest ${projectNum === 1 ? 'AI Assistant' : 'Image Generation'} project. DM if interested! #BetaTesters #AI #${projectNum === 1 ? 'NLP' : 'GenerativeAI'}`,
                likes: 19,
                retweets: 23,
                comments: 11
            },
            {
                date: 'Jun 5, 2023',
                content: `Deep dive: How I built the ${projectNum === 1 ? 'context-aware response system' : 'text-to-image diffusion pipeline'} for my latest project. Blog post coming soon! #TechBlog #AI`,
                likes: 31,
                retweets: 12,
                comments: 5
            }
        ];
        
        // Generate HTML for all tweets
        let tweetsHTML = '';
        tweetContent.forEach(tweet => {
            tweetsHTML += `
                <div class="sample-tweet">
                    <div class="tweet-header">
                        <span class="tweet-profile">
                            <i class="fab fa-twitter"></i> Paul Shell
                        </span>
                        <span class="tweet-date">${tweet.date}</span>
                    </div>
                    <div class="tweet-content">
                        ${tweet.content}
                    </div>
                    <div class="tweet-actions">
                        <span><i class="far fa-heart"></i> ${tweet.likes}</span>
                        <span><i class="far fa-retweet"></i> ${tweet.retweets}</span>
                        <span><i class="far fa-comment"></i> ${tweet.comments}</span>
                    </div>
                </div>
            `;
        });
        
        placeholder.innerHTML = tweetsHTML;
    });
    
    // Make inline tags more interactive
    document.querySelectorAll('.project-info-full .tag').forEach(tag => {
        tag.addEventListener('mouseover', function() {
            this.style.cursor = 'pointer';
        });
        
        tag.addEventListener('click', function() {
            // Could add functionality like filtering or search
            console.log(`Tag clicked: ${this.textContent}`);
            
            // Visual feedback
            this.classList.add('tag-pulse');
            setTimeout(() => {
                this.classList.remove('tag-pulse');
            }, 500);
        });
    });

    // Chat Box Functionality
    const chatBoxToggle = document.getElementById('chatBoxToggle');
    const chatBox = document.getElementById('chatBox');
    const chatBoxClose = document.getElementById('chatBoxClose');
    const chatBoxInput = document.getElementById('chatBoxInput');
    const chatBoxSend = document.getElementById('chatBoxSend');
    const chatBoxMessages = document.getElementById('chatBoxMessages');

    if (chatBoxToggle) {
    chatBoxToggle.addEventListener('click', function() {
            chatBox.classList.add('active');
    });
    }

    if (chatBoxClose) {
    chatBoxClose.addEventListener('click', function() {
        chatBox.classList.remove('active');
    });
    }

    if (chatBoxSend) {
        chatBoxSend.addEventListener('click', function() {
            sendMessage();
        });
    }

    if (chatBoxInput) {
        chatBoxInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }

    function sendMessage() {
        const message = chatBoxInput.value.trim();
        if (message !== '') {
            // Add user message
            const userMessageElement = document.createElement('div');
            userMessageElement.className = 'message sent';
            userMessageElement.innerHTML = `
                <p>${message}</p>
                <span class="message-time">Just now</span>
            `;
            chatBoxMessages.appendChild(userMessageElement);
            chatBoxInput.value = '';
            chatBoxMessages.scrollTop = chatBoxMessages.scrollHeight;
            
            // Simulate response after 1 second
            setTimeout(function() {
                const botMessageElement = document.createElement('div');
                botMessageElement.className = 'message received';
                botMessageElement.innerHTML = `
                    <p>Thank you for your message! I'll get back to you soon.</p>
                    <span class="message-time">Just now</span>
                `;
                chatBoxMessages.appendChild(botMessageElement);
                chatBoxMessages.scrollTop = chatBoxMessages.scrollHeight;
            }, 1000);
        }
    }

    // Twitter slider functionality
    const initializeSliders = () => {
        const sliders = document.querySelectorAll('.twitter-slider');
        
        sliders.forEach(slider => {
            const container = slider.querySelector('.twitter-slider-container');
            const content = slider.querySelector('.twitter-embed');
            const prevBtn = slider.querySelector('.slider-prev');
            const nextBtn = slider.querySelector('.slider-next');
            const dotsContainer = slider.querySelector('.slider-dots');
            
            if (!content || (!prevBtn && !nextBtn)) return;
            
            let currentIndex = 0;
            let tweetWidth = 0;
            let tweetsCount = 0;
            
            // Function to check tweet count and disable controls if needed
            function checkTweetCount() {
                // Only count the direct children blockquote elements that are Twitter tweets
                const tweets = Array.from(content.children).filter(el => 
                    el.tagName.toLowerCase() === 'blockquote' && 
                    el.classList.contains('twitter-tweet')
                );
                
                tweetsCount = tweets.length;
                
                // If there's only one tweet, add single-slide class and disable navigation
                if (tweetsCount <= 1) {
                    slider.classList.add('single-slide');
                    if (prevBtn) prevBtn.style.opacity = '0.3';
                    if (nextBtn) nextBtn.style.opacity = '0.3';
                    if (prevBtn) prevBtn.style.pointerEvents = 'none';
                    if (nextBtn) nextBtn.style.pointerEvents = 'none';
                    return false;
                } else {
                    slider.classList.remove('single-slide');
                    return true;
                }
            }
            
            // Create indicator dots based on the number of tweets
            function createDots() {
                if (!dotsContainer) return;
                
                // Clear existing dots
                dotsContainer.innerHTML = '';
                
                // Only count the direct children blockquote elements that are Twitter tweets
                const tweets = Array.from(content.children).filter(el => 
                    el.tagName.toLowerCase() === 'blockquote' && 
                    el.classList.contains('twitter-tweet')
                );
                
                tweetsCount = tweets.length;
                
                // Create a dot for each tweet
                for (let i = 0; i < tweetsCount; i++) {
                    const dot = document.createElement('div');
                    dot.classList.add('slider-dot');
                    if (i === currentIndex) {
                        dot.classList.add('active');
                    }
                    
                    dot.addEventListener('click', () => {
                        currentIndex = i;
                        updateSliderPosition();
                        updateActiveDot();
                    });
                    
                    dotsContainer.appendChild(dot);
                }
            }
            
            // Update the active dot indicator
            function updateActiveDot() {
                if (!dotsContainer) return;
                
                const dots = dotsContainer.querySelectorAll('.slider-dot');
                dots.forEach((dot, index) => {
                    if (index === currentIndex) {
                        dot.classList.add('active');
                    } else {
                        dot.classList.remove('active');
                    }
                });
            }
            
            // Initialize after Twitter widgets are loaded
            function initSlider() {
                // Get the actual tweet count first using the improved method
                const tweets = Array.from(content.children).filter(el => 
                    el.tagName.toLowerCase() === 'blockquote' && 
                    el.classList.contains('twitter-tweet')
                );
                
                tweetsCount = tweets.length;
                
                if (!checkTweetCount()) return;
                
                // Adjust the width calculation to account for the gap between tweets
                if (tweets.length > 0) {
                    // Get computed style to account for margins and gap
                    const tweetStyle = window.getComputedStyle(tweets[0]);
                    const marginLeft = parseFloat(tweetStyle.marginLeft || '0');
                    const marginRight = parseFloat(tweetStyle.marginRight || '0');
                    
                    // Calculate the total width of a tweet including margins
                    tweetWidth = tweets[0].offsetWidth + marginLeft + marginRight;
                    
                    // Account for the gap between tweets
                    tweetWidth += parseFloat(window.getComputedStyle(content).columnGap || '0');
                } else {
                    tweetWidth = slider.offsetWidth;
                }
                
                // Create the indicator dots
                createDots();
                
                updateSliderPosition();
                
                if (prevBtn) {
                    prevBtn.addEventListener('click', () => {
                        // Refresh tweet count before navigation
                        checkTweetCount();
                        currentIndex = Math.max(currentIndex - 1, 0);
                        updateSliderPosition();
                        updateActiveDot();
                    });
                }
                
                if (nextBtn) {
                    nextBtn.addEventListener('click', () => {
                        // Refresh tweet count before navigation
                        checkTweetCount();
                        currentIndex = Math.min(currentIndex + 1, tweetsCount - 1);
                        updateSliderPosition();
                        updateActiveDot();
                    });
                }
            }
            
            function updateSliderPosition() {
                // Re-check tweet count to ensure we're not beyond the available tweets
                // using the same improved counting method
                const tweets = Array.from(content.children).filter(el => 
                    el.tagName.toLowerCase() === 'blockquote' && 
                    el.classList.contains('twitter-tweet')
                );
                
                tweetsCount = Math.max(tweets.length, 1);
                
                // Ensure currentIndex is not beyond the available tweets
                if (currentIndex >= tweetsCount) {
                    currentIndex = tweetsCount - 1;
                }
                
                const translateX = -currentIndex * tweetWidth;
                // Add centering adjustment when possible
                let centeringOffset = 0;
                const containerWidth = slider.offsetWidth; // No padding to account for now
                if (containerWidth > tweetWidth) {
                    centeringOffset = (containerWidth - tweetWidth) / 2;
                }
                content.style.transform = `translateX(${translateX + centeringOffset}px)`;
                
                if (prevBtn) {
                    prevBtn.style.opacity = currentIndex === 0 ? '0.3' : '1';
                    prevBtn.style.pointerEvents = currentIndex === 0 ? 'none' : 'auto';
                }
                
                if (nextBtn) {
                    nextBtn.style.opacity = currentIndex >= tweetsCount - 1 ? '0.3' : '1';
                    nextBtn.style.pointerEvents = currentIndex >= tweetsCount - 1 ? 'none' : 'auto';
                }
            }
            
            // Listen for the Twitter widgets to load
            window.addEventListener('load', function() {
                // First check if Twitter widgets have already loaded
                if (document.querySelector('.twitter-tweet-rendered')) {
                    setTimeout(initSlider, 500);
                } else {
                    // Create a MutationObserver to watch for Twitter widget rendering
                    const observer = new MutationObserver((mutations) => {
                        if (document.querySelector('.twitter-tweet-rendered')) {
                            setTimeout(initSlider, 500);
                            observer.disconnect();
                        }
                    });
                    
                    // Start observing the document body for rendered tweets
                    observer.observe(document.body, {
                        childList: true,
                        subtree: true
                    });
                    
                    // Fallback timer if MutationObserver doesn't catch anything
                    setTimeout(() => {
                        if (!document.querySelector('.twitter-tweet-rendered')) {
                            initSlider();
                        }
                    }, 5000);
                }
            });
        });
    };

    // Initialize Twitter sliders
    initializeSliders();

    // Animation for elements
    const animateElements = document.querySelectorAll('.animate');
    
    function checkScroll() {
        animateElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 50) {
                element.classList.add('fade-in');
            }
        });
    }
    
    window.addEventListener('scroll', checkScroll);
    checkScroll(); // Check on load

    // Force Twitter embeds to fill their containers
    if (window.twttr) {
        window.twttr.ready(function(twttr) {
            twttr.events.bind('rendered', function(event) {
                const methodTweet = document.querySelector('.method-tweet');
                if (methodTweet) {
                    const iframe = methodTweet.querySelector('iframe');
                    if (iframe) {
                        iframe.style.width = '100%';
                        iframe.style.minWidth = '100%';
                        iframe.style.margin = '0';
                        iframe.style.padding = '0';
                    }
                }
            });
        });
    }

    // Add tilt effect to recommendation cards
    const cards = document.querySelectorAll('.recommendation-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', handleMouseMove);
        card.addEventListener('mouseenter', handleMouseEnter);
        card.addEventListener('mouseleave', handleMouseLeave);
    });
    
    function handleMouseMove(e) {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left; // x position within the card
        const y = e.clientY - rect.top; // y position within the card
        
        // Calculate rotation based on mouse position
        // The further from center, the more tilt
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (centerY - y) / 15; // Max 10-15 degrees rotation
        const rotateY = (x - centerX) / 15;
        
        // Apply the transform
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }
    
    function handleMouseEnter(e) {
        const card = e.currentTarget;
        card.classList.add('tilt');
        
        // Clear any existing transform to avoid jumps
        setTimeout(() => {
            card.style.transition = 'transform 0.1s ease-out';
        }, 100);
    }
    
    function handleMouseLeave(e) {
        const card = e.currentTarget;
        card.classList.remove('tilt');
        card.style.transition = 'transform 0.5s ease-out';
        card.style.transform = `perspective(1000px) rotateX(0) rotateY(0)`;
    }
});

// When Twitter widgets.js loads, set up a listener for tweet rendering
window.twttrLoadPromise = new Promise((resolve) => {
    if (window.twttr) {
        resolve(window.twttr);
    } else {
        window.addEventListener('load', function() {
            if (window.twttr) {
                setTimeout(() => {
                    resolve(window.twttr);
                }, 500);
            }
        });
    }
});

window.twttrLoadPromise.then(function(twttr) {
    twttr.events.bind('rendered', function(event) {
        // Force all Twitter iframes to be full width
        const iframes = document.querySelectorAll('iframe.twitter-tweet-rendered');
        iframes.forEach(iframe => {
            iframe.style.width = '100%';
            iframe.style.maxWidth = '100%';
            iframe.style.margin = '0';
            iframe.style.padding = '0';
            
            // Try to access the iframe's style
            try {
                if (iframe.contentDocument) {
                    const style = document.createElement('style');
                    style.textContent = `
                        .TwitterCard { width: 100% !important; max-width: 100% !important; }
                        .TwitterCard-container { width: 100% !important; max-width: 100% !important; }
                    `;
                    iframe.contentDocument.head.appendChild(style);
                }
            } catch (e) {
                // Security restrictions may prevent this
                console.log('Could not access iframe content');
            }
        });
        
        // Specifically target the project updates tweets
        const projectUpdateTweets = document.querySelectorAll('.project-updates iframe.twitter-tweet-rendered');
        projectUpdateTweets.forEach(iframe => {
            iframe.style.marginBottom = '0';
            
            // Find all parent containers and remove bottom margins/padding
            let parent = iframe.parentElement;
            while (parent && !parent.classList.contains('project-updates')) {
                parent.style.marginBottom = '0';
                parent.style.paddingBottom = '0';
                parent = parent.parentElement;
            }
        });
        
        // Specifically target the method tweet
        const methodTweetIframe = document.querySelector('.method-tweet iframe.twitter-tweet-rendered');
        if (methodTweetIframe) {
            methodTweetIframe.style.width = '100%';
            methodTweetIframe.style.maxWidth = '100%';
            methodTweetIframe.style.margin = '0';
            methodTweetIframe.style.padding = '0';
            
            // Also adjust the parent elements
            const twitterTweet = methodTweetIframe.closest('.twitter-tweet');
            if (twitterTweet) {
                twitterTweet.style.width = '100%';
                twitterTweet.style.maxWidth = '100%';
                twitterTweet.style.margin = '0';
                twitterTweet.style.padding = '0';
                twitterTweet.style.border = 'none';
            }
        }
    });
});