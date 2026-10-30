// 1. Carbon Calculator Logic
function calculateCarbon() {
    const hectares = document.getElementById('hectares').value;
    if(!hectares || hectares <= 0) {
        alert("Please enter a valid number of hectares.");
        return;
    }

    // Logic: 1 Hectare = 5 Carbon Credits
    const credits = hectares * 5;
    const revenue = credits * 10; // $10 per credit

    // Update UI
document.getElementById('credit-display').innerText = credits;
if(document.getElementById('revenue-display')) {
    document.getElementById('revenue-display').innerText = `$${(credits * 10).toLocaleString()}`;
}
    
    // Add animation effect to show it worked
    const display = document.getElementById('credit-display');
    display.classList.add('animate-pulse');
    setTimeout(() => display.classList.remove('animate-pulse'), 1000);
    
    alert(`Success! ${hectares} Hectares can generate ${credits} Carbon Credits.`);
}

// 2. PDF Report Generation Logic
function generatePDF() {
    const element = document.getElementById('dashboard-content');
    
    // PDF Settings
    const opt = {
        margin:       0.5,
        filename:     'Himalayan_Carbon_Report.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2, useCORS: true }, // useCORS for map images
        jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    // Show loading alert
    alert("Generating Report... Please wait.");
    
    // Generate PDF
    html2pdf().set(opt).from(element).save();
}
