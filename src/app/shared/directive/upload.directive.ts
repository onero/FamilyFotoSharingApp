import {Directive, EventEmitter, HostListener, Output} from '@angular/core';

@Directive({
  selector: '[appUpload]'
})
export class UploadDirective {

  @Output()
  hovering = new EventEmitter<boolean>();

  @Output()
  dropped = new EventEmitter<FileList>();

  constructor() {
  }

  @HostListener('dragenter', ['$event'])
  onDragEnter(event) {
    event.preventDefault();
    this.hovering.emit(true);
  }
  @HostListener('dragover', ['$event'])
  onDragOver(event) {
    event.preventDefault();
  }

  @HostListener('dragleave', ['$event'])
  onDragLeave(event) {
    event.preventDefault();
    this.hovering.emit(false);
  }

  @HostListener('drop', ['$event'])
  onDrop(event) {
    event.preventDefault();
    this.dropped.emit(event.dataTransfer.files);
  }

}
