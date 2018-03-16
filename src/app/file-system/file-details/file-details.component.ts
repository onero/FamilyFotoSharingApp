import {Component, Input, OnInit} from '@angular/core';
import {File} from '../shared/file';

@Component({
  selector: 'app-file-details',
  templateUrl: './file-details.component.html',
  styleUrls: ['./file-details.component.css']
})
export class FileDetailsComponent implements OnInit {

  @Input()
  file: File;

  constructor() {
    this.file = {
      displayName: 'Funny day at the beach',
      fileName: 'New.jpg',
      created: '10-10-2017',
      mimeType: 'jpg',
      owner: 'test',
      size: 10500
    };
  }

  ngOnInit() {
  }

}
