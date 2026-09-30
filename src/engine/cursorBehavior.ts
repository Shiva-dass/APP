export interface CursorPosition {
  x: number;
  y: number;
}

export class CursorBehaviorManager {
  private physicalMouse: CursorPosition = { x: 0, y: 0 };
  private visualCursor: CursorPosition = { x: 0, y: 0 };
  private driftOffset: CursorPosition = { x: 0, y: 0 };
  private isHorizontalInverted = false;
  private isVerticalInverted = false;
  private driftActive = true;
  private delayFactor = 0.12; // Lerp smoothing delay
  private frameCount = 0;

  constructor() {
    if (typeof window !== 'undefined') {
      this.physicalMouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
      this.visualCursor = { ...this.physicalMouse };
    }
  }

  public setInversions(horizontal: boolean, vertical: boolean) {
    this.isHorizontalInverted = horizontal;
    this.isVerticalInverted = vertical;
  }

  public setDrift(active: boolean) {
    this.driftActive = active;
  }

  public updatePhysicalPosition(x: number, y: number) {
    let targetX = x;
    let targetY = y;

    if (this.isHorizontalInverted && typeof window !== 'undefined') {
      targetX = window.innerWidth - x;
    }
    if (this.isVerticalInverted && typeof window !== 'undefined') {
      targetY = window.innerHeight - y;
    }

    this.physicalMouse = { x: targetX, y: targetY };
  }

  public tick(): CursorPosition {
    this.frameCount++;

    // Random micro-drift walk
    if (this.driftActive && this.frameCount % 5 === 0) {
      this.driftOffset.x += (Math.random() - 0.5) * 5;
      this.driftOffset.y += (Math.random() - 0.5) * 5;
      // Clamp drift
      this.driftOffset.x = Math.max(-18, Math.min(18, this.driftOffset.x));
      this.driftOffset.y = Math.max(-18, Math.min(18, this.driftOffset.y));
    }

    // Lerp delay
    this.visualCursor.x += (this.physicalMouse.x + this.driftOffset.x - this.visualCursor.x) * this.delayFactor;
    this.visualCursor.y += (this.physicalMouse.y + this.driftOffset.y - this.visualCursor.y) * this.delayFactor;

    return { x: this.visualCursor.x, y: this.visualCursor.y };
  }

  public getVisualPosition(): CursorPosition {
    return { ...this.visualCursor };
  }
}
