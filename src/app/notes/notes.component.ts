import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})

export class NotesComponent implements OnInit {
  @Output() noteDelete: EventEmitter<{title:string, description:string}>= new EventEmitter();

  @Input('nElement') element: {title:string, description:string};

  constructor() { }

  deleteNode(gottitle:string, gotdescription:string){
    this.noteDelete.emit({title: gottitle, description: gotdescription});
  }

  ngOnInit(): void {
  }

}
