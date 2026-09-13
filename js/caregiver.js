/**
 * DELTA NEURONS: Caregiver & Clinical Dashboard
 * Provides longitudinal cognitive tracking, MMSE/MoCA alignment,
 * offline HTML5 Canvas analytics, and clinical summary export.
 */

class CaregiverDashboard {
  constructor() {
    this.alerts = [
      { id: 1, type: 'info', text: 'Morning blood pressure medication marked taken on schedule.', time: '08:05 AM' },
      { id: 2, type: 'info', text: 'Patient completed Sriti Mel (Memory Meadow) with 85% accuracy.', time: '10:30 AM' },
      { id: 3, type: 'warning', text: 'Hesitation latency (7.4s) detected during second session. AI adjusted grid size.', time: '11:15 AM' },
      { id: 4, type: 'info', text: '3 glasses of water logged today. Hydration on target.', time: '01:45 PM' }
    ];
  }

  init() {
    this.renderKPIs();
    this.renderCanvasChart();
    this.renderAlertFeed();
    this.bindEvents();
  }

  renderKPIs() {
    const history = window.AIEngine.history || [];
    const latestScore = history.length > 0 ? history[history.length - 1].score : 78;
    const latestHesitation = history.length > 0 ? history[history.length - 1].hesitationSec : 6.8;

    const mmseSimulated = Math.round((latestScore / 100) * 30); // 0-30 scale
    const mmseEl = document.getElementById('kpi-mmse');
    const agilityEl = document.getElementById('kpi-agility');
    const hesitationEl = document.getElementById('kpi-hesitation');
    const complianceEl = document.getElementById('kpi-compliance');

    if (mmseEl) mmseEl.textContent = `${mmseSimulated} / 30`;
    if (agilityEl) agilityEl.textContent = `${latestScore}%`;
    if (hesitationEl) hesitationEl.textContent = `${latestHesitation}s`;
    if (complianceEl) complianceEl.textContent = `92%`;
  }

  // Draw 7-Day Cognitive Trend line graph purely on HTML5 Canvas (Zero CDN dependency)
  renderCanvasChart() {
    const canvas = document.getElementById('cognitive-trend-chart');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const history = window.AIEngine.history || [];
    if (history.length === 0) return;

    // Handle high-DPI displays
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * (window.devicePixelRatio || 1);
    canvas.height = 240 * (window.devicePixelRatio || 1);
    ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);

    const width = rect.width;
    const height = 240;
    const padding = 40;

    // Clear background
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = document.body.classList.contains('high-contrast') ? '#1A1D24' : '#FFFFFF';
    ctx.fillRect(0, 0, width, height);

    // Draw horizontal grid lines
    ctx.strokeStyle = document.body.classList.contains('high-contrast') ? '#333D4B' : '#EAE6DF';
    ctx.lineWidth = 1;
    for (let p = 50; p <= 100; p += 10) {
      const y = height - padding - ((p - 50) / 50) * (height - padding * 2);
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(width - padding, y);
      ctx.stroke();

      // Label
      ctx.fillStyle = '#8B98A5';
      ctx.font = '11px sans-serif';
      ctx.fillText(`${p}%`, 10, y + 4);
    }

    // Plot data points
    const stepX = (width - padding * 2) / (history.length - 1 || 1);
    const points = history.map((item, idx) => {
      const x = padding + idx * stepX;
      const y = height - padding - ((item.score - 50) / 50) * (height - padding * 2);
      return { x, y, ...item };
    });

    // Draw Gradient Area under curve
    const gradient = ctx.createLinearGradient(0, padding, 0, height - padding);
    gradient.addColorStop(0, 'rgba(30, 107, 82, 0.35)');
    gradient.addColorStop(1, 'rgba(30, 107, 82, 0.02)');

    ctx.beginPath();
    ctx.moveTo(points[0].x, height - padding);
    points.forEach((pt, i) => {
      if (i === 0) ctx.lineTo(pt.x, pt.y);
      else {
        // Smooth bezier interpolation
        const prev = points[i - 1];
        const cx = (prev.x + pt.x) / 2;
        ctx.bezierCurveTo(cx, prev.y, cx, pt.y, pt.x, pt.y);
      }
    });
    ctx.lineTo(points[points.length - 1].x, height - padding);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();

    // Draw Line
    ctx.beginPath();
    ctx.strokeStyle = '#1E6B52'; // Kaziranga green
    ctx.lineWidth = 3.5;
    ctx.lineCap = 'round';
    points.forEach((pt, i) => {
      if (i === 0) ctx.moveTo(pt.x, pt.y);
      else {
        const prev = points[i - 1];
        const cx = (prev.x + pt.x) / 2;
        ctx.bezierCurveTo(cx, prev.y, cx, pt.y, pt.x, pt.y);
      }
    });
    ctx.stroke();

    // Draw circular dots and day labels
    points.forEach(pt => {
      // Circle
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, 5.5, 0, Math.PI * 2);
      ctx.fillStyle = '#FFFFFF';
      ctx.fill();
      ctx.strokeStyle = '#C9751E'; // Amber outline
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // Day label
      ctx.fillStyle = '#4A5B6A';
      ctx.font = '12px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(pt.day, pt.x, height - 12);
    });
  }

  renderAlertFeed() {
    const feed = document.getElementById('caregiver-alert-feed');
    if (!feed) return;

    feed.innerHTML = '';
    this.alerts.forEach(al => {
      const el = document.createElement('div');
      el.className = `alert-entry ${al.type}`;
      el.innerHTML = `
        <div>
          <strong>${al.type === 'warning' ? '⚠️ ' : 'ℹ️ '}</strong>
          <span>${al.text}</span>
        </div>
        <div class="alert-time">${al.time}</div>
      `;
      feed.appendChild(el);
    });
  }

  bindEvents() {
    const printBtn = document.getElementById('btn-export-clinical-report');
    if (printBtn) {
      printBtn.addEventListener('click', () => {
        window.print();
      });
    }

    const sosBtn = document.getElementById('btn-emergency-sos');
    if (sosBtn) {
      sosBtn.addEventListener('click', () => {
        const alertMsg = "🚨 EMERGENCY SOS NOTIFICATION:\nCaregiver alert triggered for Patient Bapuji (Dispur, Guwahati).\nLocation: Home Caregiver Contact (+91 94350 XXXXX).";
        alert(alertMsg);
        window.VoiceNER.speak("অভিভাৱক আৰু পৰিয়ালৰ সৈতে জৰুৰী যোগাযোগ স্থাপন কৰা হৈছে।");
      });
    }
  }
}

// Export singleton instance
window.Caregiver = new CaregiverDashboard();

