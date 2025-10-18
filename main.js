    // Progress tracking system
    const progressData = {
        phases: 9,
        tutorials: 25,
        books: 20
    };

    // Load progress from memory (resets on page reload)
    let completedPhases = [];
    let completedTutorials = [];
    let completedBooks = [];

    function updateProgress() {
        // Get all checked items
        const phaseCheckboxes = document.querySelectorAll('[data-phase]:checked');
        const tutorialCheckboxes = document.querySelectorAll('[data-tutorial]:checked');
        const bookCheckboxes = document.querySelectorAll('[data-book]:checked');

        completedPhases = Array.from(phaseCheckboxes).map(cb => cb.dataset.phase);
        completedTutorials = Array.from(tutorialCheckboxes).map(cb => cb.dataset.tutorial);
        completedBooks = Array.from(bookCheckboxes).map(cb => cb.dataset.book);

        // Update counters
        document.getElementById('phasesCompleted').textContent = 
            `${completedPhases.length}/${progressData.phases}`;
        document.getElementById('tutorialsCompleted').textContent = 
            `${completedTutorials.length}/${progressData.tutorials}`;
        document.getElementById('booksCompleted').textContent = 
            `${completedBooks.length}/${progressData.books}`;

        // Calculate total progress
        const totalItems = progressData.phases + progressData.tutorials + progressData.books;
        const completedItems = completedPhases.length + completedTutorials.length + completedBooks.length;
        const percentage = Math.round((completedItems / totalItems) * 100);

        document.getElementById('totalProgress').textContent = `${percentage}%`;
        document.getElementById('progressBar').style.width = `${percentage}%`;

        // Update visual states
        updateVisualStates();

        // Show milestone alerts
        checkMilestones(percentage);
    }

    function updateVisualStates() {
        // Update phase cards
        document.querySelectorAll('[data-phase]').forEach(checkbox => {
            const phaseId = checkbox.dataset.phase;
            const timelineItem = document.getElementById(`phase-${phaseId}`);
            const phaseCard = checkbox.closest('.phase-card');
            
            if (checkbox.checked) {
                timelineItem?.classList.add('completed');
                phaseCard?.classList.add('completed');
            } else {
                timelineItem?.classList.remove('completed');
                phaseCard?.classList.remove('completed');
            }
        });

        // Update tutorial items
        document.querySelectorAll('[data-tutorial]').forEach(checkbox => {
            const tutorialItem = checkbox.closest('.tutorial-item');
            if (checkbox.checked) {
                tutorialItem?.classList.add('completed');
            } else {
                tutorialItem?.classList.remove('completed');
            }
        });

        // Update book cards
        document.querySelectorAll('[data-book]').forEach(checkbox => {
            const bookCard = checkbox.closest('.book-card');
            if (checkbox.checked) {
                bookCard?.classList.add('completed');
            } else {
                bookCard?.classList.remove('completed');
            }
        });
    }

    function checkMilestones(percentage) {
        const alertDiv = document.getElementById('milestoneAlert');
        let message = '';

        if (percentage === 25 && !sessionStorage.getItem('milestone25')) {
            message = '🎉 Milestone Reached: 25% Complete! Keep up the great work!';
            sessionStorage.setItem('milestone25', 'true');
        } else if (percentage === 50 && !sessionStorage.getItem('milestone50')) {
            message = '🚀 Halfway There! 50% Complete! You\'re making excellent progress!';
            sessionStorage.setItem('milestone50', 'true');
        } else if (percentage === 75 && !sessionStorage.getItem('milestone75')) {
            message = '⭐ Almost Done! 75% Complete! The finish line is in sight!';
            sessionStorage.setItem('milestone75', 'true');
        } else if (percentage === 100 && !sessionStorage.getItem('milestone100')) {
            message = '🏆 CONGRATULATIONS! You\'ve completed the entire roadmap! Time to start trading!';
            sessionStorage.setItem('milestone100', 'true');
        }

        if (message) {
            alertDiv.innerHTML = `<div class="milestone-alert">${message}</div>`;
            setTimeout(() => {
                alertDiv.innerHTML = '';
            }, 5000);
        }
    }

    function resetProgress() {
        if (confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
            // Uncheck all checkboxes
            document.querySelectorAll('input[type="checkbox"]').forEach(cb => {
                cb.checked = false;
            });
            
            // Clear session storage
            sessionStorage.clear();
            
            // Update progress
            updateProgress();
            
            // Show confirmation
            const alertDiv = document.getElementById('milestoneAlert');
            alertDiv.innerHTML = '<div class="milestone-alert" style="background: #ff9800;">Progress has been reset. Start fresh on your journey!</div>';
            setTimeout(() => {
                alertDiv.innerHTML = '';
            }, 3000);
        }
    }
     resetProgress();

    // Initialize on page load
    document.addEventListener('DOMContentLoaded', function() {
        updateProgress();
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });