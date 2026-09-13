/**
 * DELTA NEURONS: Adaptive AI Engine (Dynamic Difficulty Adjustment - DDA)
 * Real-time clinical telemetry tracking for elderly dementia patients.
 * Evaluates reaction latency, hesitation, error recovery, and cognitive fatigue.
 */

class AdaptiveAIEngine {
  constructor() {
    this.session = {
      startTime: Date.now(),
      movesCount: 0,
      correctMoves: 0,
      mistakesCount: 0,
      totalLatencyMs: 0,
      latencies: [],
      hesitationEvents: 0,
      autoHintsGiven: 0,
      currentDifficulty: 1, // 1: Gentle (2x2), 2: Mild (2x3), 3: Intermediate (2x4), 4: Advanced (3x4)
      fatigueIndex: 0.0,
      cognitiveScore: 78 // Baseline healthy cognitive orientation score
    };

    this.hesitationThresholdMs = 7000; // 7 seconds of inactivity triggers gentle hint
    this.lastActionTimestamp = Date.now();
    this.hesitationTimer = null;
    this.listeners = [];

    this.loadHistoricalData();
  }

  // Load telemetry from localStorage
  loadHistoricalData() {
    try {
      const saved = localStorage.getItem('delta_neurons_telemetry');
      if (saved) {
        this.history = JSON.parse(saved);
      } else {
        // Mock 7-day initial baseline history for immediate visualization
        this.history = [
          { day: "Day 1", score: 68, memoryScore: 65, attentionScore: 70, hesitationSec: 9.2, gamesCompleted: 3 },
          { day: "Day 2", score: 71, memoryScore: 69, attentionScore: 73, hesitationSec: 8.5, gamesCompleted: 4 },
          { day: "Day 3", score: 69, memoryScore: 67, attentionScore: 71, hesitationSec: 8.8, gamesCompleted: 2 },
          { day: "Day 4", score: 74, memoryScore: 72, attentionScore: 76, hesitationSec: 7.6, gamesCompleted: 5 },
          { day: "Day 5", score: 76, memoryScore: 75, attentionScore: 78, hesitationSec: 7.1, gamesCompleted: 4 },
          { day: "Day 6", score: 78, memoryScore: 77, attentionScore: 80, hesitationSec: 6.8, gamesCompleted: 5 },
          { day: "Today", score: 81, memoryScore: 80, attentionScore: 82, hesitationSec: 6.2, gamesCompleted: 3 }
        ];
        this.saveHistory();
      }
    } catch (e) {
      console.warn("Could not load telemetry history:", e);
    }
  }

  saveHistory() {
    try {
      localStorage.setItem('delta_neurons_telemetry', JSON.stringify(this.history));
    } catch (e) {
      console.warn("Could not save telemetry:", e);
    }
  }

  // Register listener for AI difficulty or hint events
  subscribe(callback) {
    this.listeners.push(callback);
  }

  notify(event, data) {
    this.listeners.forEach(fn => fn(event, data));
  }

  // Start hesitation watchdog when a game turn begins
  startHesitationWatchdog(onHesitateCallback) {
    this.clearHesitationWatchdog();
    this.lastActionTimestamp = Date.now();

    this.hesitationTimer = setTimeout(() => {
      this.session.hesitationEvents++;
      this.session.autoHintsGiven++;
      this.notify('HESITATION_DETECTED', {
        durationMs: this.hesitationThresholdMs,
        hintsGiven: this.session.autoHintsGiven
      });
      if (typeof onHesitateCallback === 'function') {
        onHesitateCallback();
      }
    }, this.hesitationThresholdMs);
  }

  clearHesitationWatchdog() {
    if (this.hesitationTimer) {
      clearTimeout(this.hesitationTimer);
      this.hesitationTimer = null;
    }
  }

  // Record a player's move / tap in any cognitive game
  recordMove(isSuccess, extraMeta = {}) {
    this.clearHesitationWatchdog();
    const now = Date.now();
    const latency = Math.max(100, now - this.lastActionTimestamp);

    this.session.movesCount++;
    this.session.totalLatencyMs += latency;
    this.session.latencies.push(latency);

    if (isSuccess) {
      this.session.correctMoves++;
    } else {
      this.session.mistakesCount++;
    }

    // Dynamic Difficulty Adjustment (DDA) Heuristic calculation
    this.evaluateAdaptation();

    this.notify('MOVE_RECORDED', {
      isSuccess,
      latency,
      difficulty: this.session.currentDifficulty,
      accuracy: this.getAccuracyRate()
    });

    return {
      latency,
      recommendedDifficulty: this.session.currentDifficulty
    };
  }

  // Calculate current accuracy rate
  getAccuracyRate() {
    if (this.session.movesCount === 0) return 100;
    return Math.round((this.session.correctMoves / this.session.movesCount) * 100);
  }

  // Calculate Average Reaction Latency in seconds
  getAverageLatencySec() {
    if (this.session.latencies.length === 0) return 3.5;
    const sum = this.session.latencies.reduce((a, b) => a + b, 0);
    return ((sum / this.session.latencies.length) / 1000).toFixed(1);
  }

  // Evaluate clinical metrics and adjust difficulty
  evaluateAdaptation() {
    const accuracy = this.getAccuracyRate();
    const avgLatency = parseFloat(this.getAverageLatencySec());

    // Fatigue metric: check if the last 3 moves were significantly slower than initial moves
    if (this.session.latencies.length >= 6) {
      const earlyMoves = this.session.latencies.slice(0, 3);
      const recentMoves = this.session.latencies.slice(-3);
      const earlyAvg = earlyMoves.reduce((a, b) => a + b, 0) / 3;
      const recentAvg = recentMoves.reduce((a, b) => a + b, 0) / 3;

      if (recentAvg > earlyAvg * 1.45) {
        this.session.fatigueIndex = Math.min(1.0, (recentAvg - earlyAvg) / earlyAvg);
        this.notify('FATIGUE_WARNING', {
          fatigueIndex: this.session.fatigueIndex,
          message: "Gentle fatigue detected. Recommending a calming pause or soothing music."
        });
      }
    }

    // Adaptive Level Shift:
    // If high accuracy (>85%) and brisk responses (<4.5s) -> Step up difficulty
    if (this.session.movesCount >= 4 && accuracy >= 85 && avgLatency < 4.5 && this.session.currentDifficulty < 4) {
      const oldDiff = this.session.currentDifficulty;
      this.session.currentDifficulty++;
      this.notify('DIFFICULTY_CHANGED', {
        oldDifficulty: oldDiff,
        newDifficulty: this.session.currentDifficulty,
        reason: "Patient demonstrating confidence and agility."
      });
    }
    // If struggling (accuracy < 60% or hesitation > 8s) -> Step down difficulty gently
    else if (this.session.movesCount >= 3 && (accuracy < 60 || avgLatency > 8.0) && this.session.currentDifficulty > 1) {
      const oldDiff = this.session.currentDifficulty;
      this.session.currentDifficulty--;
      this.notify('DIFFICULTY_CHANGED', {
        oldDifficulty: oldDiff,
        newDifficulty: this.session.currentDifficulty,
        reason: "Adjusting to a calmer, larger-target layout to prevent frustration."
      });
    }

    // Compute Clinical MMSE/MoCA Simulated Composite Score (0-100 scale)
    const accuracyWeight = (accuracy * 0.45);
    const speedScore = Math.max(10, Math.min(100, (10 - avgLatency) * 12));
    const speedWeight = (speedScore * 0.35);
    const hesitationPenalty = Math.min(20, this.session.hesitationEvents * 3);

    this.session.cognitiveScore = Math.min(96, Math.max(45, Math.round(accuracyWeight + speedWeight - hesitationPenalty)));
  }

  // Finalize session and append to history
  finalizeSession(gameName) {
    const sessionSummary = {
      timestamp: new Date().toISOString(),
      gameName,
      moves: this.session.movesCount,
      accuracy: this.getAccuracyRate(),
      avgLatencySec: this.getAverageLatencySec(),
      cognitiveScore: this.session.cognitiveScore,
      hintsUsed: this.session.autoHintsGiven,
      fatigueIndex: this.session.fatigueIndex
    };

    // Update today's entry in history
    if (this.history.length > 0) {
      const todayEntry = this.history[this.history.length - 1];
      todayEntry.score = this.session.cognitiveScore;
      todayEntry.hesitationSec = parseFloat(this.getAverageLatencySec());
      todayEntry.gamesCompleted = (todayEntry.gamesCompleted || 0) + 1;
    }

    this.saveHistory();
    return sessionSummary;
  }
}

// Export singleton instance
window.AIEngine = new AdaptiveAIEngine();

