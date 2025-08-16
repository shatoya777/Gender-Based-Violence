   // Bar chart data for psychological symptom percentages:
    
   
   const ctx = document.getElementById("symptomChart").getContext("2d");
    new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["PTSD Symptoms", "Depression", "Suicidal Thoughts"],
        datasets: [
          {
            label: "Percentage of Participants",
            data: [50, 33, 30],
            backgroundColor: ["rgba(122, 30, 30, 0.8)", "rgba(122, 30, 30, 0.8)", "rgba(122, 30, 30, 0.8)"],
            borderColor: ["rgba(122, 30, 30, 1)", "rgba(122, 30, 30, 1)", "rgba(122, 30, 30, 1)"],
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            max: 60,
            title: {
              display: true,
              text: "Percentage (%)",
              color: "#4a1a1a",
              font: {
                weight: "600",
                size: 14
              }
            },
            ticks: {
              stepSize: 10
            }
          },
          x: {
            title: {
              display: true,
              text: "Type of Symptom",
              color: "#4a1a1a",
              font: {
                weight: "600",
                size: 14
              }
            }
          }
        },
        plugins: {
          legend: {
            display: false
          },
          title: {
            display: true,
            text: "Psychological Symptom Prevalence Among Sexually Abused Adolescent Girls",
            color: "#7a1e1e",
            font: {
              weight: "700",
              size: 18
            },
            padding: {
              top: 10,
              bottom: 20
            }
          }
        }
      }
    });

    let parliamentChartInitialized = false;

  const parliamentObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !parliamentChartInitialized) {
        document.querySelector('#parliament-chart-trigger').classList.add('visible');
        parliamentChartInitialized = true;

        const ctx = document.getElementById("parliamentChart").getContext("2d");
        new Chart(ctx, {
          type: "bar",
          data: {
            labels: ["India", "Pakistan"],
            datasets: [
              {
                label: "Lower House",
                data: [13.8, 17.0],
                backgroundColor: "#cd3f22"
              },
              {
                label: "Upper House",
                data: [16.7, 18.8],
                backgroundColor: "#831c00"
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: {
              duration: 1500,
              easing: 'easeOutBounce'
            },
            scales: {
              y: {
                beginAtZero: true,
                max: 20,
                title: {
                  display: true,
                  text: "Percentage of women in parliament"
                },
                ticks: {
                  callback: function(value) {
                    return value.toFixed(2) + '%';
                  },
                  stepSize: 5
                }
              },
              x: {
                title: {
                  display: true,
                  text: "Country in South Asia"
                }
              }
            },
            plugins: {
              legend: {
                display: true,
                position: 'top'
              },
              tooltip: {
                callbacks: {
                  label: function(ctx) {
                    return ctx.dataset.label + ': ' + ctx.parsed.y.toFixed(2) + '%';
                  }
                }
              },
              title: {
                display: true,
                font: {
                  size: 16
                },
                padding: {
                  top: 10,
                  bottom: 10
                }
              }
            }
          }
        });

        observer.disconnect();
      }
    });
  }, { threshold: 0.4 });

  parliamentObserver.observe(document.getElementById("parliament-chart-trigger"));


  

//   // Bangladesh map initialization and tooltip functionality
// let bangladeshMapInitialized = false;

// const mapObserver = new IntersectionObserver((entries, observer) => {
//   entries.forEach(entry => {
//     if (entry.isIntersecting && !bangladeshMapInitialized) {
//       // Add visible class for any CSS animations you want to keep
//       document.querySelector('#crime-map-bang').classList.add('visible');
//       bangladeshMapInitialized = true;
      
//       // Initialize simple tooltip functionality
//       initializeBangladeshTooltips();
      
//       // Disconnect observer after first load to save performance
//       observer.disconnect();
//     }
//   });
// }, { threshold: 0.3 });

// function initializeBangladeshTooltips() {
//   const customToolTip = document.getElementById('country-tooltip');
//   const paths = document.querySelectorAll('#bangladesh-map path');
  
//   if (!customToolTip || paths.length === 0) {
//     console.error('Tooltip or paths not found');
//     return;
//   }

//   paths.forEach(path => {
//     path.addEventListener('mouseenter', (e) => {
//       const rate = e.target.getAttribute('data-rate');
//       const title = e.target.getAttribute('title');
      
//       // Simple tooltip content 
//       customToolTip.innerHTML = `
//         <div style="font-weight: 600; margin-bottom: 4px;">${title}</div>
//         <div>Percentage of Domestic Violence against women: ${rate}</div>
//       `;
      
//       // Show immediately - no animations
//       customToolTip.style.display = 'block';
      
//       // Better positioning
//       customToolTip.style.left = e.clientX + 15 + 'px';
//       customToolTip.style.top = e.clientY - 60 + 'px';
      
//       // Simple hover effect
//       e.target.style.opacity = '0.8';
//       e.target.style.stroke = '#333';
//       e.target.style.strokeWidth = '1.5';
//     });

//     path.addEventListener('mousemove', (e) => {
//       // Update position as mouse moves
//       customToolTip.style.left = e.clientX + 15 + 'px';
//       customToolTip.style.top = e.clientY - 60 + 'px';
//     });

//     path.addEventListener('mouseleave', (e) => {
//       // Hide immediately - no animations
//       customToolTip.style.display = 'none';
      
//       // Reset path appearance
//       e.target.style.opacity = '1';
//       e.target.style.stroke = '';
//       e.target.style.strokeWidth = '';
//     });
//   });
// }

//
//India map initialization and tooltip functionality
//

// Prevent redeclaration by scoping everything inside an IIFE
(() => {
  const maps = [
    { 
      id: 'crime-map-india', 
      svgId: 'india-map',
      tooltipLabel: 'Rate of total crime against women',
      
    },
    { 
      id: 'crime-map-pakistan', 
      svgId: 'pakistan-map',
      tooltipLabel: 'Gender Based Violence',
      
    },
    { 
      id: 'crime-map-bang', 
      svgId: 'bangladesh-map',
      tooltipLabel: 'Domestic physical violence against women',
      
    }
  ];

  let initializedMaps = new Set();

  // Tooltip setup (only one tooltip div for all maps)
  const tooltip = document.getElementById('country-tooltip');
  if (!tooltip) {
    console.error('Tooltip element not found in DOM');
    return;
  }

  function initializeTooltips(svgId, tooltipConfig) {
    const paths = document.querySelectorAll(`#${svgId} path`);
    if (paths.length === 0) {
      console.error(`No paths found for ${svgId}`);
      return;
    }

    paths.forEach(path => {
      path.addEventListener('mouseenter', (e) => {
        const rawtitle = e.target.getAttribute('title') || 'N/A';
        const nameOnly = rawtitle.split(':')[0];
        const rate = e.target.getAttribute('data-rate') || 'N/A';

        // Custom tooltip content based on country
        tooltip.innerHTML = `
          <div style="font-weight: 600; margin-bottom: 4px; color: #F2F0EF;">
            ${nameOnly}
          </div>
          <div style="color: #F2F0EF; font-size: 12px;">
            ${tooltipConfig.tooltipLabel}: ${rate}
          </div>
        `;

        tooltip.style.display = 'block';
        tooltip.style.left = e.clientX + 15 + 'px';
        tooltip.style.top = e.clientY - 60 + 'px';

        e.target.style.opacity = '0.8';
        e.target.style.stroke = '#333';
        e.target.style.strokeWidth = '1.5';
      });

      path.addEventListener('mousemove', (e) => {
        tooltip.style.left = e.clientX + 15 + 'px';
        tooltip.style.top = e.clientY - 60 + 'px';
      });

      path.addEventListener('mouseleave', (e) => {
        tooltip.style.display = 'none';
        e.target.style.opacity = '1';
        e.target.style.stroke = '';
        e.target.style.strokeWidth = '';
      });
    });
  }

  // One observer for all maps
  const mapObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !initializedMaps.has(entry.target.id)) {
        entry.target.classList.add('visible');
        initializedMaps.add(entry.target.id);

        const mapConfig = maps.find(m => m.id === entry.target.id);
        if (mapConfig) {
          initializeTooltips(mapConfig.svgId, mapConfig);
        }
      }
    });
  }, { threshold: 0.3 });

  // Initialize immediately if DOM is ready, otherwise wait
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeMaps);
  } else {
    initializeMaps();
  }

  function initializeMaps() {
    maps.forEach(({ id }) => {
      const section = document.getElementById(id);
      if (section) {
        mapObserver.observe(section);
      }
    });
  }

})();

//Pop up modal
// Show modal on page load (with delay)
window.addEventListener('load', function() {
    // Check if user has chosen not to see the modal
    if (!localStorage.getItem('hideWelcomeModal')) {
        setTimeout(showModal, 500); // Small delay for better UX
    }
});

function showModal() {
    const modal = document.getElementById('welcomeModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function closeModal() {
    const modal = document.getElementById('welcomeModal');
    const dontShowAgain = document.getElementById('dontShowAgain');
    
    // Check if user selected "don't show again"
    if (dontShowAgain.checked) {
        localStorage.setItem('hideWelcomeModal', 'true');
    }
    
    modal.classList.remove('active');
    document.body.style.overflow = 'auto'; // Restore scrolling
}

// Exit website function
function exitWebsite() {
    // Show confirmation
    if (confirm('Are you sure you want to leave? This will close the website.')) {
        // Try multiple methods to close/exit
        
        // Method 1: Try to close the window (works if opened by script)
        try {
            window.close();
        } catch (e) {
            // If window.close() fails, try other methods
        }
        
        // Method 2: Navigate away from the site
        setTimeout(function() {
            // Redirect to a blank page
            window.location.href = 'about:blank';
            // Alternative: window.location.href = 'https://www.google.com';
        }, 100);
        
        // Method 3: If all else fails, show a goodbye message
        setTimeout(function() {
            document.body.innerHTML = `
                <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100vh; font-family: Montserrat, sans-serif; background: #fffdf9; color: #7a1e1e;">
                    <h1 style="margin-bottom: 1rem;">Thank you for visiting</h1>
                    <p style="margin-bottom: 2rem; text-align: center; max-width: 500px;">
                        We understand this content may not be right for everyone at this time. 
                        You can close this tab or navigate to another website.
                    </p>
                    <button onclick="window.history.back()" style="background: #7a1e1e; color: white; padding: 12px 24px; border: none; border-radius: 6px; cursor: pointer; font-size: 1rem;">
                        Go Back to Previous Page
                    </button>
                </div>
            `;
        }, 200);
    }
}

// Close modal when clicking outside of it
document.getElementById('welcomeModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// Reset function (for testing - you can remove this)
function resetModal() {
    localStorage.removeItem('hideWelcomeModal');
    alert('Modal reset! Refresh the page to see it again.');
}

//
const qrBtn = document.getElementById('qr-btn');
  const qrPopup = document.getElementById('qr-popup');
  const overlay = document.getElementById('overlay');

  // Show popup
  qrBtn.addEventListener('click', (e) => {
    e.preventDefault();
    qrPopup.style.display = 'block';
    overlay.style.display = 'block';
  });

  // Hide popup when clicking outside
  overlay.addEventListener('click', () => {
    qrPopup.style.display = 'none';
    overlay.style.display = 'none';
  });

function toggleReferences() {
  var refs = document.getElementById('references');
  var btn = document.getElementById('toggle-btn');
  
  if (refs.style.display === 'none' || refs.style.display === '') {
      refs.style.display = 'block';
      btn.innerHTML = 'Hide References';
  } else {
      refs.style.display = 'none';
      btn.innerHTML = 'Show References';
  }
}