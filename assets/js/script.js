document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    setupFormSubmit();
    setupScrollEffects();
});

function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (10 + Math.random() * 10) + 's';
        particle.style.width = (2 + Math.random() * 4) + 'px';
        particle.style.height = particle.style.width;
        particlesContainer.appendChild(particle);
    }
}

function setupFormSubmit() {
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            const newComment = {
                name: name,
                email: email,
                message: message,
                date: new Date().toLocaleDateString('zh-CN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                })
            };
            
            addComment(newComment);
            form.reset();
            
            showNotification('留言发送成功！感谢你的留言！');
        });
    }
}

function addComment(comment) {
    const commentsList = document.querySelector('.comments-list');
    if (!commentsList) return;
    
    const initials = comment.name.charAt(0).toUpperCase();
    
    const commentCard = document.createElement('div');
    commentCard.className = 'comment-card';
    commentCard.style.opacity = '0';
    commentCard.style.transform = 'translateX(-20px)';
    
    commentCard.innerHTML = `
        <div class="comment-header">
            <div class="avatar">${initials}</div>
            <div class="comment-info">
                <h4>${comment.name}</h4>
                <span>${comment.date}</span>
            </div>
        </div>
        <div class="comment-content">
            ${comment.message}
        </div>
    `;
    
    commentsList.prepend(commentCard);
    
    setTimeout(() => {
        commentCard.style.transition = 'all 0.5s ease';
        commentCard.style.opacity = '1';
        commentCard.style.transform = 'translateX(0)';
    }, 10);
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: linear-gradient(90deg, #00d4ff, #ff00ff);
        color: white;
        padding: 15px 30px;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 212, 255, 0.4);
        font-weight: 500;
        z-index: 1001;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

function setupScrollEffects() {
    const nav = document.querySelector('nav');
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.style.background = 'rgba(26, 26, 46, 0.98)';
            nav.style.boxShadow = '0 5px 30px rgba(0, 0, 0, 0.3)';
        } else {
            nav.style.background = 'rgba(26, 26, 46, 0.95)';
            nav.style.boxShadow = 'none';
        }
        
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            if (rect.top < windowHeight * 0.8 && rect.bottom > windowHeight * 0.2) {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }
        });
    });
    
    sections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = `all 0.6s ease ${index * 0.1}s`;
    });
    
    setTimeout(() => {
        window.dispatchEvent(new Event('scroll'));
    }, 100);
}

document.head.insertAdjacentHTML('beforeend', `
    <style>
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    </style>
`);
