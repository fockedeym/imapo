import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-imapo-image',
  templateUrl: './imapo-image.component.html',
  styleUrls: ['./imapo-image.component.css']
})
export class ImapoImageComponent implements OnInit {

  @Input() img
  constructor() { }

  ngOnInit(): void {
  }

}
