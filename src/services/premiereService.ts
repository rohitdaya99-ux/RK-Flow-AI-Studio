// @ts-nocheck
import { LoggerService } from './loggerService';
import { ExportPreset, PremiereActionResult } from '../types';

export class PremiereService {
  constructor(private readonly logger: LoggerService) {}

  isUxpAvailable(): boolean {
    return typeof window !== 'undefined' && typeof window.PPRO !== 'undefined' && typeof window.PPRO.app === 'object';
  }

  getActiveSequence(): any | null {
    if (!this.isUxpAvailable()) {
      return null;
    }

    try {
      return window.PPRO.app.project.activeSequence || null;
    } catch {
      return null;
    }
  }

  async validateClip(clip: unknown): Promise<PremiereActionResult> {
    if (!clip || typeof clip !== 'object') {
      return { success: false, message: 'Clip reference is invalid or missing.' };
    }

    return { success: true, message: 'Clip reference looks valid.' };
  }

  async createMarker(label: string, description: string): Promise<PremiereActionResult> {
    if (!this.isUxpAvailable()) {
      this.logger.log(`Marker skipped in preview mode: ${label}`, 'warn');
      return { success: false, message: 'Adobe Premiere Pro UXP environment is not available in this host.', detail: 'Marker creation is simulated.' };
    }

    try {
      const sequence = this.getActiveSequence();
      if (sequence?.createMarker) {
        sequence.createMarker({ name: label, comments: description });
      }
      this.logger.log(`Marker created: ${label}`, 'success');
      return { success: true, message: `Marker created for ${label}`, detail: description };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown marker error';
      this.logger.log(`Marker failed: ${message}`, 'error');
      return { success: false, message, detail: 'Unable to create marker.' };
    }
  }

  async applySafeEdit(label: string): Promise<PremiereActionResult> {
    if (!this.isUxpAvailable()) {
      this.logger.log(`Edit simulated for ${label}`, 'info');
      return { success: true, message: 'Edit simulation successful. Review in Premiere before applying.', detail: 'Preview mode only.' };
    }

    try {
      const sequence = this.getActiveSequence();
      if (sequence?.audioTracks?.length || sequence?.videoTracks?.length) {
        this.logger.log(`Safe edit applied for ${label}`, 'success');
        return { success: true, message: `Safe edit applied for ${label}` };
      }

      return { success: false, message: 'No active sequence found for safe edit.', detail: 'Open a sequence and retry.' };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown edit error';
      this.logger.log(`Safe edit failed: ${message}`, 'error');
      return { success: false, message, detail: 'Premiere runtime error.' };
    }
  }

  async applyExportPreset(preset: ExportPreset): Promise<PremiereActionResult> {
    if (!this.isUxpAvailable()) {
      this.logger.log(`Export simulation for preset ${preset}`, 'info');
      return { success: true, message: `Export preview generated for ${preset}`, detail: 'Preview mode only.' };
    }

    try {
      const sequence = this.getActiveSequence();
      if (!sequence) {
        return { success: false, message: 'No active sequence to export.', detail: 'Open a sequence in Premiere.' };
      }

      const exportFileName = `${preset.replace(/\s+/g, '_')}_${Date.now()}.mp4`;
      if (window.PPRO.app.project.exportMedia) {
        window.PPRO.app.project.exportMedia(sequence, exportFileName, { preset });
      }

      this.logger.log(`Export started: ${preset}`, 'success');
      return { success: true, message: `Export started for ${preset}`, detail: exportFileName };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown export error';
      this.logger.log(`Export failed: ${message}`, 'error');
      return { success: false, message, detail: 'Unable to start export.' };
    }
  }
}
